import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Person from './Person/Person';

class App extends Component {
 
  clickButton = (text) =>{
     console.log(`The name of the button is ${text}`);
  }
 
  render() {
    return (
          <div className="App">
            I am Carlos Hudson
            <Person/>
            <button onClick={this.clickButton.bind(this,'I am the button 1')}>Button 1</button><br/>
            <button onClick={() => this.clickButton('I am the button 2')}>Button 2</button>
          </div>   
    );
  }
}

export default App;
