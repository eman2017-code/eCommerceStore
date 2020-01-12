import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideImageItem extends Component {
  constructor(props) {
    console.log("props in SideImageItem");
    console.log(props.product);
    super(props);

    this.state = {
      image: ""
    };
  }

  onClickHandle(img) {
    this.setState({ image: img });
  }

  render() {
    const { symbol } = this.props;
    console.log("this.props in SideImageItem");
    console.log(this.props);

    return (
      <div className="product-box2">
        <div className="media">
          {/* <Link
            to={`${process.env.PUBLIC_URL}/left-sidebar/product/${this.props.product.sku}`}
          > */}
          <Link
            to={{
              // pathname: {`${process.env.PUBLIC_URL}/left-sidebar/product/${this.props.product.sku}`},
              pathname: "/left-sidebar/product/" + this.props.product.sku,
              state: {
                item: this.props.product
              }
            }}
          >
            <img
              src={this.props.product.image}
              className="img-fluid lazyload bg-img"
              alt={this.props.name}
            />
          </Link>
          <div className="media-body align-self-center">
            <div>
              <Link
                to={`${process.env.PUBLIC_URL}/left-sidebar/product/${this.props.product.sku}`}
              >
                <h6>{this.props.product.name}</h6>
              </Link>

              <h4>
                {symbol}
                {this.props.product.price}
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideImageItem;
