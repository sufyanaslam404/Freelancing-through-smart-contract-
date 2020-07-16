import React, { Component } from 'react';
import './App.css';
import Client from '../src/Client'
import Dev from '../src/putProject'

class Auth extends Component {
auth=()=>{
  this.setState({global:false})
  if(this.state.flag==='sufyan'){
  this.setState({freelancer:!this.state.freelancer})}
  if(this.state.flag==='zaid'){
    this.setState({client:!this.state.client})
  }
}
    constructor(){
        super()
            this.state={
                password:'123',
                flag:"",
                client:false,
                freelancer:false,
                global:true
        }
    }
        handlChangevalue1=(event)=>{
            this.setState({flag:event.target.value})
        }
        handlChangevalue2=(event)=>{
            this.setState({password:event.target.value})
        }
    
  render(){
    return (
      <div>
    {this.state.global?<div >     
          <div className="text">       
           <h6 id="h6" >WELCOME TO ICO</h6>
          <p id="p1" >Ether your Username And Password</p>
          </div>
          <form onSubmit={this.auth} >
          <div className='input-group'>  
          <input  className='input' placeholder="  UserName" onChange={this.handlChangevalue1} ></input>
         </div >
         <div className='input-group'>
          <input type='password' className='input'placeholder="  Password"
          onChange={this.handlChangevalue2}></input>
         </div >
    <div className='input-group'> 
    <button type='submit'  id='button'>
      LOGIN
    </button >
    </div>
    </form>     
      </div>:" "}
      {this.state.freelancer?<div><Dev></Dev></div> :""}
    {this.state.client?<div><Client></Client></div> :""}
      </div>
    );
    }
  }
  
export default Auth;
