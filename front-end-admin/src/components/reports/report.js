import React, { Component } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Chart } from "react-google-charts";
import { Line, Bar } from "react-chartjs-2";
import {
  lineChart,
  chartOptions,
  areaChart,
  areaOptions,
  barOptions,
  barChart,
  sellOption,
  sellData,
  salesOption,
  salesData
} from "../../constants/chartData";
import Report_table from "./report-table";

export class Reports extends Component {
  render() {
    return (
      <div>
        <Breadcrumb title="Reports" parent="Reports" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-8 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Sales Summary</h5>
                </div>
                <div className="card-body sell-graph">
                  <Line
                    data={salesData}
                    options={salesOption}
                    width={700}
                    height={305}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="card report-employee">
                <div className="card-header">
                  <h2>82%</h2>
                  <h6 className="mb-0">Employees Satisfied</h6>
                </div>
                <div className="card-body p-0">
                  <div className="ct-4 flot-chart-container">
                    <Line
                      data={lineChart}
                      options={chartOptions}
                      width={778}
                      height={500}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>
                  {" "}
                  "input a line graph that will show the gradual amount of
                  products sold"
                </h5>
              </div>
              <div className="card-body">
                <div className="report-last-sm">
                  <Line
                    data={sellData}
                    options={sellOption}
                    width={700}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reports;
