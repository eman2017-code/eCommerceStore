import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-responsive-modal';


class ProductStyleThree extends Component {

    constructor(props){
        super(props)

        this.state = {
            image: ''
        }
    }

    onClickHandle(img) {
        this.setState({ image : img} );
    }


    render() {
        const {product, symbol, onAddToCartClicked, onAddToWishlistClicked, onAddToCompareClicked} = this.props;

        let RatingStars = []
        for(var i = 0; i < product.rating; i++) {
            RatingStars.push(<i className="fa fa-star" key={i}></i>)
        }

        return (

            <div className="product-box">
                <div className="img-wrapper">
                    <div className="img-block">
                        {(product.new == true)?
                            <div className="lable-wrapper">
                                <span className="lable1">new</span>
                                <span className="lable2">30% off</span>
                            </div>
                            : ''}

                        <div className="front">
                            <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`} ><img
                                src={product.variants?
                                    this.state.image?this.state.image:product.variants[0].images
                                    :product.pictures[0]}
                                className="img-fluid"
                                alt="" /></Link>
                        </div>
                        <div className="cart-info">
                            <button title="Add to cart" onClick={() => onAddToCartClicked(product, 1)}>
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                            </button>
                            <a href="javascript:void(0)" title="Add to Wishlist" onClick={onAddToWishlistClicked} >
                                <i className="fa fa-heart" aria-hidden="true"></i>
                            </a>
                            <a href="javascript:void(0)" data-toggle="modal"
                               data-target="#quick-view"
                               title="Quick View"
                               ><i className="fa fa-search" aria-hidden="true"></i></a>
                            <Link to={`${process.env.PUBLIC_URL}/compare`} title="Compare" onClick={onAddToCompareClicked}>
                                <i className="fa fa-refresh" aria-hidden="true"></i></Link>
                        </div>
                    </div>
                    <div className="product-detail">
                        <div>
                            <div className="rating">
                                {RatingStars}
                            </div>
                            <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`}>
                                <h6>{product.name}</h6>
                            </Link>
                            <h4>{symbol}{product.price-(product.price*product.discount/100)}
                                <del><span className="money">{symbol}{product.price}</span></del></h4>
                            {product.variants?
                            <ul className="color-variant">
                                {product.variants.map((vari, i) => {
                                    return (
                                        <li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images)}></li>)
                                })}
                            </ul>:''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductStyleThree;