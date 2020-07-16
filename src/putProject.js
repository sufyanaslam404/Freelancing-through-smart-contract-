import React, { Component } from 'react';
import Web3 from "web3"
import './App.css';
// import arrow from '../src/build/arrow.png'
import System from '../src/build/contracts/System.json'
class Dev extends Component{
async componentWillMount(){
  this.loadData();
}
async loadData(){
  const web3=new Web3(Web3.givenProvider||'http://localhost7545');
  // const netid=await web3.eth.net.getId()
  const account=await web3.eth.getAccounts()
  this.setState({account:account[0]})
  console.log(this.state.account);
  const system1=new web3.eth.Contract(System.abi,"0x01628647de6f8a54C2c26Da7401b9C328cA9A4D1")
  this.setState({system1:system1});
  console.log(this.state.system1);
}
showOrder=()=>{
  this.state.system1.methods.getList().call().then(result=>{
    this.setState({array:result})
    console.log(result);
  });
  // this.setState({checkFunction:!this.state.checkFunction});
    this.setState({butt:!this.state.butt})
    this.setState({od:!this.state.od})
    this.setState({value:1})
}
order=(x)=>{
    
    this.state.system1.methods.ProjectDetails(x).call().then(
  object=>{
    this.setState({object:object});
    this.setState({id:object.projectId});
    this.setState({paymant:object.projectPayment});
    this.setState({Exist:(object.isExist)});
    this.setState({Timeframe:object.complete_time});
    this.setState({value:2});
    this.setState({check:!this.state.check});
    this.setState({od:!this.state.od})
    
  }
    )
    return;

}
Start=(event)=>{
  event.preventDefault();
  this.state.system1.methods.start(this.state.value2).send({from:this.state.account,gas:210000});
}
Release=(event)=>{
  event.preventDefault();
  this.state.system1.methods.ReleasePayment(this.state.value3).send({from:this.state.account,gas:2100000});
}
toggle=()=>{
// this.setState({check:false})
this.setState({checkFunction:true})
this.setState({butt:false})
this.setState({head:false})
this.setState({value:3})
}
back=()=>{
  if(this.state.value===1){
  this.setState({butt:!this.state.butt})
  this.setState({od:!this.state.od})
  this.setState({value:0}) }
  else if(this.state.value===2){
  this.setState({od:!this.state.od})
  this.setState({check:!this.state.check})
   this.setState({value:1}) }
  else if(this.state.value===3){
    this.setState({butt:!this.state.butt})
    this.setState({checkFunction:!this.state.checkFunction})
    this.setState({head:!this.state.head})
    this.setState({value:0}) 
  }
  
}
  constructor(){
    super()
    this.state={
      account:'',
      system1:'',
      object:'',
    id:'',
    paymant:'',
    Exist:'',
    Timeframe:'',
    check:false,
    checkFunction:false,
    array:[],
    value2:'',
    value3:'',
    butt:true,
    od:false,
    head:true,
    value:0
    }
  }
  handleValueChange5=(event)=>{
    this.setState({value2:event.target.value})
  }
  handleValueChange6=(event)=>{
    this.setState({value3:event.target.value})
  }
  render(){
    return(
      <div > 
        
        <a href='#' onClick={this.back} id='back'>Back</a>
  {this.state.head?<div className="text">
<h6 id="h" className="card-title">DEVELOPER INTERFACE</h6>
<p id="p">WELCOME TO ICO</p>
    <p id="p">{this.state.account}</p>
  
    </div>:""}
    {this.state.butt?<div className="nd" >
    <button onClick={this.showOrder} id='button'>SHOW ORDER</button></div>:""}
    {this.state.array.map(x=>(<div >{this.state.od?<div><h6 id='h2'>oder.no:{x}</h6><button id='button' onClick={()=>this.order(x)}>Order{x} Details
    </button></div>:""}</div>))}
    
       {this.state.check?<div><p>Project ID: {this.state.id}</p>
    <p>IsExist: {this.state.Exist.toString()}</p><p>Project payment: {this.state.paymant}</p>
    <p>Project time: {this.state.Timeframe}</p></div>:""}
    {this.state.butt? <div className="nd">
    <button type='submit'  id='button' onClick={this.toggle}>
      FUNCTIONS
</button ></div>:""}
{this.state.checkFunction ?
<div className='form'>  
       <form onSubmit={this.Start} >
       <h4 id='h1' className='text'> START PROJECT</h4>
 <div className='input-group'>  
 <input type='text' className="input"
        placeholder='Enter ID of Project' value={this.state.value2} 
        onChange={this.handleValueChange5}></input>
</div >
<div className='input-group' > 
<button type='submit'  id='button' >
INITIATE
</button >
</div>
</form>
{/* next */}
<form onSubmit={this.Release} >
       <h4 id='h1' className='text'> RELEASE PAYMENT</h4>
 <div className='input-group'>  
 <input type='text' className="input"
        placeholder='Enter ID of Project' value={this.state.value3} 
        onChange={this.handleValueChange6}></input>
</div >
<div className='input-group'> 
<button type='submit'  id='button'>
RELEASE PAYMENT
</button >
</div>
</form>      
</div>
: this.toggle } 
</div>
    )
  }
}
export default Dev;