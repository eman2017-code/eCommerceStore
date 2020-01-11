import React from "react";
import { Link } from "react-router-dom";

const CartHeader = ({ item, total, symbol, removeFromCart }) => (
  <li>
    <div className="media">
      <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${item.sku}`}>
        <img alt="" className="mr-3" src={`${item.picture}`} />
      </Link>
      <div className="media-body">
        <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${item.sku}`}>
          <h4>{item.name}</h4>
        </Link>
        <h4>
          <span>
            {item.qty} x {symbol} {item.price}
          </span>
        </h4>
      </div>
    </div>
    <div className="close-circle">
      <button onClick={removeFromCart}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </button>
    </div>
  </li>
);

export default CartHeader;
