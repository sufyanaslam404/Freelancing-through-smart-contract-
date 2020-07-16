pragma solidity ^0.5.12;
  library SafeMath {

  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a / b;
    return c;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
  }
contract System {
    using SafeMath for uint256;
    address payable public owner;
   struct project{
        bool isExist;
        uint256 projectId;
        bool isDeliver;
        uint256 penaltyPercentagePerday;
        uint256 start_time;
        uint256 complete_time;
        uint256 projectPayment;
        address payable projectDeveloper;
        uint256 Days;
    }
    mapping(uint256=>project)public ProjectDetails;
    mapping(address=>uint256[])public Developer_projects;
    uint256 public currProjectId;
    
    constructor()public{
        owner=msg.sender;
        currProjectId=0;
    }
   event PutProject(uint256 indexed _days,address indexed _dveloper,uint256 indexed _penalty);
    modifier onlyOwner(){
        require(msg.sender==owner);
        _;
    }
    modifier onlyProjectdeveloper(uint256 _id){
        require(ProjectDetails[_id].projectDeveloper==msg.sender);
        require(msg.sender!=owner);
        _;
    }
    function putProject(uint256 _days,address payable _dveloper,uint256 _penalty)public payable  returns(bool){
        currProjectId++;
        ProjectDetails[currProjectId]=project({isExist:true,projectId:currProjectId,start_time:0,
        complete_time:_days,projectPayment:msg.value,penaltyPercentagePerday:_penalty,projectDeveloper:_dveloper,isDeliver:false,Days:0});
        Developer_projects[_dveloper].push(currProjectId);
                

    emit    PutProject( _days,_dveloper,_penalty);
     return true;   
    }
    function Deliver(uint256 _id)public  returns(bool){
        require(ProjectDetails[_id].isExist);
        ProjectDetails[_id].isDeliver=true;
        uint256 time=now.sub(ProjectDetails[_id].start_time);
         ProjectDetails[_id].Days=time.div(10);  
        return true;
        
    }
    function start(uint256 _id)public onlyProjectdeveloper(_id) returns(bool){
        require(ProjectDetails[_id].isExist);
        ProjectDetails[_id].start_time=now;
        return true;
    }
    function ReleasePayment(uint256 _id)public onlyProjectdeveloper(_id) returns(bool){
        // project memory obj=ProjectDetails[_id];
        require(ProjectDetails[_id].isExist);
        require(ProjectDetails[_id].isDeliver);
         uint256 t;
        if(ProjectDetails[_id].Days<=ProjectDetails[_id].complete_time){
            msg.sender.transfer(ProjectDetails[_id].projectPayment);
        }
            else if(ProjectDetails[_id].Days>ProjectDetails[_id].complete_time){
                     t=ProjectDetails[_id].Days.sub(ProjectDetails[_id].complete_time);
              uint256 v=(ProjectDetails[_id].projectPayment.mul(ProjectDetails[_id].penaltyPercentagePerday).div(100)).mul(t);
              uint256 a=ProjectDetails[_id].projectPayment.sub(v);
            ProjectDetails[_id].projectDeveloper.transfer(a); 
         }
             return true;
            }
        function () external payable{
        }
        function balance()public view returns(uint256){
            return address(this).balance;
        }
        function del(uint256 _id)public onlyOwner returns(bool){
            require(ProjectDetails[_id].isExist);
            delete ProjectDetails[_id];
            return true;
        }
        function OwnerWithdraw()public onlyOwner returns(bool){
            require(msg.sender==owner);
            owner.transfer(address(this).balance);
            return true;
        }
        function getList()public view returns(uint256[] memory){
            return Developer_projects[msg.sender];
        }
}
        