import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "../common/index.scss";
import { connect } from "react-redux";

// import custom Components
import Service from "./common/service";
import Breadcrumb from "../boilerplates/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import { addToCart, addToCartUnsafe } from "../../actions";
import PageNotFound from "../pages/404.jsx";

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  filterClick() {
    document.getElementById("filter").style.left = "-15px";
  }
  backClick() {
    document.getElementById("filter").style.left = "-365px";
  }

  render() {
    const { symbol, product, addToCart, addToCartUnsafe } = this.props;
    console.log("this.props in LeftSideBar from");
    console.log(this.props);

    return (
      <div>
        <Helmet>{/* <title>E-Commerce | {product.name}</title> */}</Helmet>

        {/* <Breadcrumb parent={"Product"} title={product.name} /> */}

        {/*Section Start*/}
        {product ? (
          <section className="section-b-space">
            <div className="collection-wrapper">
              <div className="container">
                <div className="row">
                  <div className="col-sm-3 collection-filter" id="filter">
                    <div className="collection-mobile-back pl-5">
                      <span onClick={this.backClick} className="filter-back">
                        <i className="fa fa-angle-left" aria-hidden="true"></i>{" "}
                        back
                      </span>
                    </div>
                    <Service />
                  </div>
                  <div className="col-lg-9 col-sm-12 col-xs-12">
                    <div className="">
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="filter-main-btn mb-2">
                            <span
                              onClick={this.filterClick}
                              className="filter-btn"
                            >
                              <i
                                className="fa fa-filter"
                                aria-hidden="true"
                              ></i>{" "}
                              filter
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 product-thumbnail">
                          <img
                            src={product.image}
                            alt=""
                            className="img-fluid"
                          ></img>
                        </div>
                        <DetailsWithPrice
                          symbol={symbol}
                          product={product}
                          navOne={this.state.nav1}
                          addToCartClicked={addToCart}
                          BuynowClicked={addToCartUnsafe}
                        />
                      </div>
                    </div>
                    <DetailsTopTabs product={product} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <PageNotFound />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("state from mapStateToProps in LeftSideBar");
  console.log(state);
  // convert string to number so they can === each other
  let productId = Number(ownProps.match.params.sku);
  return {
    product: state.data.products.find(el => el.sku === productId),
    symbol: state.data.symbol
  };
};

export default connect(mapStateToProps, {
  addToCart,
  addToCartUnsafe
})(LeftSideBar);
