import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createProduct } from "../../../actions";

export class Add_product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: undefined,
      name: "",
      model: "",
      price: "",
      manufacturer: "",
      description: "",
      sku: this.randomSkuGenerator(),
      upc: this.randomUpcGenerator()
    };
  }

  // method to randomly generate sku number
  randomSkuGenerator = () => {
    const randomSku = Math.floor(1000000 + Math.random() * 900000);
    return randomSku;
  };

  // method to randomly generate upc number
  randomUpcGenerator = () => {
    const randomUpc = parseInt(Math.random() * 1000000000, 10);
    return randomUpc;
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }

  handleFileChange = e => {
    this.setState({
      image: e.target.files[0]
    })
  }

  // method to clear all fields
  discardFields = () => {
    this.setState({
      image: "",
      name: "",
      model: "",
      price: "",
      manufacturer: "",
      description: ""
    });
  };

  // listens for the create product form to be submitted
  handleCreateProduct = async (e) => {
    e.preventDefault();
    console.log(this.state.image);

    // create the FormData object for sending the form data to express
    const productData = new FormData();
    productData.append('file', this.state.image, this.state.image.name);
    productData.append('name', this.state.name);
    productData.append('model', this.state.model);
    productData.append('price', this.state.price);
    productData.append('manufacturer', this.state.manufacturer);
    productData.append('description', this.state.description);
    productData.append('upc', this.state.upc);
    productData.append('sku', this.state.sku);

    // // creates a product
    await this.props.createProduct(productData);
  }

  render() {
    return (
      <Fragment>
        <Breadcrumb title="Add Product" parent="Physical" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Add Product</h5>
                </div>
                <form
                  className="needs-validation add-product-form"
                  onSubmit={e => this.handleCreateProduct(e)}
                >
                  <div className="card-body">
                    <div className="row product-adding">
                      <div className="col-xl-5">
                        <div className="add-product">
                          <div className="row">
                            <label className="col-xl-3 col-sm-4 mb-0">
                              Select Photo:{" "}
                              <input
                                type="file"
                                name="image"
                                onChange={e => this.handleFileChange(e)}
                              ></input>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-7">
                        <div className="form form-label-center">
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">
                              Product Name :
                            </label>
                            <div className="col-xl-8 col-sm-7">
                              <input
                                value={this.state.name}
                                onChange={this.handleChange}
                                name="name"
                                className="form-control"
                                id="validationCustom01"
                                type="text"
                                required
                              ></input>
                            </div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">
                              Model :
                            </label>
                            <div className="col-xl-8 col-sm-7">
                              <input
                                value={this.state.model}
                                onChange={this.handleChange}
                                name="model"
                                className="form-control mb-0"
                                id="validationCustom02"
                                type="text"
                                required
                              ></input>
                            </div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">
                              Price :
                            </label>
                            <div className="col-xl-8 col-sm-7">
                              <input
                                value={this.state.price}
                                onChange={this.handleChange}
                                name="price"
                                className="form-control mb-0"
                                id="validationCustom03"
                                type="number"
                                required
                              ></input>
                            </div>
                          </div>
                        </div>
                        <div className="form">
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">
                              Manufacturer :
                            </label>
                            <div className="col-xl-8 col-sm-7">
                              <input
                                value={this.state.manufacturer}
                                onChange={this.handleChange}
                                name="manufacturer"
                                className="form-control"
                                id="validationCustom04"
                                type="text"
                                required
                              ></input>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-xl-3 col-sm-4">
                              Add Description :
                            </label>
                            <div className="col-xl-8 col-sm-7 description-sm">
                              <textarea
                                value={this.state.description}
                                onChange={this.handleChange}
                                name="description"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="offset-xl-3 offset-sm-4">
                          <button type="submit" className="btn btn-primary">
                            Add
                          </button>
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={this.discardFields}
                          >
                            Discard
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

// export default Add_product;

Add_product.propTypes = {
  createProduct: PropTypes.func
};

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps, { createProduct })(Add_product);
