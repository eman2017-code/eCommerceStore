import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      // result of products
      results: []
    };
  }

  // handle change
  handleChange = e => {
    // handles value
    this.setState({
      searchTerm: e.target.value
    });

    // shows results every key stroke
    this.queryProduct();
  };

  // route to search for products
  queryProduct = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/v1/search/products/",
        {
          method: "POST",
          body: JSON.stringify({ searchTerm: this.state.value }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      // convert response to json
      const parsedResponse = await response.json();
      // add results to state
      this.setState({
        results: [...parsedResponse.data]
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
                          value={this.state.searchTerm}
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
