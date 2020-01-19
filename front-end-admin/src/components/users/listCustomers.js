import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listCustomers";
import Datatable from "../common/datatable";

export class List_user extends Component {
  render() {
    return (
      <Fragment>
        <Breadcrumb title="Customer List" parent="Users" />
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h5>Customer Details</h5>
            </div>
            <div className="card-body">
              <div className="clearfix"></div>
              <div
                id="batchDelete"
                className="category-table user-list order-table coupon-list-delete"
              >
                <Datatable
                  multiSelectOption={true}
                  myData={data}
                  pageSize={10}
                  pagination={true}
                  class="-striped -highlight"
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default List_user;
