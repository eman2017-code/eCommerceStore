import React, { Component, Fragment } from "react";
import Breadcrumb from "./common/breadcrumb";
import Datatable from "./common/datatable";

export class Orders extends Component {
  render() {
    return (
      <Fragment>
        <Breadcrumb title="Orders" parent="Orders" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Orders List</h5>
                </div>
                <div className="card-body">
                  <div id="basicScenario" className="product-list">
                    <Datatable
                      multiSelectOption={false}
                      pageSize={10}
                      pagination={true}
                      class="-striped -highlight"
                    />
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

export default Orders;
