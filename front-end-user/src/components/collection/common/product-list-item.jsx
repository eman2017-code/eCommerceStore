import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import { fetchSingleProductFromElastic } from '../../../actions'

class ProductListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      stock: "InStock",
      quantity: 1,
      image: props.product.image
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onClickHandle(img) {
    this.setState({ image: img });
  }

  minusQty = () => {
    if (this.state.quantity > 1) {
      this.setState({ stock: "InStock" });
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  plusQty = () => {
    if (this.props.product.stock >= this.state.quantity) {
      this.setState({ quantity: this.state.quantity + 1 });
    } else {
      this.setState({ stock: "Out of Stock !" });
    }
  };
  changeQty = e => {
    this.setState({ quantity: parseInt(e.target.value) });
  };

  render() {
    const { product, symbol, onAddToCartClicked, fetchSingleProductFromElastic } = this.props;
    const { open } = this.state;

    return (
      <div className="product-box">
        <div className="img-wrapper">
          <div className="front">
            <Link
              to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.sku}`}
              onClick={ () => {fetchSingleProductFromElastic(product.sku)} }>
              <img src={this.state.image} className="img-fluid" alt="" />
            </Link>
          </div>
          <div className="cart-info cart-wrap">
            <button
              title="Add to cart"
              onClick={() => onAddToCartClicked(product, 1)}
            >
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </button>
            <button
              data-toggle="modal"
              data-target="#quick-view"
              title="Quick View"
              onClick={this.onOpenModal}
            >
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div className="product-detail">
          <div>
            <Link
              to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.sku}`}
              onClick={ () => {fetchSingleProductFromElastic(product.sku)} }>
              <h6>{product.name}</h6>
            </Link>
            <h4>
              <span className="money">
                {symbol}
                {product.price}
              </span>
            </h4>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div className="modal-content quick-view-modal">
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-6  col-xs-12"></div>
                  <div className="col-lg-6 rtl-text">
                    <div className="product-right">
                      <img src={product.image} alt="" className="img-fluid" />
                      <h2> {product.name} </h2>
                      <div className="border-product">
                        <h6 className="product-title">product details</h6>
                        <p>{product.description}</p>
                      </div>
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
                        <button
                          className="btn btn-solid"
                          onClick={() =>
                            onAddToCartClicked(product, this.state.quantity)
                          }
                        >
                          add to cart
                        </button>
                        <Link
                          to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.sku}`}
                          onClick={ () => {fetchSingleProductFromElastic(product.sku)} }
                          className="btn btn-solid"
                        >
                          view detail
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
})

export default connect(mapStateToProps, { fetchSingleProductFromElastic })(ProductListItem);


