import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      loggedInUser: null
    };
  }

  // login route
  login = async loginInfo => {
    // fetch call to the api
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/api/v1/users/login",
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(loginInfo),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    // parse response to send back json
    const parsedLoginResponse = await response.json();
    console.log("parsedLoginResponse");
    console.log(parsedLoginResponse);
    // if response is good
    if (response.ok) {
      this.setState({
        loggedIn: true,
        loggedInUser: parsedLoginResponse.data
      });
    } else {
      console.log("login failed");
      console.log(parsedLoginResponse);
    }
  };

  // handle change of user input
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // handle submit
  handleSubmit = e => {
    e.preventDefault();
    console.log("they are trying to login");
    this.loginUser();
  };

  // method to actually login user
  loginUser = () => {
    this.login({
      email: this.state.email,
      password: this.state.password
    });
  };

  render() {
    // if the user is logged in
    if (this.state.loggedIn === true) {
      return (
        <Redirect
          to={{
            pathname: "/all-products",
            state: { loggedInUser: this.state.loggedInUser }
          }}
        />
      );
    }
    return (
      <div>
        <Helmet>
          <title>E-Commerce | Store</title>
        </Helmet>

        {/*Login section*/}
        <section className="login-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h3>Login</h3>
                <div className="theme-card">
                  <form onSubmit={this.handleSubmit} className="theme-form">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        required={true}
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="review"
                        placeholder="Enter your password"
                        required={true}
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                    </div>
                    <button type="Submit" className="btn btn-solid">
                      Login
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-lg-6 right-login">
                <h3>New Customer</h3>
                <div className="theme-card authentication-right">
                  <h6 className="title-font">Create A Account</h6>
                  <p>
                    Sign up for a free account at our store. Registration is
                    quick and easy. It allows you to be able to order from our
                    shop. To start shopping click register.
                  </p>
                  <Link to="/pages/register">
                    <li className="btn btn-solid">Create an Account</li>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
