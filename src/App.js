import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import {Switch} from 'react-router'
import './App.scss';
import Login from './component/login/login.js'
import Main from './component/main/main'
class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch>
            <Route path='/' component={Login} exact></Route>
            <Route path='/main' component={Main}></Route>
          </Switch>
      </div>
    );
  }
}

export default App;
