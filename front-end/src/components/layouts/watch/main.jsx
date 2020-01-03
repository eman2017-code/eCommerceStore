import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "../../common/index.scss";
import Slider from "react-slick";
import {
  Slider4,
  svgFreeShipping,
  svgservice,
  svgoffer,
  svgpayment
} from "../../../services/script";

// Import custom components
import LogoBlocks from "../common/logo-block";
import BlogSection from "../common/blogsection";
import Trending from "./trending";
import TrandingCollection from "../common/collection";
import Special from "../common/special";
import HeaderOne from "../../common/headers/header-one";
import FooterOne from "../../common/footers/footer-one";
import ThemeSettings from "../../common/theme-settings";

class Lander extends Component {
  componentDidMount() {
    document
      .getElementById("color")
      .setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/color4.css`);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>E-Commerce | Store</title>
        </Helmet>
        <HeaderOne logoName={"layout4/logo.png"} />
        <section className="p-0 small-slider">
          <Slider className="slide-1 home-slider">
            <div>
              <div className="home home9 text-left p-left">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="slider-contain">
                        <div>
                          <h4>Great Products</h4>
                          <h1>Check them out</h1>
                          <a href="#" className="btn btn-outline btn-classic">
                            shop now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="home home10 text-left p-left">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="slider-contain">
                        <div>
                          <h4>We have great deals</h4>
                          <h1>Electronics</h1>
                          <a href="#" className="btn btn-outline btn-classic">
                            shop now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="home home11 text-left p-left">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="slider-contain">
                        <div>
                          <h4>Great for the family</h4>
                          <h1>Family and Friends</h1>
                          <a href="#" className="btn btn-outline btn-classic">
                            shop now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </section>

        {/*Logo Blocks section*/}
        <LogoBlocks />
        {/*Logo Blocks section end*/}

        {/*category wrapper*/}
        <section className="section-b-space ratio_portrait">
          <div className="container">
            <div className="row">
              <div className="col">
                <Slider {...Slider4} className="slide-4 category-m no-arrow">
                  <div>
                    <div className="category-wrapper">
                      <div>
                        <div>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/watch/cat1.png`}
                            className="img-fluid blur-up lazyload bg-img"
                            alt=""
                          />
                        </div>
                        <h4>watch models</h4>

                        {/* this will link to the specific item that is being listed */}
                        <a href="#" className="btn btn-outline">
                          view more
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="category-wrapper">
                      <div>
                        <div>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/watch/cat2.png`}
                            className="img-fluid blur-up lazyload bg-img"
                            alt=""
                          />
                        </div>
                        <h4>calculator watch</h4>
                        <a href="#" className="btn btn-outline">
                          view more
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="category-wrapper">
                      <div>
                        <div>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/watch/cat3.png`}
                            className="img-fluid blur-up lazyload bg-img"
                            alt=""
                          />
                        </div>
                        <h4>Antimagnetic watch</h4>
                        <a href="#" className="btn btn-outline">
                          view more
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="category-wrapper">
                      <div>
                        <div>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/watch/cat2.png`}
                            className="img-fluid blur-up lazyload bg-img"
                            alt=""
                          />
                        </div>
                        <h4>History of watches</h4>
                        <a href="#" className="btn btn-outline">
                          view more
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="category-wrapper">
                      <div>
                        <div>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/watch/cat1.png`}
                            className="img-fluid blur-up lazyload bg-img"
                            alt=""
                          />
                        </div>
                        <h4>watch models</h4>
                        <a href="#" className="btn btn-outline">
                          view more
                        </a>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </section>
        {/*category wrapper end*/}

        {/*Special Products Start*/}
        <Trending type={"watch"} />
        {/*Special Products End*/}

        {/* Parallax banner*/}
        <TrandingCollection type={"watch"} />
        {/* Parallax banner end*/}

        {/*Content Banner*/}
        <section className="ratio_45">
          <div className="container">
            <div className="row partition3">
              <div className="col-md-4">
                <a href="#">
                  <div className="collection-banner p-left">
                    <div className="img-part">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/images/banner1.jpg`}
                        className="img-fluid blur-up lazyload bg-img"
                        alt=""
                      />
                    </div>
                    <div className="contain-banner banner-3">
                      <div>
                        <h4>minimum 10% off</h4>
                        <h2>new watch</h2>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-4">
                <a href="#">
                  <div className="collection-banner p-left text-left">
                    <div className="img-part">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/images/banner2.jpg`}
                        className="img-fluid blur-up lazyload bg-img"
                        alt=""
                      />
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-4">
                <a href="#">
                  <div className="collection-banner p-left">
                    <div className="img-part">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/images/banner.jpg`}
                        className="img-fluid blur-up lazyload bg-img"
                        alt=""
                      />
                    </div>
                    <div className="contain-banner banner-3">
                      <div>
                        <h4>minimum 50% off</h4>
                        <h2>gold watch</h2>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/*Content Banner End*/}

        <Special type={"watch"} />

        {/*Service Layout*/}
        <div className="container">
          <section className="service section-b-space border-section border-top-0">
            <div className="row partition4">
              <div className="col-lg-3 col-md-6 service-block1">
                <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
                <h4>free shipping</h4>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 service-block1">
                <div dangerouslySetInnerHTML={{ __html: svgservice }} />
                <h4>24 X 7 service</h4>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 service-block1">
                <div dangerouslySetInnerHTML={{ __html: svgoffer }} />
                <h4>festival offer</h4>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 service-block1">
                <div dangerouslySetInnerHTML={{ __html: svgpayment }} />
                <h4>online payment</h4>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text.
                </p>
              </div>
            </div>
          </section>
        </div>
        {/*Service Layout End*/}

        <ThemeSettings />

        <FooterOne logoName={"layout4/footerlogo.png"} />
      </div>
    );
  }
}

export default Lander;
