import React, { Component } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Settings } from "react-feather";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Tabset_profile extends Component {
  render() {
    const { userInfo } = this.props;
    return (
      <div>
        <Tabs>
          <TabList className="nav nav-tabs tab-coupon">
            <Tab className="nav-link">
              <User className="mr-2" />
              Profile
            </Tab>
            <Tab className="nav-link">
              <Settings className="mr-2" />
              Options
            </Tab>
          </TabList>

          <TabPanel>
            <div className="tab-pane fade show active">
              <h5 className="f-w-600 f-16">Profile</h5>
              <div className="table-responsive profile-table">
                <table className="table table-responsive">
                  <tbody>
                    <tr>
                      <td>First Name:</td>
                      <td>{userInfo.firstName}</td>
                    </tr>
                    <tr>
                      <td>Last Name:</td>
                      <td>{userInfo.lastName}</td>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <td>{userInfo.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="account-setting deactivate-account">
              <h5 className="f-w-600 f-16">Deactivate Account</h5>
              <div className="row">
                <div className="col">
                  <label className="d-block">
                    <input
                      className="radio_animated"
                      id="edo-ani"
                      type="radio"
                      name="rdo-ani"
                      defaultChecked
                    />
                    I have a privacy concern
                  </label>
                  <label className="d-block">
                    <input
                      className="radio_animated"
                      id="edo-ani1"
                      type="radio"
                      name="rdo-ani"
                    />
                    This is temporary
                  </label>
                  <label className="d-block mb-0">
                    <input
                      className="radio_animated"
                      id="edo-ani2"
                      type="radio"
                      name="rdo-ani"
                      defaultChecked
                    />
                    Other
                  </label>
                </div>
              </div>
              <button type="button" className="btn btn-primary">
                Deactivate Account
              </button>
            </div>
            <div className="account-setting deactivate-account">
              <h5 className="f-w-600 f-16">Delete Account</h5>
              <div className="row">
                <div className="col">
                  <label className="d-block">
                    <input
                      className="radio_animated"
                      id="edo-ani3"
                      type="radio"
                      name="rdo-ani1"
                      defaultChecked
                    />
                    No longer usable
                  </label>
                  <label className="d-block">
                    <input
                      className="radio_animated"
                      id="edo-ani4"
                      type="radio"
                      name="rdo-ani1"
                    />
                    Want to switch on other account
                  </label>
                  <label className="d-block mb-0">
                    <input
                      className="radio_animated"
                      id="edo-ani5"
                      type="radio"
                      name="rdo-ani1"
                      defaultChecked
                    />
                    Other
                  </label>
                </div>
              </div>
              <button type="button" className="btn btn-primary">
                Delete Account
              </button>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

Tabset_profile.propTypes = {
  userInfo: PropTypes.object
};

const mapStateToProps = state => ({
  userInfo: state.user.userInfo
});

export default connect(mapStateToProps, {})(Tabset_profile);
