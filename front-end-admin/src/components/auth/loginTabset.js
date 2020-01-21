import React, { Component, Fragment } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Unlock } from "react-feather";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser, loginUser } from "../../actions";

export class LoginTabset extends Component {
  constructor(props) {
    console.log("props");
    console.log(props);
    super(props);
    this.state = {
      activeShow: true,
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    };
  }

  handleChange = (e, date) => {
    this.setState({
      [e.target.name]: e.target.value,
      startDate: date
    });
  };

  handleSubmitLogin = e => {
    e.preventDefault();

    this.props.loginUser(this.state);
  };

  handleSubmitRegister = e => {
    e.preventDefault();

    this.props.registerUser(this.state);
  };

  clickActive = event => {
    document.querySelector(".nav-link").classList.remove("show");
    event.target.classList.add("show");
  };

  render() {
    // if the admin is logged in
    if (this.props.isLoggedIn) {
      return <Redirect to={{ pathname: "/dashboard" }} />;
    }
    return (
      <div>
        <Fragment>
          <Tabs>
            <TabList className="nav nav-tabs tab-coupon">
              <Tab className="nav-link" onClick={e => this.clickActive(e)}>
                <User />
                Login
              </Tab>
              <Tab className="nav-link" onClick={e => this.clickActive(e)}>
                <Unlock />
                Register
              </Tab>
            </TabList>

            <TabPanel>
              <form
                className="form-horizontal auth-form"
                onSubmit={this.handleSubmitLogin}
              >
                <div className="form-group">
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="email"
                    id="exampleInputEmail1"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-button">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </TabPanel>
            <TabPanel>
              <form
                className="form-horizontal auth-form"
                onSubmit={this.handleSubmitRegister}
              >
                <div className="form-group">
                  <input
                    name="firstName"
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    id="uniqueId1"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="lastName"
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    id="uniqueId2"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    id="uniqueId3"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    id="uniqueId5"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-button">
                  <button className="btn btn-primary" type="submit">
                    Register
                  </button>
                </div>
              </form>
            </TabPanel>
          </Tabs>
        </Fragment>
      </div>
    );
  }
}

LoginTabset.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  loggedInUser: state
});

// export default withRouter(LoginTabset);
export default connect(mapStateToProps, { loginUser, registerUser })(
  LoginTabset
);
