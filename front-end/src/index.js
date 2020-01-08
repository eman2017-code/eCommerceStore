import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ScrollContext } from "react-router-scroll-4";
import { IntlReducer as Intl, IntlProvider } from "react-redux-multilingual";
import "./index.scss";

// Import custom components
import store from "./store";
import translations from "./constants/translations";
import { getAllProducts } from "./actions";

// Layouts
import Lander from "./components/layouts/lander/main";

// Collection Pages
import CollectionMetro from "./components/collection/collection-metro";

// // Product Pages
import LeftSideBar from "./components/products/left-sidebar";
// import RightSideBar from "./components/products/right-sidebar";
// import NoSideBar from "./components/products/no-sidebar";
// import LeftImage from "./components/products/left-image";
// import RightImage from "./components/products/right-image";
// import Accordian from "./components/products/accordian";
// import ColumnLeft from "./components/products/column-left";
// import ColumnRight from "./components/products/column-right";
// import Column from "./components/products/column";
// import Vertical from "./components/products/vertical";

// // Features
import Layout from "./components/app";
import Cart from "./components/cart";
import checkOut from "./components/checkout";
import orderSuccess from "./components/checkout/success-page";

// // Extra Pages
import Login from "./components/pages/login";
import Register from "./components/pages/register";

class Root extends React.Component {
  render() {
    store.dispatch(getAllProducts());

    return (
      <Provider store={store}>
        <IntlProvider translations={translations} locale="en">
          <BrowserRouter basename={"/"}>
            <ScrollContext>
              <Switch>
                {/* Main Page */}
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/`}
                  component={Lander}
                />
                <Layout>
                  {/* All Products Page */}
                  <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/all-products`}
                    component={CollectionMetro}
                  />
                  {/* Single Product Page  */}
                  <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/left-sidebar/product/:id`}
                    component={LeftSideBar}
                  />
                  {/* Cart Page  */}
                  <Route
                    path={`${process.env.PUBLIC_URL}/cart`}
                    component={Cart}
                  />
                  {/* Checkout Page  */}
                  <Route
                    path={`${process.env.PUBLIC_URL}/checkout`}
                    component={checkOut}
                  />
                  {/* Order Sucess Page */}
                  <Route
                    path={`${process.env.PUBLIC_URL}/order-success`}
                    component={orderSuccess}
                  />
                  {/* Login Page */}
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/login`}
                    component={Login}
                  />
                  {/* Register Page */}
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/register`}
                    component={Register}
                  />
                </Layout>
              </Switch>
            </ScrollContext>
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));
