import React, { Component } from "react";
import { Link } from "react-router-dom";
// import HeaderOne from "../common/headers/header-one";
import { Helmet } from "react-helmet";

import Breadcrumb from "../common/breadcrumb";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      passowrd: "",
      loggedIn: "",
      loggedInUser: null
    };
  }

  // method to actually login user
  loginUser = () => {
    this.login({
      email: this.state.email,
      password: this.state.password
    });
  };

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
    // if respoinse is 201
    if (response.ok) {
      this.setState({
        // log the user in
        loggedIn: true,
        // get the data for the logged in user
        loggedInUser: parsedLoginResponse.data
      });
    } else {
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
    this.login();
  };

  render() {
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
                  <form className="theme-form">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        required=""
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="review">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="review"
                        placeholder="Enter your password"
                        required=""
                      />
                    </div>
                    <a href="#" className="btn btn-solid">
                      Login
                    </a>
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
