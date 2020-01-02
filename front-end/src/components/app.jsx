import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";

// Header Components
import HeaderOne from "./common/headers/header-one";

// Footer Components
import FooterOne from "./common/footers/footer-one";

// ThemeSettings
import ThemeSettings from "./common/theme-settings";

class App extends Component {
  render() {
    return (
      <div>
        <HeaderOne logoName={"logo.png"} />
        {this.props.children}
        <FooterOne logoName={"logo.png"} />

        <ThemeSettings />
      </div>
    );
  }
}

export default withTranslate(App);
