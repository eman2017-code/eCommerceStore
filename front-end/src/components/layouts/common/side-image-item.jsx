import React, { Component } from "react";
import { Link } from "react-router-dom";
import store from "../../../store";

class SideImageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: ""
    };
  }

  componentDidMount() {
    store.getState();
    console.log("store.getState() in SideImageItem");
    console.log(store.getState());
  }

  onClickHandle(img) {
    this.setState({ image: img });
  }

  render() {
    const { product, symbol } = this.props;
    console.log("this.props in SideImageItem");
    console.log(this.props);

    return (
      <div className="product-box2">
        <div className="media">
          <Link
            to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.sku}`}
            product={product}
          >
            <img
              src={product.image}
              className="img-fluid lazyload bg-img"
              alt={product.name}
            />
          </Link>
          <div className="media-body align-self-center">
            <div>
              <Link
                to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.sku}`}
                product={product}
              >
                <h6>{product.name}</h6>
              </Link>

              <h4>
                {symbol}
                {product.price}
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideImageItem;
