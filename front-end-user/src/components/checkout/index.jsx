import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import PaypalExpressBtn from "react-paypal-express-checkout";
import {Elements, StripeProvider} from 'react-stripe-elements';
import {CardElement, injectStripe} from 'react-stripe-elements';
import SimpleReactValidator from "simple-react-validator";

import Breadcrumb from "../boilerplates/breadcrumb";
import { getCartTotal } from "../../services";


class checkOut extends Component {

    constructor(props) {
        super(props);

        this.state = {
            payment: "stripe",
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            country: "",
            address: "",
            city: "",
            state: "",
            pincode: ""
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    // executes when the paypal payment is successful
    paypalSuccess = (data) => {
        console.log('paypal success');
    }

    // executes when the paypal payment is canceled
    paypalCancel = (data) => {
        console.log('paypal cancel');
    }

    // executes when theres an error in a paypal payment
    paypalError = (data) => {
        console.log('paypal error');
    }

    render() {
        const { cartItems, symbol, total } = this.props;

        const client = {
            sandbox:
              "AdpXajVLZK--uQ1DtiDlLQSBFbc5-Sjy95D70RN8Uj1akkCgu-7QmdATnt1LdkgeaDGAeYhTVQyFhfsr",
            production:
              "AdpXajVLZK--uQ1DtiDlLQSBFbc5-Sjy95D70RN8Uj1akkCgu-7QmdATnt1LdkgeaDGAeYhTVQyFhfsr"
          };

        return (
            <div>
                <Helmet>
                <title>E-Commerce | Store</title>
                </Helmet>

                <Breadcrumb title={"Checkout"} />

                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">

                            <div className="checkout-form">
                                <form>
                                    <div className="checkout row">
                                        

                                        <div className="col-lg-12 col-sm-12 col-xs-12">
                                            <div className="checkout-details">
                                                <div className="order-box">
                                                    <div className="title-box">
                                                        <div>Products</div>

                                                        <ul className="qty">
                                                        {cartItems.map((item, index) => {
                                                            return (
                                                                <li key={index} className="d-flex">
                                                                    <p>{item.name} × {item.qty}{" "}</p>
                                                                    <p className="px-2">-</p>
                                                                    <p>
                                                                        {symbol} {total}
                                                                    </p>
                                                                </li>
                                                            );
                                                        })}
                                                        </ul>
                                                    </div>

                                                    <div className="d-flex justify-content-between">
                                                        <PaypalExpressBtn
                                                            env={"sandbox"}
                                                            client={client}
                                                            currency={"USD"}
                                                            total={total}
                                                            onError={this.paypalError}
                                                            onSuccess={this.paypalSuccess}
                                                            onCancel={this.paypalCancel}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn-solid btn">
                                                            Pay With Card
                                                        </button>
                                                    </div>
                                                    
                                                    
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </section>    
            </div> 
            
        )
    }
    
}

const mapStateToProps = state => ({
    cartItems: state.cartList.cart,
    symbol: state.data.symbol,
    total: getCartTotal(state.cartList.cart),
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo
});

export default connect(mapStateToProps)(checkOut);

