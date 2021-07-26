import {
    SIGNUP_SUCCESS, SIGNUP_FAILURE,
    SIGNUP,

} from '../constants';

const initialState = {
    user: {},
    error: {},

}

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {

        case SIGNUP:
            state = {
                user: {},
                error: {},
            }
            break;

        case SIGNUP_SUCCESS:
            state = {
                user: action.payload,
                error: {},
            }
            break;

        case SIGNUP_FAILURE:
            state = {
                user: {},
                error: action.error,
            }
            break;

        default:
            break;
    }
    return state;
}