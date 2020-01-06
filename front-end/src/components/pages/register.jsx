import React, { Component } from "react";
import { Helmet } from "react-helmet";

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

  render() {
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
                  <form className="theme-form">
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="email">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fname"
                          placeholder="First Name"
                          required=""
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="review">Last Name</label>
                        <input
                          type="password"
                          className="form-control"
                          id="lname"
                          placeholder="Last Name"
                          required=""
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
