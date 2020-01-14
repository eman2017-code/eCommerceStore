import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchSingleProductFromElastic } from "../../actions";

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

  // // route to fetch product based off productId
  // fetchProductFromElastic = async productId => {
  //   try {
  //     // api call
  //     const response = await fetch(
  //       process.env.REACT_APP_API_URL + "/api/v1/search/product/" + productId,
  //       {
  //         credentials: "include"
  //       }
  //     );
  //     // convert response to json
  //     const parsedResponse = response.json();
  //     console.log("parsedResponse");
  //     console.log(parsedResponse);
  //     return parsedResponse;
  //   } catch (err) {}
  // };
  fetchProductFromElastic = async productId => {
    const api =
      process.env.REACT_APP_API_URL + "/api/v1/search/product/" + productId;
    fetch(api)
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json.data[0]._source.message;
      });
  };

  render() {
    const { product, symbol } = this.props;
    console.log("this.props in SideImageItem");
    console.log(this.props);

    return (
      <div className="product-box2">
        <div className="media">
          <Link
            to={`${
              process.env.PUBLIC_URL
            }/left-sidebar/product/${this.fetchProductFromElastic(
              product.sku
            )}`}
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
                to={`${
                  process.env.PUBLIC_URL
                }/left-sidebar/product/${this.fetchProductFromElastic(
                  product.sku
                )}`}
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
