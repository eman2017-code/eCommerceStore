import React, {Component} from 'react';
import Slider from "react-slick"
import {connect} from "react-redux";

// import Custom Components
import Breadcrumb from "../../common/breadcrumb";
import ProductStyleOne from "./common/product-style-one";
import {getVisibleproducts} from "../../../services";
import {addToCart, addToCompare, addToWishlist} from "../../../actions";
import {Product4} from "../../../services/script";

class ElementProductSlider extends Component {


    render (){
        const {products, addToCart, symbol, addToWishlist, addToCompare} = this.props;
        return (
            <div>
                <Breadcrumb parent={'Elements'} title={'product Slider'}/>

                <section className="ratio_asos section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <Slider {...Product4} className="product-4 product-m no-arrow">
                                { products.map((product, index) =>
                                    <div className="col-xl-3 col-md-6 col-grid-box" key={index}>
                                    <ProductStyleOne product={product} symbol={symbol}
                                                     onAddToCompareClicked={() => addToCompare(product)}
                                                     onAddToWishlistClicked={() => addToWishlist(product)}
                                                     onAddToCartClicked={addToCart} key={index}/>
                                    </div>)}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    products: getVisibleproducts(state.data, state.filters),
    symbol: state.data.symbol,
})

export default connect(
    mapStateToProps, {addToCart, addToWishlist, addToCompare}
)(ElementProductSlider)