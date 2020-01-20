import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchSingleProductFromElastic } from "../../actions";
import { connect } from "react-redux";

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

  // if a product image doesnt load correctly, this function replaces the image with a default picture
  addDefaultImage(e) {
    e.target.onerror = null;
    e.target.src = `${process.env.PUBLIC_URL}/assets/images/image-not-found.jpg`;
  }

  render() {
    const { product, symbol, fetchSingleProductFromElastic } = this.props;

    return (
      <div className="product-box2">
        <div className="media">
          <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.sku}`}
                onClick={ () => fetchSingleProductFromElastic(product.sku) }>
            <img
              onError={this.addDefaultImage}
              src={product.image}
              className="img-fluid lazyload bg-img"
              alt={product.name}
            />
          </Link>
          <div className="media-body align-self-center">
            <div>
              <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.sku}`}
                    onClick={ () => fetchSingleProductFromElastic(product.sku) }>
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

const mapStateToProps = state => ({
})


export default connect(mapStateToProps, { fetchSingleProductFromElastic })(SideImageItem);
