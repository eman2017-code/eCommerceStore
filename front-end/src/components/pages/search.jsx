import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: []
    };
  }

  // handle change
  handleChange = e => {
    // handles value
    this.setState({
      query: e.target.value
    });

    // shows results every key stroke
    this.queryProduct();
  };

  // route to search for products
  queryProduct = async queryString => {
    try {
      const product = await fetch(
        process.env.REACT_APP_API_URL +
          "/api/v1/search/products/" +
          queryString,
        {
          // method: "POST",
          // body: JSON.stringify({ query: this.state.value }),
          credentials: "include"
          // headers: {
          //   "Content-Type": "application/json"
          // }
        }
      );

      // convert response to json
      const parsedProduct = await product.json();
      // add results to state
      this.setState({
        results: [...parsedProduct.data]
      });
    } catch (err) {}
  };

  render() {
    return (
      <div>
        {/*Search section*/}
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
                          value={this.state.value}
                          onChange={this.handleChange}
                        />
                        <div className="input-group-append">
                          <li
                            onClick={this.queryProduct}
                            className="btn btn-solid"
                          >
                            <i className="fa fa-search"></i>Search
                          </li>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}

export default Search;
