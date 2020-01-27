import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions";
import { toast } from "react-toastify";

class TopBarDark extends Component {
  constructor() {
    super();
    this.state = {
      hasAnAccount: true
    };
  }
  // determines what links to show under the 'My Account' dropdown
  renderMyAccountLinks = () => {
    if (this.props.isLoggedIn) {
      return (
        <ul className="onhover-show-div">
          <li>
            <Link>Logout</Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="onhover-show-div">
          <li>
            <Link to="/pages/login">Login</Link>
          </li>
          <li>
            <Link to="/pages/register">Register</Link>
          </li>
        </ul>
      );
    }
  };

  // route to delete account
  deleteAccount = async () => {
    const response = await fetch(
      "http://35.222.68.3:8000/api/v1/users/deleteAccount/",
      {
        credentials: "include",
        method: "DELETE"
      }
    );
    const deletedAccountResponse = await response.json();
    if (deletedAccountResponse.status.code === 200) {
      this.setState({ hasAnAccount: false });
      toast.error(deletedAccountResponse.status.message);
    }
  };

  render() {
    const { logoutUser, isLoggedIn, userInfo } = this.props;

    return (
      <div className="top-header top-header-dark3">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="header-contact">
                <ul>
                  <li>Welcome to Our E-Commerce Store</li>
                  <li>
                    <i className="fa fa-phone" aria-hidden="true"></i>Call Us:
                    847 - 939 - 2203
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 text-right">
              <ul className="header-dropdown">
                <li className="onhover-dropdown mobile-account">
                  <i className="fa fa-user" aria-hidden="true"></i>Account
                  {isLoggedIn ? (
                    <ul className="onhover-show-div">
                      <li>Hey, {userInfo.firstName}</li>
                      <li onClick={logoutUser}>Log out</li>
                      <h6 onClick={this.deleteAccount}>Delete Account</h6>
                    </ul>
                  ) : (
                    <ul className="onhover-show-div">
                      <li>
                        <Link to="/pages/login">Login</Link>
                      </li>
                      <li>
                        <Link to="/pages/register">Register</Link>
                      </li>
                      <li>
                        <a href="http://34.67.79.176:5000">Admin</a>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TopBarDark.propTypes = {
  logoutUser: PropTypes.func,
  isLoggedIn: PropTypes.bool.isRequired,
  userInfo: PropTypes.object
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  userInfo: state.user.userInfo
});

export default connect(mapStateToProps, { logoutUser })(TopBarDark);
