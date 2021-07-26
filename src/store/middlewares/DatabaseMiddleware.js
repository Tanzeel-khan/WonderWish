import { DatabaseAction } from '../actions';
import Firebase from 'react-native-firebase';
import firebase from 'react-native-firebase';
import { View } from 'react-native';

export default class DatabaseMiddleware {

    static GetUserData(payload) {
        return (dispatch) => {
            firebase.database().ref().child("Users").child(payload).once("value", (snap) => {
                if (snap.val())
                    dispatch(DatabaseAction.GetUserData(snap.val()))

            })
        }
    }

    static GetProducts(payload) {
        return (dispatch) => {
            Firebase.database().ref().child("Products").child(payload).once("value", (snap) => {
                let value = snap.val()
                if (value) {
                    let data = Object.values(value)
                    dispatch(DatabaseAction.GetProducts(data))
                }
                else{
                    <View>
                        <Text>No Product</Text>
                    </View>
                }
            })
        }
    }
    static CurrentProduct(payload) {
        return (dispatch) => {
            dispatch(DatabaseAction.CurrentProduct(payload))
        }
    }


    static LowPrice(payload) {
        return (dispatch) => {
            dispatch(DatabaseAction.LowPrice(payload))
        }
    }
    static HighPrice(payload) {
        return (dispatch) => {
            dispatch(DatabaseAction.HighPrice(payload))
        }
    }


    static AddToCart(payload) {
        return (dispatch) => {
            dispatch(DatabaseAction.AddToCart(payload))
        }
    }
    static AddToHeart(payload) {
        return (dispatch) => {
            dispatch(DatabaseAction.AddToHeart(payload))
        }
    }
    static ClearToCart() {
        return (dispatch) => {
            dispatch(DatabaseAction.ClearToCart())
        }
    }


    static SaveTotalAmount(payload) {
        return (dispatch) => {
            dispatch(DatabaseAction.SaveTotalAmount(payload))
        }
    }


    static ClearProducts() {
        return (dispatch) => {
            dispatch(DatabaseAction.ClearProducts())
        }
    }

}