import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { Container, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import TasksContainer from "./components/TasksContainer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import StressCounter from "./components/StressCounter";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    };
  }

  handleLogin = data => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    });
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    });
  };

  loginStatus = () => {
    axios
      .get("/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          this.handleLogin(response);
        } else {
          this.handleLogout();
        }
      })
      .catch(error => console.log("api errors:", error));
  };

  componentDidMount() {
    this.loginStatus();
  }

  render() {
    return (
      <div>
        <React.Fragment>
          <Router>
            <Switch>
              <Route path="/login">
                <Login
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              </Route>
              <Route path="/signup">
                <SignUp
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              </Route>
              <Route path="/">
                <br></br>
                <Container
                  fluid
                  text
                  textAlign="center"
                  className="AppContainer"
                >
                  <Header as="h1">All Tasks</Header>
                  <StressCounter />
                  <br></br>
                  <TasksContainer
                    loggedInStatus={this.state.isLoggedIn}
                    handleLogout={this.handleLogout}
                  />
                </Container>
              </Route>
            </Switch>
          </Router>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
