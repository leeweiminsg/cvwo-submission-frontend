import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
      redirectToReferrer: false
    };
  }

  handleChange = (_e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    axios
      .post("/users/", {
        email: this.state.email,
        username: this.state.username,
        password_digest: this.state.password
      })
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleLogin(response.data);
          this.redirect();
        }
      })
      .catch(error => console.log(error));

    this.redirect();
  };

  redirect = () => {
    this.props.history.push("/login");
  };

  render() {
    const { email, username, password, password_confirmation } = this.state;

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Sign Up
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                required
                fluid
                name="email"
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={this.handleChange}
                value={email}
              />
              <Form.Input
                required
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                type="username"
                onChange={this.handleChange}
                value={username}
              />
              <Form.Input
                required
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handleChange}
                value={password}
              />
              <Form.Input
                required
                fluid
                name="password_confirmation"
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                onChange={this.handleChange}
                value={password_confirmation}
              />
              {/* <Link to="login"> */}
              <Button color="teal" fluid size="large" type="submit">
                Submit
              </Button>
              {/* </Link> */}
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(Signup);
