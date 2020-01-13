import {
  FETCH_SINGLE_PRODUCT,
  CHANGE_CURRENCY,
  RECEIVE_PRODUCTS,
  RECEIVE_CATEGORY_PRODUCTS
} from "../constants/ActionTypes";

const initialState = {
  products: [],
  symbol: "$",
  product_details: [],

  // trending product categories
  computersAndTablets: [],
  cellPhones: [],
  headphones: [],
  appliances: []
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return { ...state, products: action.products };

    case RECEIVE_CATEGORY_PRODUCTS:
      const categoryNameArray = action.category.split(" ");

      // the action.category parameter contains the category name with spaces, and
      // the [categoryName] syntax is used to set the category with its products in state,
      // so this .map() converts the category name with spaces to the category name using
      // camel-case format.
      // *** AKA: nobody touch this code without talking to Mitch first ***
      const formattedCategoryNameArray = categoryNameArray.map((word, i) => {
        if (i > 0) {
          const wordArray = word.split("");
          const firstLetterCapitalized = wordArray[0].toUpperCase();

          delete wordArray[0];
          wordArray[0] = firstLetterCapitalized;

          const newWord = wordArray.join("");
          return newWord;
        }
        return word;
      });

      // joins the array of words
      const formattedCategoryName = formattedCategoryNameArray.join("");

      return {
        ...state,
        [formattedCategoryName]: action.products
      };

    case FETCH_SINGLE_PRODUCT:
      let foundProductArray = [];
      // query for the matching product
      let foundProduct = state.data.products.find(
        product => product.sku === action.productId
      );
      // if foudnProduct is valid
      if (foundProduct !== undefined) {
        // push into array
        foundProductArray.push(foundProduct);
        return {
          ...state,
          product_details: foundProductArray
        };
      }
      break;

    case CHANGE_CURRENCY:
      return { ...state, symbol: action.symbol };
    default:
      return state;
  }
};
export default productReducer;
