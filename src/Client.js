import React, { Component } from 'react';
import Web3 from 'web3';
import System from '../src/build/contracts/System.json'
import './App.css';

class Client extends Component {
 async componentWillMount(){
await this.loadData();
  }
  async loadData(){
    const web3=new Web3(Web3.givenProvider|| 'http://localhost7545');
    const networkId=await web3.eth.net.getId();
 console.log(networkId)
//  const netData=System.networks[networkId].address;
//  console.log(netData)
 const accounts=await web3.eth.getAccounts();
 this.setState({account:accounts[0]});
//  console.log(this.state.account);
 const system=new web3.eth.Contract(System.abi,"0x01628647de6f8a54C2c26Da7401b9C328cA9A4D1");
 this.setState({system:system});
//  console.log(this.state.system);
 const owner=await this.state.system.methods.owner().call();
 this.setState({contractOwner:owner});
//  console.log(this.state.contractOwner); 
 const y=await this.state.system.methods.currProjectId().call()
 this.setState({total:y});
//  console.log(y)
//  const i=await this.state.system.methods.userId(this.state.account).call()
//  console.log(i);
//  const s=await this.state.system.methods.ProjectDetails(i).call();
//  this.setState({object:s});
//  console.log(s)
 this.setState({id:this.state.object.projectId});
 this.setState({Exist:this.state.object.isExist});
//  console.log(this.state.Exist);
 this.setState({paymant:this.state.object.projectPayment});
 this.setState({Timeframe:this.state.object.complete_time});
}
  PutProject=(event)=>{
    event.preventDefault();
    this.state.system.methods.putProject(
      this.state.completion_time,
    this.state.projectDeveloper,
    this.state.penalty).send({from:this.state.account,
  gas:2100000});
  }
  deliver=(event)=>{
    event.preventDefault();
    this.state.system.methods.Deliver(this.state.value1).send({from:this.state.account,gas:2100000});
  // console.log(this.state.value1);
  }
 
  DeleteProject=(event)=>{
    event.preventDefault();
    this.state.system.methods.deletion(this.state.value4).send({from:this.state.account,gas:210000});
  }
  OwnerWithdraw=(event)=>{
    event.preventDefault();
    this.state.system.methods.OwnerWithdraw().send({from:this.state.account,gas:210000});
  }
  // checkBalance(event){
  //   event.preventDefault();
  //   const balance=this.state.system.methods.balance().call()
  //   this.setState({balance:balance})
  // this.render(<div>{this.state.balance}</div>)
  // //  .then((yourbalance)=>{
  // //   // this.setState({yourBalance1:yourbalance});
  //   console.log(balance);
   
  // }
 constructor(){
  super()
  this.state={
    account:'',
    penalty:'',
    completion_time:'',
    projectDeveloper:'',
    value1:'',
    value2:'',
    value3:'',
    value4:'',
    system:'',
    yourBalance1:'',
    contractOwner:'',
    // balance:'',
    object:'',
    id:'',
    paymant:'',
    Exist:'',
    Timeframe:'',
  }
 }
 
handleValueChange1=(event)=>{
  this.setState({completion_time:event.target.value})
}
handleValueChange2=(event)=>{
  this.setState({projectDeveloper:event.target.value})
}
handleValueChange3=(event)=>{
  this.setState({penalty:event.target.value})

}
handleValueChange4=(event)=>{
  this.setState({value1:event.target.value})
}

handleValueChange7=(event)=>{
  this.setState({value4:event.target.value})
}

  render(){
  return (
    <div>
        <div className="text">        <h6 id="h6" >WELCOME TO ICO</h6>
        <p id="p1" >Read carefully before press button</p>
        </div>
        <form onSubmit={this.PutProject} >
        <div className='input-group'>  
        <input  className='input' placeholder="  Enter the number of days"
         value={this.state.completion_time} 
        onChange={this.handleValueChange1}></input>
       </div >
       <div className='input-group'>
        <input className='input'placeholder="  Enter developer's Address"
        value={this.state.projectDeveloper} 
        onChange={this.handleValueChange2}></input>
       </div >
       <div className='input-group'>
        <input   className='input'placeholder="  Enter penalty percentage"
      value={this.state.penalty} 
        onChange={this.handleValueChange3}></input>
       </div >
  
  <div className='input-group'> 
  <button type='submit'  id='button'>
    INITIATE
  </button >
  </div>
  </form>
    
    {/* {/* <form onSubmit={this.deliver} role='from'>
        <h4>Deliver</h4>
        <div >
        <input 
        placeholder='Enter ID of Project' value={this.state.value1} pattern='[0-9]' 
        onChange={this.handleValueChange4}></input>
       </div >
  <div > 
  <br/>
     <button type='submit' >
    Deliver
  </button >
  </div>
  </form>
  <form onSubmit={this.DeleteProject} role='from'>
        <h4>DeleteProject</h4>
        <div >
        <input type='number' 
        placeholder='Enter ID of Project' value={this.state.value4} 
        onChange={this.handleValueChange7}></input>
       </div >
  <div > 
  <br/>
     <button type='submit' >
  Delete
  </button >
  </div> 
    </form> 
    <div>
    <button onClick={this.OwnerWithdraw}>check balance</button>
  </div>

  {/* Freelancer */}
   
  
    </div>
  );
  }
}

export default Client;
