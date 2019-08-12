import React, { Component } from 'react'
import {Route,Switch,HashRouter,BrowserRouter} from 'react-router-dom'
import Admin from './page/admin/admin'
import Login from './page/login/login'

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <Switch>
          <Route path = '/login' component={Login} />
          <Route path = '/admin' component={Admin} />
        </Switch>
         
        </BrowserRouter>
      </div>
    )
  }
}
