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

  onClick = e => {
    console.log("they clicked the buttton");
  };

  // handle change of the user input
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // handle submit
  handleSubmit = e => {
    e.preventDefault();
    console.log("they are have logged in");
    this.loginUser();
  };

  // method to actually login user
  loginUser = () => {
    this.login({
      email: this.state.email,
      password: this.state.password
    });
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

  // filterCategories route
  // will make a fetch call to the elasticsearch api

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
                      <br />
                      <br />
                      <li onClick={this.onClick}>FILTER 1</li>
                      <li onClick={this.onClick}>FILTER 2</li>
                      <li onClick={this.onClick}>FILTER 3</li>
                      <li onClick={this.onClick}>FILTER 4</li>
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
