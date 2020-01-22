import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import CKEditors from "react-ckeditor-component";
import { AvField, AvForm } from "availity-reactstrap-validation";
import one from "../../../assets/images/pro3/1.jpg";
import user from "../../../assets/images/user.png";

export class Add_product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      name: "",
      category: "",
      isOnSale: false,
      upc: this.randomUpcGenerator(),
      sku: this.randomSkuGenerator(),
      description: "",
      price: "",
      model: "",
      manufacturer: ""
    };
  }

  // method to randomly generate sku number
  randomSkuGenerator = () => {
    const randomSku = Math.floor(1000000 + Math.random() * 900000);
    console.log("randomSku", randomSku);
    return randomSku;
  };

  // method to randomly generate upc number
  randomUpcGenerator = () => {
    const randomUpc = parseInt(Math.random() * 1000000000, 10);
    console.log("randomUpc", randomUpc);
    return randomUpc;
  };

  IncrementItem = () => {
    this.setState(prevState => {
      if (prevState.quantity < 9) {
        return {
          quantity: prevState.quantity + 1
        };
      } else {
        return null;
      }
    });
  };

  DecreaseItem = () => {
    this.setState(prevState => {
      if (prevState.quantity > 0) {
        return {
          quantity: prevState.quantity - 1
        };
      } else {
        return null;
      }
    });
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  // //image upload
  // _handleSubmit(e) {
  //   e.preventDefault();
  // }

  // route to search for products
  addProduct = async () => {
    try {
      const response = await fetch("http://35.222.68.3:8000/api/v1/products/", {
        method: "POST",
        body: JSON.stringify({ searchTerm: this.state.searchTerm }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      // convert response to json
      const parsedResponse = await response.json();
      console.log("parsedResponse");
      console.log(parsedResponse);
    } catch (err) {}
  };

  // _handleImgChange(e, i) {
  //   e.preventDefault();

  //   let reader = new FileReader();
  //   let file = e.target.files[0];
  //   const { dummyimgs } = this.state;

  //   reader.onloadend = () => {
  //     dummyimgs[i].img = reader.result;
  //     this.setState({
  //       file: file,
  //       dummyimgs
  //     });
  //   };
  //   reader.readAsDataURL(file);
  // }

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
                <div className="card-body">
                  <div className="row product-adding">
                    <div className="col-xl-5">
                      <div className="add-product">
                        <div className="row">
                          <label className="col-xl-3 col-sm-4 mb-0">
                            Select Photo:{" "}
                            <input
                              type="file"
                              value={this.state.file}
                              onChange={this.handleChange}
                            ></input>
                          </label>
                          <div className="col-xl-3 xl-50 col-sm-6 col-3"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-7">
                      <AvForm
                        className="needs-validation add-product-form"
                        onValidSubmit={this.handleValidSubmit}
                        onInvalidSubmit={this.handleInvalidSubmit}
                      >
                        <div className="form form-label-center">
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">
                              Product Name :
                            </label>
                            <div className="col-xl-8 col-sm-7">
                              <AvField
                                value={this.state.name}
                                onChange={this.handleChange}
                                className="form-control"
                                name="product_category"
                                id="validationCustom01"
                                type="text"
                                required
                              />
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">
                              Model :
                            </label>
                            <div className="col-xl-8 col-sm-7">
                              <AvField
                                value={this.state.model}
                                onChange={this.handleChange}
                                className="form-control mb-0"
                                name="product_category"
                                id="validationCustom02"
                                type="text"
                                required
                              />
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">
                              Price :
                            </label>
                            <div className="col-xl-8 col-sm-7">
                              <AvField
                                value={this.state.price}
                                onChange={this.handleChange}
                                className="form-control mb-0"
                                name="price"
                                id="validationCustom03"
                                type="number"
                                required
                              />
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        </div>
                        <div className="form">
                          <div className="form-group row">
                            <label className="col-xl-3 col-sm-4 mb-0">
                              Total Products :
                            </label>
                            <fieldset className="qty-box ml-0">
                              <div className="input-group bootstrap-touchspin">
                                <div className="input-group-prepend">
                                  <button
                                    className="btn btn-primary btn-square bootstrap-touchspin-down"
                                    type="button"
                                    onClick={this.DecreaseItem}
                                  >
                                    <i className="fa fa-minus"></i>
                                  </button>
                                </div>
                                <div className="input-group-prepend">
                                  <span className="input-group-text bootstrap-touchspin-prefix"></span>
                                </div>
                                <input
                                  className="touchspin form-control"
                                  type="text"
                                  value={this.state.quantity}
                                  onChange={this.handleChange}
                                />
                                <div className="input-group-append">
                                  <span className="input-group-text bootstrap-touchspin-postfix"></span>
                                </div>
                                <div className="input-group-append ml-0">
                                  <button
                                    className="btn btn-primary btn-square bootstrap-touchspin-up"
                                    type="button"
                                    onClick={this.IncrementItem}
                                  >
                                    <i className="fa fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">
                              Manufacturer :
                            </label>
                            <div className="col-xl-8 col-sm-7">
                              <AvField
                                value={this.state.manufacturer}
                                onChange={this.handleChange}
                                className="form-control"
                                name="product_category"
                                id="validationCustom04"
                                type="text"
                                required
                              />
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                          <div className="form-group row">
                            <label className="col-xl-3 col-sm-4">
                              Add Description :
                            </label>
                            <div className="col-xl-8 col-sm-7 description-sm">
                              <CKEditors
                                value={this.state.description}
                                onChange={this.handleChange}
                                activeclassName="p10"
                                content={this.state.content}
                                events={{
                                  blur: this.onBlur,
                                  afterPaste: this.afterPaste,
                                  change: this.onChange
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="offset-xl-3 offset-sm-4">
                          <button type="submit" className="btn btn-primary">
                            Add
                          </button>
                          <button type="button" className="btn btn-light">
                            Discard
                          </button>
                        </div>
                      </AvForm>
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

export default Add_product;
