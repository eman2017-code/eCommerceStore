import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 footer-copyright">
                <p className="mb-0">
                  Copyright 2019 © E-Commerce Store All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
