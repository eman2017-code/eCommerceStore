import React, { Component, Fragment } from "react";
import LoginTabset from "./loginTabset";
import stats from "../../assets/images/dashboard/stats.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export class Login extends Component {
  render() {
    return (
      <Fragment>
        <div className="page-wrapper">
          <div className="authentication-box">
            <div className="container">
              <div className="row">
                <div className="col-md-5 p-0 card-left">
                  <div className="card bg-primary">
                    <div className="svg-icon">
                      <img src={stats} className="Img-fluid" alt="stats" />
                    </div>
                    <div>
                      <div>
                        <h3>Welcome to Our E-Commerce Store</h3>
                        <p>
                          We are a great and innovative e-commerce store who is
                          dedicated to keeping our customers happy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 p-0 card-right">
                  <div className="card tab2-card">
                    <div className="card-body">
                      <LoginTabset />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;
