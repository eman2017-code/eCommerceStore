import React, { Component } from "react";
import { SlideUpDown } from "../../../services/script";
import LogoImage from "../headers/common/logo";

class FooterOne extends Component {
  componentDidMount() {
    var contentwidth = window.innerWidth;
    if (contentwidth < 750) {
      SlideUpDown("footer-title");
    } else {
      var elems = document.querySelectorAll(".footer-title");
      [].forEach.call(elems, function(elemt) {
        let el = elemt.nextElementSibling;
        el.style = "display: block";
      });
    }
  }

  render() {
    return (
      <footer className="">
        <div className="white-layout">
          <div className="container">
            <section className="small-section"></section>
          </div>
        </div>
        <section className="section-b-space darken-layout">
          <div className="container">
            <div className="row footer-theme partition-f">
              <div className="col-lg-4 col-md-6">
                <div className="footer-title footer-mobile-title">
                  <h4>about</h4>
                </div>
                <div className="footer-contant">
                  <div className="footer-logo">
                    <LogoImage logo={this.props.logoName} />
                  </div>
                  <p>
                    We are a great and innovative e-commerce store who is
                    dedicated to keeping our customers happy.
                  </p>
                  <div className="footer-social">
                    <ul>
                      <li>
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </li>
                      <li>
                        <i className="fa fa-google-plus" aria-hidden="true"></i>
                      </li>
                      <li>
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </li>
                      <li>
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </li>
                      <li>
                        <i className="fa fa-rss" aria-hidden="true"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="sub-title">
                  <div className="footer-title">
                    <h4>Why Choose Us</h4>
                  </div>
                  <div className="footer-contant">
                    <ul>
                      <li>shipping & return</li>
                      <li>secure shopping</li>
                      <li>affiliates</li>
                      <li>contacts</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="sub-title">
                  <div className="footer-title">
                    <h4>store information</h4>
                  </div>
                  <div className="footer-contant">
                    <ul className="contact-list">
                      <li>
                        <i className="fa fa-map-marker"></i>E-Commerce Store
                      </li>
                      <li>
                        <i className="fa fa-phone"></i>Call Us: 847 - 939 - 2203
                      </li>
                      <li>
                        <i className="fa fa-envelope-o"></i>Email Us:{" "}
                        ecommerce@email.com
                      </li>
                      <li>
                        <i className="fa fa-fax"></i>Fax: 123456
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>
    );
  }
}

export default FooterOne;
