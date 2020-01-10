import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: null,
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }

  // register route
  register = async registerInfo => {
    // fetch call to the api
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/api/v1/users/signup",
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
    const parsedRegistrationResponse = await response.json();
    // if respoinse is 201
    if (response.ok) {
      this.setState({
        // log the user in
        loggedIn: true,
        // get the data for the logged in user
        loggedInUser: parsedRegistrationResponse.data
      });
    } else {
      console.log(parsedRegistrationResponse);
    }
  };

  // handle change of the user input
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // handle submit
  handleSubmit = e => {
    e.preventDefault();
    console.log("they have registered");
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
    // if the user is logged in
    if (this.state.loggedIn === true) {
      return (
        <Redirect
          to={{
            pathname: "/all-products",
            // passing props
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

        <Breadcrumb title={"Register"} />

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
                          required=""
                          name="firstName"
                          value={this.state.firstName}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="review">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lname"
                          placeholder="Last Name"
                          required=""
                          name="lastName"
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
                          required=""
                          name="email"
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
                          required=""
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </div>
                      <button type="Submit" className="btn btn-solid">
                        create account
                      </button>
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
