import { CartActionTypes } from "../Constants/CartActionTypes";
import axios from "axios";
const cartInitialState = {
    cartLoaded: false,
    clientID: "",
    productsWithID: JSON.parse(localStorage.getItem("cart"))?JSON.parse(localStorage.getItem("cart")).productsWithID:[],
    products: [],
}
export const cartReducer = (state = cartInitialState, { type, payload }) => {
    switch (type) {
        case CartActionTypes.CART_ADDPRODUCT: {
            //console.log([...state.products, payload])
            localStorage.setItem("cart", JSON.stringify({
                ...state,
                productsWithID: [...state.productsWithID, payload]
            }))
            return {
                ...state,
                productsWithID: [...state.productsWithID, payload]
            }
        }
        case CartActionTypes.CART_REMOVEPRODUCT: {
            //console.log([...state.products, payload])
            const newProducts = state.products.filter(x => x.product.key !== payload.productID)
            const newProductsWithID = state.productsWithID.filter(x => x.productID !== payload.productID)
            localStorage.setItem("cart", JSON.stringify({
                ...state,
                productsWithID: newProductsWithID
            }))
            //console.log(newProducts);
            return (
                {
                    cartLoaded: true,
                    productsWithID: newProductsWithID,
                    products: newProducts
                }
            )
        }
        case CartActionTypes.CART_LOADCART_FINISH: {
            //console.log(payload);
            return {
                ...payload,
                cartLoaded: true,
            }
        }
        case CartActionTypes.CART_CLEAR: {
            return {
                ...state,
                products: [],
                productsWithID: []
            }
        }
        default:
            return state;
    }
}