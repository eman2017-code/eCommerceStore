import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import man from "../../../assets/images/dashboard/man.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions";

export class User_menu extends Component {
  // determines what to show the admin if they are logged in or not
  decideWhichTabLinks = () => {
    if (this.props.isLoggedIn) {
      return (
        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
          <li>
            <Link to={`${process.env.PUBLIC_URL}/view/profile`}>
              <i data-feather="user"></i>View Profile
            </Link>
          </li>
          <li>
            <Link>
              <i data-feather="log-out" onClick={logoutUser}></i>Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
          <li>
            <Link to={`${process.env.PUBLIC_URL}/auth/login`}>
              <i data-feather="log-in"></i>Login
            </Link>
          </li>
        </ul>
      );
    }
  };
  render() {
    const { logoutUser, isLoggedIn, userInfo } = this.props;
    console.log("userInfo");
    console.log(userInfo);
    return (
      <Fragment>
        <li className="onhover-dropdown">
          <div className="media align-items-center">
            <img
              className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
              src={man}
              alt="header-user"
            />
            <div className="dotted-animation">
              <span className="animate-circle"></span>
              <span className="main-circle"></span>
            </div>
          </div>
          {isLoggedIn ? (
            <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
              <li>
                <Link to={`${process.env.PUBLIC_URL}/view/profile`}>
                  <i data-feather="user">View Profile</i>
                </Link>
              </li>
              <li>
                <i data-feather="log-out" onClick={logoutUser}>
                  Logout
                </i>
              </li>
            </ul>
          ) : (
            <Redirect to={{ pathname: "/auth/login" }} />
          )}
        </li>
      </Fragment>
    );
  }
}

User_menu.propTypes = {
  logoutUser: PropTypes.func,
  isLoggedIn: PropTypes.bool.isRequired,
  userInfo: PropTypes.object
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  userInfo: state.user.userInfo
});

export default connect(mapStateToProps, { logoutUser })(User_menu);
