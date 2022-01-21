import { CartActionTypes } from "../Constants/CartActionTypes";
import axios from "axios";
export const addProduct = (productType, product) => {
    return ({
        type: CartActionTypes.CART_ADDPRODUCT,
        payload: {
            productType: productType,
            addDate: new Date(),
            product: product,
        }
    })
}
export const removeProduct = (productType, product) => {
    //console.log("sdfsdfsd")
    return ({
        type: CartActionTypes.CART_REMOVEPRODUCT,
        payload: {
            productType: productType,
            productID: product.key,
        }
    })
}
export const clearCart = (productType, product) => {
    //console.log("sdfsdfsd")
    return ({
        type: CartActionTypes.CART_CLEAR,
    })
}
export const loadCart = (clientID) => {
    return (dispatch) => {
        axios
            .get(`http://localhost:5000/cart/${clientID}`)
            .then(({ data }) => {
                //console.log("data", data)
                    dispatch({
                        type: CartActionTypes.CART_LOADPRODUCTS,
                        payload: {
                            cartLoaded: true,
                            clientID: clientID,
                            products: data
                        }
                    })
            })
            .catch(function (error) {
            });
    }
}
