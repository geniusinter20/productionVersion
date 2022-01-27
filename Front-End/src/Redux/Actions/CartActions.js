import { CartActionTypes } from "../Constants/CartActionTypes";
import axios from "axios";
export const addProduct = (productType, productID) => {
    return ({
        type: CartActionTypes.CART_ADDPRODUCT,
        payload: {
            productType: productType,
            addDate: new Date(),
            productID: productID,
        }
    })
}
export const removeProduct = (productType, productID) => {
    //console.log("sdfsdfsd")
    return ({
        type: CartActionTypes.CART_REMOVEPRODUCT,
        payload: {
            productType: productType,
            productID: productID,
        }
    })
}
export const clearCart = (productType, product) => {
    //console.log("sdfsdfsd")
    return ({
        type: CartActionTypes.CART_CLEAR,
    })
}
export const loadCart = () => {
    let products = []
    var productsWithID = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")).productsWithID : []
    if (!productsWithID.length) {
        return ({
            type: CartActionTypes.CART_LOADCART_FINISH,
            payload: {
                products: [],
                productsWithID: [],
            }
        })
    }
    return (dispatch) => {
        productsWithID.forEach((p, i) => {
            switch (p.productType) {
                case "practiceTest": {
                    //console.log(p);
                    axios
                        .get(`http://exporagenius.com:5000/practicetests/${p.productID}`)
                        .then(({ data }) => {
                            products.push({
                                productType: p.productType,
                                product: data[0],
                            })
                            //
                            if (products.length === productsWithID.length) {
                                //console.log(products);
                                dispatch({
                                    type: CartActionTypes.CART_LOADCART_FINISH,
                                    payload: {
                                        products: products,
                                        productsWithID: productsWithID,
                                    }
                                })
                            }
                        })

                    break;
                }
                case "test": {
                    break;
                }
                case "course": {
                    break;
                }
                default:
                    break;
            }
        });
    }
}

