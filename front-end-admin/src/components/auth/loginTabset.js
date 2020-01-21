import React, { Component, Fragment } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Unlock } from "react-feather";
import { withRouter } from "react-router-dom";

export class LoginTabset extends Component {
  constructor(props) {
    console.log("props");
    console.log(props);
    super(props);
    this.state = {
      activeShow: true,
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  clickActive = event => {
    document.querySelector(".nav-link").classList.remove("show");
    event.target.classList.add("show");
  };
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  routeChange = () => {
    this.props.history.push(`${process.env.PUBLIC_URL}/dashboard`);
  };
  render() {
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
              <form className="form-horizontal auth-form">
                <div className="form-group">
                  <input
                    required=""
                    name="login[username]"
                    type="email"
                    className="form-control"
                    placeholder="Username"
                    id="exampleInputEmail1"
                  />
                </div>
                <div className="form-group">
                  <input
                    required=""
                    name="login[password]"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="form-button">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={() => this.routeChange()}
                  >
                    Login
                  </button>
                </div>
              </form>
            </TabPanel>
            <TabPanel>
              <form className="form-horizontal auth-form">
                <div className="form-group">
                  <input
                    required=""
                    name="login[first_name]"
                    type="email"
                    className="form-control"
                    placeholder="First Name"
                    id="uniqueId1"
                  />
                </div>
                <div className="form-group">
                  <input
                    required=""
                    name="login[last_name]"
                    type="email"
                    className="form-control"
                    placeholder="Last Name"
                    id="uniqueId2"
                  />
                </div>
                <div className="form-group">
                  <input
                    required=""
                    name="login[email]"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    id="uniqueId3"
                  />
                </div>
                <div className="form-group">
                  <input
                    required=""
                    name="login[username]"
                    type="email"
                    className="form-control"
                    placeholder="Username"
                    id="uniqueId4"
                  />
                </div>
                <div className="form-group">
                  <input
                    required=""
                    name="login[password]"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    id="uniqueId5"
                  />
                </div>
                <div className="form-group">
                  <input
                    required=""
                    name="login[password]"
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    id="uniqueId6"
                  />
                </div>
                <div className="form-button">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={() => this.routeChange()}
                  >
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

export default withRouter(LoginTabset);
