import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import Breadcrumb from "../boilerplates/breadcrumb";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions";

class Login extends Component {
  constructor(props) {
    console.log("props");
    console.log(props);
    super(props);

    this.state = {
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

    // calls the action to make a fetch call to attempt to login the user
    this.props.loginUser(this.state);
  };

  render() {
    // if the user is logged in
    if (this.props.isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/all-products"
          }}
        />
      );
    }

    return (
      <div>
        <Helmet>
          <title>E-Commerce | Store</title>
        </Helmet>

        <Breadcrumb title={"Login"} />

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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps, { loginUser })(Login);
