import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import PaypalExpressBtn from "react-paypal-express-checkout";
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

    render() {


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
                                        <div className="col-lg-6 col-sm-12 col-xs-12">
                                            <div className="checkout-title">
                                                <h3>Billing Details</h3>
                                            </div>

                                            <div className="row check-out">
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">First Name</div>
                                                    <input
                                                        type="text"
                                                        name="first_name"
                                                        value={this.state.first_name}
                                                        onChange={this.handleInputChange}
                                                    />
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Last Name</div>
                                                    <input
                                                        type="text"
                                                        name="last_name"
                                                        value={this.state.last_name}
                                                        onChange={this.handleInputChange}
                                                    />
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Phone</div>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={this.state.phone}
                                                        onChange={this.handleInputChange}
                                                    />
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Email</div>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={this.state.email}
                                                        onChange={this.handleInputChange}
                                                    />
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label">Country</div>
                                                    <select
                                                        name="country"
                                                        value={this.state.country}
                                                        onChange={this.handleInputChange}
                                                    >
                                                        <option>India</option>
                                                        <option>South Africa</option>
                                                        <option>United States</option>
                                                        <option>Australia</option>
                                                    </select>    
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label">Address</div>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        value={this.state.address}
                                                        onChange={this.handleInputChange}
                                                    />   
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label">Town/City</div>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={this.state.city}
                                                        onChange={this.handleInputChange}
                                                    />   
                                                </div>
                                                <div className="form-group col-md-12 col-sm-6 col-xs-12">
                                                    <div className="field-label">State</div>
                                                    <input
                                                        type="text"
                                                        name="state"
                                                        value={this.state.state}
                                                        onChange={this.handleInputChange}
                                                    />    
                                                </div>
                                                <div className="form-group col-md-12 col-sm-6 col-xs-12">
                                                    <div className="field-label">Postal Code</div>
                                                    <input
                                                        type="text"
                                                        name="pincode"
                                                        value={this.state.spincode}
                                                        onChange={this.handleInputChange}
                                                    />
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

