import { CartActionTypes } from "../Constants/CartActionTypes";
import axios from "axios";
const cartInitialState = {
    cartLoaded: false,
    clientID: "",
    products: [],
}
export const cartReducer = (state = cartInitialState, { type, payload }) => {
    switch (type) {
        case CartActionTypes.CART_ADDPRODUCT: {
            //console.log([...state.products, payload])
            axios.post(`http://localhost:5000/cart/update/${state.clientID}`, {
                products: [...state.products, payload]
            })
            return {
                ...state,
                products: [...state.products, payload]
            }
        }
        case CartActionTypes.CART_REMOVEPRODUCT: {
            //console.log([...state.products, payload])
            const temp = state.products.filter(x => x.product.key !== payload.productID)
            //console.log("temp", temp)
            axios.post(`http://localhost:5000/cart/update/${state.clientID}`, {
                products: temp
            })
            return {
                ...state,
                products: temp
            }
        }
        case CartActionTypes.CART_LOADPRODUCTS: {
            return {
                ...payload
            }
        }
        case CartActionTypes.CART_CLEAR: {
            axios.post(`http://localhost:5000/cart/update/${state.clientID}`, {
                products: []
            })
            return {
                ...state,
                products: [],
            }
        }
        default:
            return state;
    }
}