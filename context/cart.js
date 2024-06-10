import { createContext, useReducer } from "react";

import Cookies from "js-cookie";

export const CartContext = createContext();

const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [], shippingData: {} },
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      {
        const newItem = action.payload;
        const existingItem = state.cart.cartItems.find(
          (item) => item.slug === newItem.slug
        );

        const cartItems = existingItem
          ? state.cart.cartItems.map((item) =>
              item.title === existingItem.title ? newItem : item
            )
          : [...state.cart.cartItems, newItem];

        Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));

        return { ...state, cart: { ...state.cart, cartItems } };
      }
      break;
    case "REMOVE_ITEM":
      {
        const cartItems = state.cart.cartItems.filter(
          (item) => item.slug !== action.payload.slug
        );

        Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));

        return { ...state, cart: { ...state.cart, cartItems } };
      }
      break;
    case "SAVE_SHIPPING_DATA":
      {
        Cookies.set(
          "cart",
          JSON.stringify({ ...state.cart, shippingData: action.payload })
        );

        return {
          ...state,
          cart: {
            ...state.cart,
            shippingData: { ...state.cart.shippingData, ...action.payload },
          },
        };
      }
      break;
    case "SAVE_PAYMENT_METHOD":
      {
        Cookies.set(
          "cart",
          JSON.stringify({ ...state.cart, paymentMethod: action.payload })
        );

        return {
          ...state,
          cart: { ...state.cart, paymentMethod: action.payload },
        };
      }
      break;
    case "CLEAR_HISTORY":
      {
        Cookies.remove("cart");

        return { ...state, cart: { cartItems: [], shippingData: {} } };
      }
      break;
    default:
      return state;
  }
}

export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
