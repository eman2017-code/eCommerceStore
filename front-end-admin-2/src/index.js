import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.scss";
import App from "./components/app";
import { ScrollContext } from "react-router-scroll-4";
import { createStore } from "redux";

// handling store
import store from "./store";
import { listProductsAdmin } from "./actions";

// Components
import Dashboard from "./components/dashboard";

// Products physical
import Category from "./components/products/physical/category";
import Product_list from "./components/products/physical/product-list";
import Add_product from "./components/products/physical/add-product";

//Coupons
import ListCoupons from "./components/coupons/list-coupons";
import Create_coupons from "./components/coupons/create-coupons";

//Pages
import ListPages from "./components/pages/list-page";
import ListCustomers from "./components/users/listCustomers";
import Profile from "./components/settings/profile";
import Reports from "./components/reports/report";
import Orders from "./components/all-my-orders";
import Datatable from "./components/common/datatable";
import Login from "./components/auth/login";

class Root extends Component {
  render() {
    // store.dispatch(listProductsAdmin());
    return (
      <Provider store={store}>
        <BrowserRouter basename={"/"}>
          <ScrollContext>
            <Switch>
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/`}
                component={Login}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/auth/login`}
                component={Login}
              />

              <App>
                <Route
                  path={`${process.env.PUBLIC_URL}/dashboard`}
                  component={Dashboard}
                />

                <Route
                  path={`${process.env.PUBLIC_URL}/products/physical/category`}
                  component={Category}
                />

                <Route
                  path={`${process.env.PUBLIC_URL}/products/physical/product-list`}
                  component={Product_list}
                />

                <Route
                  path={`${process.env.PUBLIC_URL}/products/physical/add-product`}
                  component={Add_product}
                />

                <Route
                  path={`${process.env.PUBLIC_URL}/coupons/list-coupons`}
                  component={ListCoupons}
                />

                <Route
                  path={`${process.env.PUBLIC_URL}/coupons/create-coupons`}
                  component={Create_coupons}
                />

                <Route
                  path={`${process.env.PUBLIC_URL}/pages/list-page`}
                  component={ListPages}
                />

                <Route
                  path={`${process.env.PUBLIC_URL}/users/list-customers`}
                  component={ListCustomers}
                />

                <Route
                  path={`${process.env.PUBLIC_URL}/reports/report`}
                  component={Reports}
                />

                <Route
                  path={`${process.env.PUBLIC_URL}/view/profile`}
                  component={Profile}
                />

                <Route
                  path={`${process.env.PUBLIC_URL}/all-my-orders`}
                  component={Orders}
                />

                <Route
                  path={`${process.env.PUBLIC_URL}/data-table`}
                  component={Datatable}
                />
              </App>
            </Switch>
          </ScrollContext>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("adminDashboard"));
