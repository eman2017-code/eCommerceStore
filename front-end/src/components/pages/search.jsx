import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      results: []
    };
  }

  // handle change method
  handleChange = e => {
    this.setState({
      value: e.target.value
    });

    // get the results
    this.getResults();
  };

  // get results method
  getResults = async () => {
    try {
      // api call to the search route
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/v1/products/search",
        {
          method: "POST",
          body: JSON.stringify({ value: this.state.value }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      // parse the response
      const parsedResponse = response.json();
      // put the results into the array to be displayed
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
                          value={this.state.value}
                          onChange={this.handleChange}
                        />
                        <div className="input-group-append">
                          <button className="btn btn-solid">
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
      </div>
    );
  }
}

export default Search;
