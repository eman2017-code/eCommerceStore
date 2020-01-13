import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideImageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      products: []
    };
  }

  componentDidMount() {
    this.setState({
      products: [{ ...this.props.product }]
    });
  }

  onClickHandle(img) {
    this.setState({ image: img });
  }

  render() {
    const { product, symbol } = this.props;

    return (
      <div className="product-box2">
        <div className="media">
          <Link
            to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.sku}`}
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
