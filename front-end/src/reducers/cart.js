import {
  SET_USERS_CART,
  REMOVE_USERS_CART,
  ADD_TO_USERS_CART,
  REMOVE_FROM_USERS_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DECREMENT_QTY
} from "../constants/ActionTypes";


const initialState = {
  cart: []
}


export default function cartReducer(state = initialState, action) {
  switch (action.type) {

    case 'CLEAR_CART': 
      return {
        ...state,
        cart: []
      }

    // sets the users cart right after they login or register
    case SET_USERS_CART:
      const formattedProducts = action.cart.cartItems.map(cartItem => {
        return {
          ...cartItem.product,
          qty: cartItem.quantity,
          sum: cartItem.product.price * cartItem.quantity
        }
      })

      return {
        ...state,
        cart: [...formattedProducts]
      }

    // removes the users cart after they log out
    case REMOVE_USERS_CART:
      return {
        ...state,
        cart: []
      }

    case ADD_TO_USERS_CART:
      const newProduct = action.product
      const quantity = action.quantity

      let indexOfProduct = state.cart.findIndex(product => product.upc === newProduct.upc)

      // if the product already exists
      if (indexOfProduct !== -1) {
        state.cart[indexOfProduct].qty = quantity
        state.cart[indexOfProduct].sum = newProduct.price * state.cart[indexOfProduct].qty

      // if the product doesnt already exist
      } else {
        const formattedProduct = {
          ...newProduct,
          qty: quantity,
          sum: newProduct.price * quantity
        }

        state.cart.push(formattedProduct)
      }

      return {
        ...state,
        cart: state.cart
      }

    case REMOVE_FROM_USERS_CART:
      const productIdToRemove = action.productId

      const updatedProductsInCart = state.cart.filter(product => product.upc !== productIdToRemove)

      return {
        ...state,
        cart: updatedProductsInCart
      }

    // reducer for when a non logged in user adds an item to the cart
    case ADD_TO_CART:
      const productToAdd = action.product
      const quantityToAdd = action.qty

      indexOfProduct = state.cart.findIndex(product => product.upc === productToAdd.upc) 
      console.log('doesProductExist:', indexOfProduct)

      // if the product already exists
      if (indexOfProduct !== -1) {
        const productToUpdate = state.cart[indexOfProduct]

        // updates the products quantity and sum
        productToUpdate.qty = quantityToAdd
        productToUpdate.sum = productToUpdate.price * productToUpdate.qty

      // if the product doesnt already exist
      } else {

        // formats the product in the correct way
        const formattedProductToAdd = {
          ...productToAdd,
          qty: quantityToAdd,
          sum: productToAdd.price * quantityToAdd
        }

        state.cart.push(formattedProductToAdd)
      } 

      return {
        ...state, 
        cart: state.cart
      }

    // case ADD_TO_CART:
    //   const productId = action.product.id;
    //   if (state.cart.findIndex(product => product.id === productId) !== -1) {
    //     const cart = state.cart.reduce((cartAcc, product) => {
    //       if (product.id === productId) {
    //         cartAcc.push({
    //           ...product,
    //           qty: product.qty + 1,
    //           sum:
    //             ((product.price * product.discount) / 100) * (product.qty + 1)
    //         }); // Increment qty
    //       } else {
    //         cartAcc.push(product);
    //       }

    //       return cartAcc;
    //     }, []);

    //     return { ...state, cart };
    //   }

    //   return {
    //     ...state,
    //     cart: [
    //       ...state.cart,
    //       {
    //         ...action.product,
    //         qty: action.qty,
    //         sum:
    //           ((action.product.price * action.product.discount) / 100) *
    //           action.qty
    //       }
    //     ]
    //   };

    case DECREMENT_QTY:
      if (
        state.cart.findIndex(product => product.id === action.productId) !== -1
      ) {
        const cart = state.cart.reduce((cartAcc, product) => {
          if (product.id === action.productId && product.qty > 1) {
            //console.log('price: '+product.price+'Qty: '+product.qty)
            cartAcc.push({
              ...product,
              qty: product.qty - 1,
              sum:
                ((product.price * product.discount) / 100) * (product.qty - 1)
            }); // Decrement qty
          } else {
            cartAcc.push(product);
          }

          return cartAcc;
        }, []);

        return { ...state, cart };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.product,
            qty: action.qty,
            sum: action.product.price * action.qty
          }
        ]
      };

    case REMOVE_FROM_CART:
      return {
        cart: state.cart.filter(product => product.upc !== action.productId)
      }

    default:
  }
  return state;
}
