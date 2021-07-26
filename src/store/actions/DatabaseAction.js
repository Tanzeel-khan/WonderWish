import { GET_USER_DATA,ADD_TO_CART,ADD_TO_HEART, CURRENT_PRODUCT, GET_PRODUCTS, CLEAR_PRODUCTS, LOW_PRICE, HIGH_PRICE, TOTAL_AMOUNT, BG_IMAGE } from '../constants'


export default class DatabaseAction {

    static bgImage(data) {
        return {
            type: BG_IMAGE,
            payload: data
        }
    }
    static GetUserData(data) {
        return {
            type: GET_USER_DATA,
            payload: data
        }
    }
    static GetProducts(data) {
        return {
            type: GET_PRODUCTS,
            payload: data
        }
    }
    static CurrentProduct(data) {
        return {
            type: CURRENT_PRODUCT,
            payload: data
        }
    }


    static LowPrice(data) {
        return {
            type: LOW_PRICE,
            payload: data
        }
    }
    static HighPrice(data) {
        return {
            type: HIGH_PRICE,
            payload: data
        }
    }


    static AddToCart(data) {
        return {
            type: ADD_TO_CART,
            payload: data
        }
    }
    static AddToHeart(data) {
        return {
            type: ADD_TO_HEART,
            payload: data
        }
    }
    static ClearToCart() {
        return {
            type: "CLEAR_TO_CART",
            payload: []
        }
    }


    static SaveTotalAmount(data) {
        return {
            type: TOTAL_AMOUNT,
            payload: data
        }
    }


    static ClearProducts() {
        return {
            type: CLEAR_PRODUCTS,
        }
    }
}