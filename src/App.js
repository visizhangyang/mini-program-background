import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import {Switch} from 'react-router'
import './App.scss';
import Login from './component/login/login.js'
class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch>
            <Route path='/' component={Login} exact></Route>
            <Route path='/detail' render={()=><h1>detail</h1>}></Route>
          </Switch>
      </div>
    );
  }
}

export default App;
