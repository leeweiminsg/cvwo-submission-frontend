import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }

  handleChange = (_e, { name, value }) => this.setState({ [name]: value });

  redirect = () => {
    this.props.history.push("/");
  };

  handleSubmit = () => {
    const { username, email, password } = this.state;

    let user = {
      username: username,
      email: email,
      password: password
    };

    axios
      .post("/login", { user })
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleLogin(response.data);
        } else {
          this.setState({
            errors: response.data.errors
          });
        }
      })
      .catch(error => console.log(error));

    this.redirect();
  };

  componentDidMount() {
    return this.props.loggedInStatus ? this.redirect() : null;
  }

  render() {
    const { username, email, password } = this.state;

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            JustDueet
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />

              <Button color="teal" fluid size="large" type="submit">
                Login
              </Button>
            </Segment>
          </Form>
          <br />
          <br />
          <br />
          <Grid.Row>
            <Link to="signup">
              <Button color="teal" fluid size="large">
                Sign Up
              </Button>
            </Link>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(Login);
