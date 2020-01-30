import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { Edit, Trash2 } from "react-feather";
import { connect } from "react-redux";
import store from "../../../store";

const debug = true;
let apiURL;
if (debug) {
  apiURL = "http://localhost:8000/api/v1/";
} else {
  apiURL = "http://35.222.68.3:8000/api/v1/";
}

export class Product_list extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  getAllProducts = async () => {
    fetch(apiURL + "products/admin/")
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          products: [...myJson.data]
        });
      });
  };

  componentDidMount() {
    this.getAllProducts();
  }

  // // to delete product
  // deleteProduct = async productId => {
  //   const response = await fetch(apiURL + "products/:productId/", {
  //     credentials: "include",
  //     method: "DELETE"
  //   });

  //   const parsedResponse = await response.json();
  //   console.log("parsedResponse:", parsedResponse);
  // };

  render() {
    return (
      <Fragment>
        <Breadcrumb title="Current Inventory" parent="Physical" />
        <div className="container-fluid">
          <div className="row products-admin ratio_asos">
            {this.state.products.map((product, i) => {
              return (
                <div className="col-xl-3 col-sm-6" key={i}>
                  <div className="card">
                    <div className="products-admin">
                      <div className="card-body product-box">
                        <div className="img-wrapper">
                          <div className="lable-block">
                            {product.tag ? (
                              <span className="lable3">{product.tag}</span>
                            ) : (
                              ""
                            )}
                            {product.discount ? (
                              <span className="lable4">{product.discount}</span>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="front">
                            <a className="bg-size">
                              <img
                                className="img-fluid blur-up bg-img lazyloaded"
                                src={product.image}
                              />
                            </a>
                            <div className="product-hover">
                              <ul>
                                <li>
                                  <button className="btn" type="button">
                                    <Edit className="editBtn" />
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="btn"
                                    type="button"
                                    // onClick={this.deleteProduct}
                                  >
                                    <Trash2 className="deleteBtn" />
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="product-detail">
                          <a>
                            {" "}
                            <h6>{product.name}</h6>
                          </a>
                          <h4>
                            {/* {symbol} */}
                            {product.price}
                          </h4>
                          <br />
                          <span className="lable4">{product.description}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  }
}

// export default Product_list;
const mapStateToProps = state => ({
  // products: getVisibleproducts(state.data),
  symbol: state.data.symbol
});

export default connect(mapStateToProps, {})(Product_list);
