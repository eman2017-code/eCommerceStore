import React, { Component } from "react";
const elasticsearch = window.ElasticAppSearch;

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
  }

  // handle change method
  handleChange = e => {
    this.setState({
      value: e.target.value
    });
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
