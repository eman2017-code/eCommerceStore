import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getProductsByCategory } from "../../../actions";

import SideImageItem from "../common/side-image-item";

class Trending extends Component {
  constructor(props) {
    super(props);
    console.log("props in trending");
    console.log(props);
    this.trendingCategories = [
      "cell phones",
      "computers and tablets",
      "headphones",
      "appliances"
    ];

    this.getAllTrendingProducts();
  }

  componentDidMount() {}

  // makes a fetch call for each trending category to get the products
  getAllTrendingProducts = () => {
    this.trendingCategories.forEach(category => {
      this.props.getProductsByCategory(category);
    });
  };

  render() {
    const {
      cellPhones,
      computersAndTablets,
      headphones,
      appliances,
      symbol
    } = this.props;

    return (
      <div>
        {/*Paragraph*/}
        <section className="p-0">
          <div className="tab-bg">
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <div className="title4">
                    <h2 className="title-inner4">trending products</h2>
                    <div className="line">
                      <span></span>
                    </div>
                  </div>
                  <Tabs className="theme-tab">
                    <TabList className="tabs tab-title">
                      <Tab>CELL PHONES</Tab>
                      <Tab>COMPUTERS & TABLETS</Tab>
                      <Tab>HEADPHONES</Tab>
                      <Tab>APPLIANCES</Tab>
                    </TabList>
                    <div className="tab-content-cls">
                      <TabPanel className="tab-content">
                        <div className="row product-tab">
                          {cellPhones.map((item, i) => (
                            <div className="tab-box" key={i}>
                              <SideImageItem product={item} symbol={symbol} />
                            </div>
                          ))}
                        </div>
                      </TabPanel>
                      <TabPanel className="tab-content">
                        <div className="row product-tab">
                          {computersAndTablets.map((item, i) => (
                            <div className="tab-box" key={i}>
                              <SideImageItem product={item} symbol={symbol} />
                            </div>
                          ))}
                        </div>
                      </TabPanel>
                      <TabPanel className="tab-content">
                        <div className="row product-tab">
                          {headphones.map((item, i) => (
                            <div className="tab-box" key={i}>
                              <SideImageItem product={item} symbol={symbol} />
                            </div>
                          ))}
                        </div>
                      </TabPanel>
                      <TabPanel className="tab-content">
                        <div className="row product-tab">
                          {appliances.map((item, i) => (
                            <div className="tab-box" key={i}>
                              <SideImageItem product={item} symbol={symbol} />
                            </div>
                          ))}
                        </div>
                      </TabPanel>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Trending.propTypes = {
  getProductsByCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  computersAndTablets: state.data.computersAndTablets,
  cellPhones: state.data.cellPhones,
  headphones: state.data.headphones,
  appliances: state.data.appliances,
  symbol: state.data.symbol
});

export default connect(mapStateToProps, { getProductsByCategory })(Trending);
