import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";

// for pop up notifications
import { ToastContainer } from "react-toastify";

// Header Components
import HeaderOne from "./boilerplates/headers/header-one";

// Footer Components
import FooterOne from "./boilerplates/footers/footer-one";

class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer autoClose={3000} />
        <HeaderOne logoName={"layout4/logo.png"} />
        {this.props.children}
        <FooterOne logoName={"layout4/logo.png"} />
      </div>
    );
  }
}

export default withTranslate(App);
