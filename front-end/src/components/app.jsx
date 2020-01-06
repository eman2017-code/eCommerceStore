import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";

// Header Components
import HeaderOne from "./common/headers/header-one";

// Footer Components
import FooterOne from "./common/footers/footer-one";

class App extends Component {
  render() {
    return (
      <div>
        <HeaderOne logoName={"layout4/logo.png"} />
        {this.props.children}
        <FooterOne logoName={"layout4/logo.png"} />
      </div>
    );
  }
}

export default withTranslate(App);
