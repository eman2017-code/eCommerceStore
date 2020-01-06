import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link, Redirect } from "react-router-dom";

import Breadcrumb from "../common/breadcrumb";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      loggedIn: false,
      loggedInUser: null
    };
  }

  // register route
  register = async registerInfo => {
    // fetch call to the api
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/api/v1/users/register",
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(registerInfo),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    // parse response to send back json
    const parsedRegisterResponse = await response.json();
    console.log("parsedRegisterResponse");
    console.log(parsedRegisterResponse);
    // if response is good
    if (response.ok) {
      this.setState({
        loggedIn: true,
        loggedInUser: parsedRegisterResponse.data
      });
    } else {
      console.log("registration failed");
      console.log(parsedRegisterResponse);
    }
  };

  // handle change method for each section user inputs
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // handle submit
  handleSubmit = e => {
    e.preventDefault();
    console.log("they are trying to register");
    this.registerUser();
  };

  // method to actually login user
  registerUser = () => {
    this.register({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    });
  };

  render() {
    // if the user is registered
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

        {/*Regsiter section*/}
        <section className="register-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h3>create account</h3>
                <div className="theme-card">
                  <form onSubmit={this.handleSubmit} className="theme-form">
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="email">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fname"
                          placeholder="First Name"
                          required={true}
                          value={this.state.firstName}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="review">Last Name</label>
                        <input
                          type="password"
                          className="form-control"
                          id="lname"
                          placeholder="Last Name"
                          required={true}
                          value={this.state.lastName}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="email">email</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          required={true}
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="review">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="review"
                          placeholder="Enter your password"
                          required={true}
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </div>
                      <a href="#" className="btn btn-solid">
                        create Account
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Register;
