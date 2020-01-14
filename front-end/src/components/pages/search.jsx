import React, { Component } from "react";
import * as ElasticAppSearch from "@elastic/app-search-javascript";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      query: ""
    };
  }

  // handle change method
  handleChange = e => {
    this.setState({
      value: e.target.value
    });

    // get the results
    this.queryProduct();
  };

  // route to search for products
  queryProduct = async query => {
    try {
      const product = await fetch(
        process.env.REACT_APP_API_URL + "/api/v1/search/products/" + query,
        {
          credentials: "include"
        }
      );

      // convert response to json
      const parsedProduct = await product.json();

      this.setState({
        query: query
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
                          <li onClick={this.onClick} className="btn btn-solid">
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
