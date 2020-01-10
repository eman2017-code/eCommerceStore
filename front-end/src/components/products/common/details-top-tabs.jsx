import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import productReducer from "../../../reducers/products";

class DetailsTopTabs extends Component {
  render() {
    return (
      <section className="tab-product m-0">
        <div className="row">
          <div className="col-sm-12 col-lg-12">
            <Tabs className="tab-content nav-material">
              <TabList className="nav nav-tabs nav-material">
                <Tab className="nav-item">
                  <span className="nav-link">
                    <i className="icofont icofont-contacts"></i>Write Review
                  </span>
                  <div className="material-border"></div>
                </Tab>
              </TabList>
              <TabPanel>
                <form className="theme-form mt-4">
                  <div className="form-row">
                    <div className="col-md-12 "></div>
                    <div className="col-md-6">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Your name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="review">Review Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="review"
                        placeholder="Enter your Review Subjects"
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="review">Review Title</label>
                      <textarea
                        className="form-control"
                        placeholder="Write your review here"
                        id="exampleFormControlTextarea1"
                        rows="6"
                      ></textarea>
                    </div>
                    <div className="col-md-12">
                      <li className="btn btn-solid" type="submit">
                        Submit YOur Review
                      </li>
                    </div>
                  </div>
                </form>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </section>
    );
  }
}

export default DetailsTopTabs;
