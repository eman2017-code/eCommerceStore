import React, { Component } from "react";
import { connect } from "react-redux";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { SlideToggle } from "react-slide-toggle";

import { getBrands, getColors, getMinMaxPrice } from "../../../services";
import { filterBrand, filterColor, filterPrice } from "../../../actions";

class Filter extends Component {
  constructor(props) {
    console.log("props in Filter Component");
    console.log(props);
    super(props);

    this.state = {
      openFilter: false
    };
  }

  closeFilter = () => {
    document.querySelector(".collection-filter").style = "left: -365px";
  };

  clickBrandHendle(event, manufacturer) {
    var index = manufacturer.indexOf(event.target.value);
    if (event.target.checked) manufacturer.push(event.target.value);
    // push in array checked value
    else manufacturer.splice(manufacturer, 1); // removed in array unchecked value

    this.props.filterBrand(manufacturer);
  }

  colorHandle(event, color) {
    var elems = document.querySelectorAll(".color-selector ul li");
    [].forEach.call(elems, function(el) {
      el.classList.remove("active");
    });
    event.target.classList.add("active");
    this.props.filterColor(color);
  }

  render() {
    const filteredBrands = this.props.filters.manufacturer;
    //console.log(this.props.brands);
    return (
      <div className="collection-filter-block">
        <div className="collection-mobile-back">
          <span className="filter-back" onClick={e => this.closeFilter(e)}>
            <i className="fa fa-angle-left" aria-hidden="true"></i> back
          </span>
        </div>
        <SlideToggle>
          {({ onToggle, setCollapsibleElement }) => (
            <div className="collection-collapse-block open">
              <h3 className="collapse-block-title" onClick={onToggle}>
                price
              </h3>
              <div
                className="collection-collapse-block-content block-price-content"
                ref={setCollapsibleElement}
              >
                <div className="collection-brand-filter">
                  <div className="custom-control custom-checkbox collection-filter-checkbox">
                    <InputRange
                      maxValue={this.props.prices.max}
                      minValue={this.props.prices.min}
                      value={this.props.filters.value}
                      onChange={value => this.props.filterPrice({ value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </SlideToggle>
        <SlideToggle>
          {({ onToggle, setCollapsibleElement }) => (
            <div className="collection-collapse-block">
              <h3 className="collapse-block-title" onClick={onToggle}>
                Categories
              </h3>
              <div
                className="collection-collapse-block-content"
                ref={setCollapsibleElement}
              >
                <div className="collection-brand-filter">
                  {/* {this.props.brands.map((brand, index) => {
                    return (
                      <div
                        className="custom-control custom-checkbox collection-filter-checkbox"
                        key={index}
                      >
                        <input
                          type="checkbox"
                          onClick={e =>
                            this.clickBrandHendle(e, filteredBrands)
                          }
                          value={brand}
                          defaultChecked={
                            filteredBrands.includes(brand) ? true : false
                          }
                          className="custom-control-input"
                          id={brand}
                        />
                        <label className="custom-control-label" htmlFor={brand}>
                          {brand}
                        </label>
                      </div>
                    );
                  })} */}
                </div>
              </div>
            </div>
          )}
        </SlideToggle>

        {/*color filter start here*/}
        {/* <SlideToggle>
          {({ onToggle, setCollapsibleElement }) => (
            <div className="collection-collapse-block">
              <h3 className="collapse-block-title" onClick={onToggle}>
                colors
              </h3>
              <div
                className="collection-collapse-block-content"
                ref={setCollapsibleElement}
              >
                <div className="color-selector">
                  <ul>
                    {this.props.colors.map((color, index) => {
                      return (
                        <li
                          className={color}
                          title={color}
                          onClick={e => this.colorHandle(e, color)}
                          key={index}
                        ></li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </SlideToggle> */}
        {/*price filter start here */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  manufacturer: getBrands(state.data.products),
  colors: getColors(state.data.products),
  prices: getMinMaxPrice(state.data.products),
  filters: state.filters
});

export default connect(mapStateToProps, {
  filterBrand,
  filterColor,
  filterPrice
})(Filter);
