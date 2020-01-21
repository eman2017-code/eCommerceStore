import React, { Component } from "react";
import man from "../../../assets/images/dashboard/man.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class User_panel extends Component {
  render() {
    const { userInfo } = this.props;
    console.log("this.props in User_panel");
    console.log(this.props);
    return (
      <div>
        <div className="sidebar-user text-center">
          <div>
            <img
              className="img-60 rounded-circle lazyloaded blur-up"
              src={man}
              alt="#"
            />
          </div>
          <h6 className="mt-3 f-14">{userInfo.firstName}</h6>
          <p>Admin</p>
        </div>
      </div>
    );
  }
}

// export default User_panel;
User_panel.propTypes = {
  userInfo: PropTypes.object
};

const mapStateToProps = state => ({
  userInfo: state.user.userInfo
});

// export default User_menu;
export default connect(mapStateToProps, {})(User_panel);
