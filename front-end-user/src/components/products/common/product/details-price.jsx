import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";

class DetailsWithPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      quantity: 1,
      nav3: null
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.setState({
      nav3: this.slider3
    });
  }

  minusQty = () => {
    if (this.state.quantity > 1) {
      this.setState({ stock: "InStock" });
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  plusQty = () => {
    this.setState({ quantity: this.state.quantity + 1 });
  };

  changeQty = e => {
    this.setState({ quantity: parseInt(e.target.value) });
  };

  render() {
    const { symbol, product, addToCartClicked, BuynowClicked } = this.props;

    return (
      <div className="col-lg-6 rtl-text">
        <div className="product-right">
          <h2> {product.name} </h2>
          <h4>
            <span className="money">
              {symbol}
              {product.price}
            </span>
          </h4>
          <div className="product-description border-product">
            <h6 className="product-title">quantity</h6>
            <div className="qty-box">
              <div className="input-group">
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-left-minus"
                    onClick={this.minusQty}
                    data-type="minus"
                    data-field=""
                  >
                    <i className="fa fa-angle-left"></i>
                  </button>
                </span>
                <input
                  type="text"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.changeQty}
                  className="form-control input-number"
                />
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-right-plus"
                    onClick={this.plusQty}
                    data-type="plus"
                    data-field=""
                  >
                    <i className="fa fa-angle-right"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="product-buttons">
            <li
              className="btn btn-solid"
              onClick={() => addToCartClicked(product, this.state.quantity)}
            >
              add to cart
            </li>
            <Link
              to={`${process.env.PUBLIC_URL}/checkout`}
              className="btn btn-solid"
              onClick={() => BuynowClicked(product, this.state.quantity)}
            >
              buy now
            </Link>
          </div>
          <div className="border-product">
            <h6 className="product-title">product details</h6>
            <p>{product.shortDetails}</p>
          </div>
          <div className="border-product">
            <h6 className="product-title">share it</h6>
            <div className="product-icon">
              <ul className="product-social">
                <li>
                  <i className="fa fa-facebook"></i>
                </li>
                <li>
                  <i className="fa fa-google-plus"></i>
                </li>
                <li>
                  <i className="fa fa-twitter"></i>
                </li>
                <li>
                  <i className="fa fa-instagram"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Sheer Straight Kurta
                </h5>
              </div>
              <div className="modal-body">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/size-chart.jpg`}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default DetailsWithPrice;
