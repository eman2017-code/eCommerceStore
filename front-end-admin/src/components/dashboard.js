import React, { Component, Fragment } from "react";
import Breadcrumb from "./common/breadcrumb";
import {
  Navigation,
  Box,
} from "react-feather";
import CountUp from "react-countup";
import { Chart } from "react-google-charts";
import CanvasJSReact from "../assets/canvas/canvasjs.react";

import { Line } from "react-chartjs-2";
import {
  employeeData,
  employeeOptions
} from "../constants/chartData";

export class Dashboard extends Component {
  render() {
    const lineData = {
      labels: ["100", "200", "300", "400", "500", "600", "700", "800"],
      datasets: [
        {
          lagend: "none",
          data: [2.5, 3, 3, 0.9, 1.3, 1.8, 3.8, 1.5],
          borderColor: "#ff8084",
          backgroundColor: "#ff8084",
          borderWidth: 2
        },
        {
          lagend: "none",
          data: [3.8, 1.8, 4.3, 2.3, 3.6, 2.8, 2.8, 2.8],
          borderColor: "#a5a5a5",
          backgroundColor: "#a5a5a5",
          borderWidth: 2
        }
      ]
    };

    const buyData = {
      labels: ["", "10", "20", "30", "40", "50"],
      datasets: [
        {
          backgroundColor: "transparent",
          borderColor: "#13c9ca",
          data: [20, 5, 80, 10, 100, 15]
        },
        {
          backgroundColor: "transparent",
          borderColor: "#a5a5a5",
          data: [0, 50, 20, 70, 30, 27]
        },
        {
          backgroundColor: "transparent",
          borderColor: "#ff8084",
          data: [0, 30, 40, 10, 86, 40]
        }
      ]
    };

    const doughnutOptions = {
      title: "",
      pieHole: 0.35,
      pieSliceBorderColor: "none",
      colors: ["#ff8084", "#13c9ca", "#a5a5a5"],
      legend: {
        position: "none"
      },
      pieSliceText: "none",
      tooltip: {
        trigger: "none"
      },
      animation: {
        startup: true,
        easing: "linear",
        duration: 1500
      },
      chartArea: { left: 0, top: 10, width: "360px", height: "100%" },
      enableInteractivity: false
    };
    const pieOptions = {
      title: "",
      pieHole: 1,
      slices: [
        {
          color: "#ff8084"
        },
        {
          color: "#13c9ca"
        },
        {
          color: "#f0b54d"
        }
      ],
      tooltip: {
        showColorCode: false
      },
      chartArea: { left: 0, top: 10, width: "360px", height: "100%" },
      legend: "none"
    };
    const LineOptions = {
      hAxis: {
        textPosition: "none",
        baselineColor: "transparent",
        gridlineColor: "transparent"
      },
      vAxis: {
        textPosition: "none",
        baselineColor: "transparent",
        gridlineColor: "transparent"
      },
      colors: ["#ff8084"],
      legend: "none"
    };
    const LineOptions1 = {
      hAxis: {
        textPosition: "none",
        baselineColor: "transparent",
        gridlineColor: "transparent"
      },
      vAxis: {
        textPosition: "none",
        baselineColor: "transparent",
        gridlineColor: "transparent"
      },
      colors: ["#13c9ca"],
      chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
      legend: "none"
    };
    const LineOptions2 = {
      hAxis: {
        textPosition: "none",
        baselineColor: "transparent",
        gridlineColor: "transparent"
      },
      vAxis: {
        textPosition: "none",
        baselineColor: "transparent",
        gridlineColor: "transparent"
      },
      colors: ["#f5ce8a"],
      chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
      legend: "none"
    };
    const LineOptions3 = {
      hAxis: {
        textPosition: "none",
        baselineColor: "transparent",
        gridlineColor: "transparent"
      },
      vAxis: {
        textPosition: "none",
        baselineColor: "transparent",
        gridlineColor: "transparent"
      },
      colors: ["#a5a5a5"],
      chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
      legend: "none"
    };
    return (
      <Fragment>
        <Breadcrumb title="Dashboard" parent="Dashboard" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-md-6 xl-50">
              <div className="card o-hidden widget-cards">
                <div className="bg-warning card-body">
                  <div className="media static-top-widget row">
                    <div className="icons-widgets col-4">
                      <div className="align-self-center text-center">
                        <Navigation className="font-warning" />
                      </div>
                    </div>
                    <div className="media-body col-8">
                      <span className="m-0">Earnings</span>
                      <h3 className="mb-0">
                        $ <CountUp className="counter" end={6659} />
                        <small> This Month</small>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 xl-50">
              <div className="card o-hidden  widget-cards">
                <div className="bg-secondary card-body">
                  <div className="media static-top-widget row">
                    <div className="icons-widgets col-4">
                      <div className="align-self-center text-center">
                        <Box className="font-secondary" />
                      </div>
                    </div>
                    <div className="media-body col-8">
                      <span className="m-0">Products</span>
                      <h3 className="mb-0">
                        $ <CountUp className="counter" end={9856} />
                        <small> This Month</small>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 xl-100">
              <div className="card">
                <div className="card-header">
                  <h5>Latest Orders</h5>
                </div>
                <div className="card-body">
                  <div className="user-status table-responsive latest-order-table">
                    <table className="table table-bordernone">
                      <thead>
                        <tr>
                          <th scope="col">Order ID</th>
                          <th scope="col">Order Total</th>
                          <th scope="col">Product Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td className="digits">$120.00</td>
                          <td className="font-danger">product 1</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td className="digits">$90.00</td>
                          <td className="font-danger">product 2</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td className="digits">$240.00</td>
                          <td className="font-danger">product 3</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td className="digits">$120.00</td>
                          <td className="font-danger">product 4</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td className="digits">$50.00</td>
                          <td className="font-danger">product 5</td>
                        </tr>
                      </tbody>
                    </table>
                    <a href="/all-my-orders" className="btn btn-primary">
                      View All Orders
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Sales Status</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-3 col-sm-6 xl-50">
                      <div className="order-graph">
                        <h6>Orders By Location</h6>
                        <div className="chart-block chart-vertical-center">
                          <Chart
                            width={"100%"}
                            height={"180px"}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                              ["Task", "Hours per Day"],
                              ["Saint Lucia", 300],
                              ["Kenya", 50],
                              ["Liberia", 100]
                            ]}
                            options={doughnutOptions}
                            legend_toggle
                          />
                        </div>
                        <div className="order-graph-bottom">
                          <div className="media">
                            <div className="order-color-primary"></div>
                            <div className="media-body">
                              <h6 className="mb-0">
                                Saint Lucia{" "}
                                <span className="pull-right">$157</span>
                              </h6>
                            </div>
                          </div>
                          <div className="media">
                            <div className="order-color-secondary"></div>
                            <div className="media-body">
                              <h6 className="mb-0">
                                Kenya <span className="pull-right">$347</span>
                              </h6>
                            </div>
                          </div>
                          <div className="media">
                            <div className="order-color-danger"></div>
                            <div className="media-body">
                              <h6 className="mb-0">
                                Liberia<span className="pull-right">$468</span>
                              </h6>
                            </div>
                          </div>
                          <div className="media">
                            <div className="order-color-warning"></div>
                            <div className="media-body">
                              <h6 className="mb-0">
                                Christmas Island
                                <span className="pull-right">$742</span>
                              </h6>
                            </div>
                          </div>
                          <div className="media">
                            <div className="order-color-success"></div>
                            <div className="media-body">
                              <h6 className="mb-0">
                                Saint Helena{" "}
                                <span className="pull-right">$647</span>
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 xl-50">
                      <div className="order-graph sm-order-space">
                        <h6>Sales By Location</h6>
                        <div className="peity-chart-dashboard text-center">
                          <Chart
                            chartType="PieChart"
                            data={[
                              ["Task", "Hours per Day"],
                              ["Saint Lucia", 300],
                              ["Kenya", 50],
                              ["Liberia", 100]
                            ]}
                            options={pieOptions}
                            graph_id="PieChart"
                            width={"100%"}
                            height={"180px"}
                            legend_toggle
                          />
                        </div>
                        <div className="order-graph-bottom sales-location">
                          <div className="media">
                            <div className="order-shape-primary"></div>
                            <div className="media-body">
                              <h6 className="mb-0 mr-0">
                                Germany <span className="pull-right">25%</span>
                              </h6>
                            </div>
                          </div>
                          <div className="media">
                            <div className="order-shape-secondary"></div>
                            <div className="media-body">
                              <h6 className="mb-0 mr-0">
                                Brasil <span className="pull-right">10%</span>
                              </h6>
                            </div>
                          </div>
                          <div className="media">
                            <div className="order-shape-danger"></div>
                            <div className="media-body">
                              <h6 className="mb-0 mr-0">
                                United Kingdom
                                <span className="pull-right">34%</span>
                              </h6>
                            </div>
                          </div>
                          <div className="media">
                            <div className="order-shape-warning"></div>
                            <div className="media-body">
                              <h6 className="mb-0 mr-0">
                                Australia<span className="pull-right">5%</span>
                              </h6>
                            </div>
                          </div>
                          <div className="media">
                            <div className="order-shape-success"></div>
                            <div className="media-body">
                              <h6 className="mb-0 mr-0">
                                Canada <span className="pull-right">25%</span>
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 xl-100">
                      <div className="order-graph xl-space">
                        <h6>Revenue for last month</h6>
                        <div className="ct-4 flot-chart-container">
                          <Line data={employeeData} options={employeeOptions} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
// javascript:void(0)

export default Dashboard;
