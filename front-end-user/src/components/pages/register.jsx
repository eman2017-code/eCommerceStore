import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../boilerplates/breadcrumb";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }

  // handle change of the user input
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // handle submit
  handleSubmit = e => {
    e.preventDefault();

    // calls the action to make a fetch call to register the user
    this.props.registerUser(this.state);
  };

  render() {
    // if the user is logged in
    if (this.props.isLoggedIn === true) {
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

Register.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  registerUser: PropTypes.func
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps, { registerUser })(Register);
