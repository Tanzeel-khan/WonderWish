import {
    SIGNUP_SUCCESS, SIGNUP_FAILURE, SIGNUP,

} from '../constants'


export default class AuthAction {


    static Signup() {
        return {
            type: SIGNUP,
        }
    }
    static SignupSuccess(data) {
        return {
            type: SIGNUP_SUCCESS,
            payload: data
        }
    }
    static SignupFailure(error) {
        return {
            type: SIGNUP_FAILURE,
            error: error
        }
    }

}