import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-responsive-modal';


class ProductStyleOne extends Component {

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
                    <div className="lable-block">
                        {(product.new == true)? <span className="lable3">new</span> : ''}
                        {(product.sale == true)? <span className="lable4">on sale</span> : ''}
                    </div>
                    <div className="front">
                        <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`} ><img
                            src={product.variants?
                                this.state.image?this.state.image:product.variants[0].images
                                :product.pictures[0]}
                            className="img-fluid"
                            alt="" /></Link>
                    </div>
                    <div className="cart-info cart-wrap">
                        <button title="Add to cart" onClick={() => onAddToCartClicked(product, 1)}>
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        </button>
                        <a href="javascript:void(0)" title="Add to Wishlist" onClick={onAddToWishlistClicked} >
                            <i className="fa fa-heart" aria-hidden="true"></i>
                        </a>
                        <a href="javascript:void(0)" data-toggle="modal"
                           data-target="#quick-view"
                           title="Quick View">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </a>
                        <Link to={`${process.env.PUBLIC_URL}/compare`} title="Compare" onClick={onAddToCompareClicked}>
                            <i className="fa fa-refresh" aria-hidden="true"></i></Link>
                    </div>
                    {product.variants?
                    <ul className="product-thumb-list">
                        {product.variants.map((vari, i) =>
                            <li className={`grid_thumb_img ${(vari.images === this.state.image)?'active':''}`} key={i}>
                                <a href="javascript:void(0)" title="Add to Wishlist">
                                    <img src={`${vari.images}`} onClick={() => this.onClickHandle(vari.images)} />
                                </a>
                            </li>)
                        }
                    </ul>:''}

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
        )
    }
}

export default ProductStyleOne;