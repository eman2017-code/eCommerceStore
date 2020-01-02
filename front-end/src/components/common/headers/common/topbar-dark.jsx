import React, { Component } from "react";
import { Link } from "react-router-dom";

class TopBarDark extends Component {
  render() {
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
                  <i className="fa fa-user" aria-hidden="true"></i> My Account
                  <ul className="onhover-show-div">
                    {/* <li>
                      <a href="#" data-lng="en">
                        Login
                      </a>
                    </li> */}
                    <li>
                      <Link to="/pages/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/pages/register">Register</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBarDark;
