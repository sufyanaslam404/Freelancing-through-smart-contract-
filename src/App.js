import React, { Component } from 'react';
import pic1 from '../src/build/pic1.png'
import './App.css';
import Auth from '../src/Auth'

class App extends Component {
auth=()=>{
  this.setState({global:false})
  this.setState({auth:!this.state.auth})
}

  constructor(){
    super()
    this.state={
      auth:false,
      global:true
    }
  }

  render(){
    return(
      <div className="App" > 

      
     <div id='card'>
     <div className='row' id="r"> 
     <img id='pic1' src={pic1} id='img' alt="Website" ></img>
<div className="card text-center" id='card1'>
{ this.state.global? 
<div>
  <div className='text'> <h6 id="h">  WELCOME TO ICO</h6>
  <p id="p">Make Sure the security of your funds</p></div>

   <div >
    <button onClick={this.auth} id='butto'>SIGN IN AS CLIENT</button>
       
    <button type='submit'  id='butt' onClick={this.auth}>
      SIGN IN AS FREELANCER 
</button ></div>
</div>:<div><Auth></Auth></div>}
</div>
</div>
</div>:


</div>

    )
  }
}
export default App;
