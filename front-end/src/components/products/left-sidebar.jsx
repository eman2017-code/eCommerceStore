import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "../common/index.scss";
import { connect } from "react-redux";
import store from "../../store";

// import custom Components
import Service from "./common/service";
import Breadcrumb from "../common/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import { addToCart, addToCartUnsafe } from "../../actions";
// import { getSingleItem } from "../../services";

class LeftSideBar extends Component {
  constructor() {
    super();

    store.getState();
    console.log("store.getState() in LeftSideBar");
    console.log(store.getState());

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
    const { symbol, item, addToCart, addToCartUnsafe } = this.props;
    console.log("this.props in LeftSideBar");
    console.log(this.props);

    return (
      <div>
        <Helmet>
          <title>E-Commerce | {item.name}</title>
        </Helmet>

        <Breadcrumb parent={"Product"} title={item.name} />

        {/*Section Start*/}
        {item ? (
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
                            src={item.image}
                            alt=""
                            className="img-fluid"
                          ></img>
                        </div>
                        <DetailsWithPrice
                          symbol={symbol}
                          item={item}
                          navOne={this.state.nav1}
                          addToCartClicked={addToCart}
                          BuynowClicked={addToCartUnsafe}
                        />
                      </div>
                    </div>
                    <DetailsTopTabs item={item} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // lets convert string to number so they can === each other
  let productId = Number(ownProps.match.params.sku);
  return {
    item: state.data.products.find(element => element.sku === productId),
    symbol: state.data.symbol
  };
};

export default connect(mapStateToProps, {
  addToCart,
  addToCartUnsafe
})(LeftSideBar);
