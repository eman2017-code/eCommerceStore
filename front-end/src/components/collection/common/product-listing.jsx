import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { addToCart } from "../../../actions";
import { getVisibleproducts } from "../../../services";
import ProductListItem from "./product-list-item";

class ProductListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 5,
      hasMoreItems: true,
      searchTerm: "",
      results: [],
      currentlySearching: false
    };
  }

  // handle change
  handleChange = e => {
    e.preventDefault();
    // handles value
    this.setState({
      searchTerm: e.target.value,
      currentlySearching: true
    });

    this.queryProduct();
  };

  // route to search for products
  queryProduct = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/v1/search/products/",
        {
          method: "POST",
          body: JSON.stringify({ searchTerm: this.state.searchTerm }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      // convert response to json
      const parsedResponse = await response.json();
      console.log("parsedResponse");
      console.log(parsedResponse);
      // add results to state
      this.setState({
        results: [...parsedResponse.data]
      });
    } catch (err) {}
  };

  componentWillMount() {
    this.fetchMoreItems();
  }

  fetchMoreItems = () => {
    if (this.state.limit >= this.props.products.length) {
      this.setState({ hasMoreItems: false });
      return;
    }
    // a fake async api call
    setTimeout(() => {
      this.setState({
        limit: this.state.limit + 5
      });
    }, 3000);
  };

  render() {
    const { products, addToCart, symbol } = this.props;
    const { results } = this.state;
    return (
      // {this.state.currentlySearching ? show these results : do what you normally do}
      <div>
        <div>
          {/* Search section */}
          <section className="authentication-page section-b-space">
            <div className="container">
              <section className="search-block">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                      <form className="form-header">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Amount (to the nearest dollar)"
                            placeholder="Search Products......"
                            value={this.state.searchTerm}
                            onChange={this.handleChange}
                            autoComplete="on"
                          />
                          <div className="input-group-append">
                            <button
                              onClick={this.queryProduct}
                              className="btn btn-solid"
                            >
                              <i className="fa fa-search"></i>Search
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
          <ul>
            {results.map(result => (
              <li key={result.name}>{result.name}</li>
            ))}
          </ul>
        </div>

        {/* Listing products section */}
        <div className="product-wrapper-grid">
          <div className="container-fluid">
            {products.length > 0 ? (
              <InfiniteScroll
                dataLength={this.state.limit} //This is important field to render the next data
                next={this.fetchMoreItems}
                hasMore={this.state.hasMoreItems}
                loader={<div className="loading-cls"></div>}
                endMessage={
                  <p className="seen-cls seen-it-cls">
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <div className="row">
                  {products.slice(0, this.state.limit).map((product, index) => (
                    <div
                      className={`${
                        this.props.colSize === 3
                          ? "col-xl-3 col-md-6 col-grid-box"
                          : "col-lg-" + this.props.colSize
                      }`}
                      key={index}
                    >
                      <ProductListItem
                        product={product}
                        symbol={symbol}
                        onAddToCartClicked={addToCart}
                        key={index}
                      />
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            ) : (
              <div className="row">
                <div className="col-sm-12 text-center section-b-space mt-5 no-found">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/empty-search.jpg`}
                    alt=""
                    className="img-fluid mb-4"
                  />
                  <h3>
                    Sorry! Couldn't find the product you were looking For!!!{" "}
                  </h3>
                  <p>
                    Please check if you have misspelt something or try searching
                    with other words.
                  </p>
                  <Link
                    to={`${process.env.PUBLIC_URL}/`}
                    className="btn btn-solid"
                  >
                    continue shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  products: getVisibleproducts(state.data, state.filters),
  symbol: state.data.symbol
});

export default connect(mapStateToProps, {
  addToCart
})(ProductListing);
