import React, { Component } from "react";
const elasticsearch = window.ElasticAppSearch;
const client = elasticsearch.createClient({
  hostIdentifier: process.env.REACT_APP_API_URL
});

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      queryString: "",
      // holds the most recent query response
      response: null
    };
  }

  // handle change method
  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  componentDidMount() {
    // perform based off user input
    this.performQuery(this.state.queryString);
  }

  // update method
  updateQuery = e => {
    const queryString = e.target.value;
    this.setState(
      {
        // saving user input
        queryString
      },
      () => {
        // new search happening now
        this.performQuery(queryString);
      }
    );
  };

  // perform actual query
  performQuery = queryString => {
    client.search(queryString, {}).then(
      response => {
        this.setState({
          response
        });
      },
      error => {
        console.log(`error: ${error}`);
      }
    );
  };

  render() {
    const { response, queryString } = this.state;

    if (!response) return null;

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
                          value={queryString}
                          onChange={this.updateQuery}
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
        <div>
          <h2>{response.info.meta.page.total_results} Results</h2>
          {response.results.map(result => (
            <div key={result.getRaw("id")}>
              <p>Name: {result.getRaw("name")}</p>
              <p>Description: {result.getRaw("description")}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
