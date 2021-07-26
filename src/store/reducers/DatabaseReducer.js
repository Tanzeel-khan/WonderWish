import { ADD_TO_CART, CURRENT_PRODUCT, GET_PRODUCTS, CLEAR_PRODUCTS, LOW_PRICE, HIGH_PRICE, TOTAL_AMOUNT, BG_IMAGE, GET_USER_DATA } from '../constants';
import { Images } from '../../config';

const initialState = {
    products: [],
    cart: [],
    currentProduct: "",
    totalAmount: 0,
    background: '',
    userData: {}
}

export default function DatabaseReducer(state = initialState, action) {
    switch (action.type) {

        case BG_IMAGE:
            state = {
                ...state,
                background: action.payload
            }
            break;
        case GET_USER_DATA:
            state = {
                ...state,
                userData: action.payload
            }
            break;

        case GET_PRODUCTS:
            state = {
                ...state,
                products: action.payload
            }
            break;

        case CURRENT_PRODUCT:
            state = {
                ...state,
                currentProduct: action.payload
            }
            break;


        case LOW_PRICE:
            state = {
                ...state,
                products: action.payload,
            }
            break;

        case HIGH_PRICE:
            state = {
                ...state,
                products: action.payload,
            }
            break;


        case ADD_TO_CART:
            state = {
                ...state,
                cart: action.payload
            }
            break;
        case "CLEAR_TO_CART":
            state = {
                ...state,
                cart: action.payload
            }
            break;


        case TOTAL_AMOUNT:
            state = {
                ...state,
                totalAmount: action.payload
            }
            break;


        case CLEAR_PRODUCTS:
            state = {
                ...state,
                products: []
            }
            break;

        default:
            break;
    }
    return state;
}