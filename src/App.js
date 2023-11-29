import React from 'react'
import './App.css'
import Login from './container/auth/login/login'
import Signup from './container/auth/signup/signup'
import ChatApp from './container/main/dashboard'
import { Route, Switch, Link } from "react-router"
import { withRouter } from "react-router-dom";

class App extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('token'))
      this.props.history.push("/chat");
  }

  render() {
    let route = <Switch>
      <Route path="/chat" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/" component={Login} />
    </Switch>

    if (localStorage.getItem('token')) {
      route = <Switch>
        <Route path="/chat" component={ChatApp} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Login} />
      </Switch>
    }

    return (
      <div class="app">
        {route}
      </div>
    );
  }
}


export default withRouter(App)