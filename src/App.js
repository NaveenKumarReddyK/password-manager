import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginComponent from './Components/Login';
import RegisterComponent from './Components/Register';
import Dashboard from "./Components/Dashboard";
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: false
    };
    // this.loggedInChecker = this.loggedInChecker.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  loggedInChecker() {
    var logInCofig = {
      method: 'get',
      url: 'http://localhost:4000/pw-manager/auth/isloggedin',
      withCredentials: true,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    axios(logInCofig).then((loginRes) => {
      this.setState({
        loginStatus: loginRes.data.loginStatus
      });
    }).catch((err) => {console.log("error");});
  }
  componentDidMount() {
    this.loggedInChecker();
  }

  handleLogin() {
    this.setState({
      loginStatus: true
    });
  }
  handleLogout() {
    this.setState({
      loginStatus: false
    });
  }
  render() {
    return (
      <BrowserRouter>
        <Route
          path="/pwd/login"
          render={props => (
            <LoginComponent
              handleLogin={this.handleLogin}
              loggedInStatus={this.state.loginStatus} />
          )} />
        <Route
          path="/pwd/signup"
          render={props => (
            <RegisterComponent
              handleLogin={this.handleLogin}
              loggedInStatus={this.state.loginStatus} />
          )}
        />
        <Route
          path="/pwd/user"
          render={props => (
            <Dashboard
              handleLogout={this.handleLogout}
              loggedInStatus={this.state.loginStatus} />
          )}
        />
      </BrowserRouter>
    );
  }
}

export default App;
