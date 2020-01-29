import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { Edit, Trash2 } from "react-feather";
import { connect } from "react-redux";
import { getVisibleproducts } from "../../../services";
import store from "../../../store";
import { getAllProducts } from "../../../actions";

export class Product_list extends Component {
  constructor(props) {
    super(props);
  }

  // get the total number of products that the admin currently has for sale
  getTotalProducts = () => {
    let count = 0;
    let notAProduct = [];
    const products = this.props.products;
    for (let i = 0; i < products.length; i++) {
      if (products[i].name === undefined) {
        notAProduct.push(products[i]);
      } else {
        count += 1;
      }
    }
    console.log("count:", count);
    return count;
  };

  componentDidMount() {
    this.getTotalProducts();
  }

  render() {
    store.dispatch(getAllProducts());
    const { products, symbol } = this.props;
    console.log("this.props in product_list:", this.props);

    return (
      <Fragment>
        <Breadcrumb title="Current Inventory" parent="Physical" />
        <div className="container-fluid">
          <div className="row products-admin ratio_asos">
            {products.map((product, i) => {
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
                                  <button className="btn" type="button">
                                    <Trash2 className="deleteBtn" />
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="product-detail">
                          <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </div>
                          <a>
                            {" "}
                            <h6>{product.name}</h6>
                          </a>
                          <h4>
                            {symbol}
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
  products: getVisibleproducts(state.products),
  symbol: state.products.symbol
});

export default connect(mapStateToProps, {})(Product_list);
