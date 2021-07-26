import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Dimensions,
    Image
} from 'react-native';
import { Fonts, Images, Colors } from '../../config';
import { connect } from "react-redux"
import AsyncStorage from '@react-native-community/async-storage'
import { Myorder } from '../../components';
import DatabaseMiddleware from '../../store/middlewares/DatabaseMiddleware';
import { NavigationActions } from 'react-navigation';
import NavigationService from '../../config/NavigationService';
import Firebase from "react-native-firebase"


const { height, width } = Dimensions.get('window');



class MyOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: [],
            totalAmount: 0,
            data:[]
        }
    }


    saveTotalAmount = () => {
        let amount = 0
        const amounts = this.props.Cart.map((val, ind) => {
            return val.total
        })
        amounts.map((val, ind) => { amount = amount + Number(val) })

        const totalAmount = amount.toFixed(2);
        this.setState({ cart: this.props.Cart, totalAmount })
        if (totalAmount) {
            this.props.SaveTotalAmount(totalAmount)
        }
    }

    add = (item) => {
        console.log("add", item)
        AsyncStorage.getItem("cart").then(cart => {
            let cartArray = JSON.parse(cart);
            cartArray.map((val, ind) => {
                if (val.id === item.id) {
                    val.quantity = val.quantity + 1
                    val.total = (val.amount * val.quantity).toFixed(2)
                }
            })
            AsyncStorage.setItem("cart", JSON.stringify(cartArray)).then(() => {
                this.props.AddtoCart(cartArray)
                this.saveTotalAmount()
            })
        })
    }

    subtract = (item) => {
        let setStorage = true;
        AsyncStorage.getItem("cart").then(cart => {
            let cartArray = JSON.parse(cart);
            cartArray.map((val, ind) => {
                if (val.id === item.id) {
                    if (val.quantity > 1) {
                        val.quantity = val.quantity - 1
                        val.total = (val.amount * val.quantity).toFixed(2)
                    }
                    else {
                        setStorage = false
                    }
                }
            })
            if (setStorage) {
                AsyncStorage.setItem("cart", JSON.stringify(cartArray)).then(() => {
                    this.props.AddtoCart(cartArray)
                    this.saveTotalAmount()
                })
            }
        })
    }

    onDelete = (item) => {
        AsyncStorage.getItem("cart").then(cart => {
            let cartArray = JSON.parse(cart);
            cartArray.map((val, ind) => {
                if (val.id === item.id) {
                    cartArray.splice(ind, 1)
                }
            })
            AsyncStorage.setItem("cart", JSON.stringify(cartArray)).then(() => {
                this.props.AddtoCart(cartArray)
                if (cartArray.length) {
                    this.saveTotalAmount()
                }
                else {
                    this.setState({ cart: this.props.Cart })
                }
            })
        })
    }





    onProceed = () => {
        // NavigationService.navigate("PaymentMethod")
        NavigationService.navigate("AddAdress")
    }

    componentDidMount() {
        const { TotalAmount, Cart } = this.props
        this.setState({ cart: Cart, totalAmount: TotalAmount })


        Firebase.database().ref("Orders").orderByChild("usernumber").equalTo("+13333334444").on("value", (snap) => {
            let value = snap.val()
            let data = []
            for (var a in value) {
                data.push(value[a]);
            }
            this.setState({ data })

        })




    }

    render() {
        const { cart, totalAmount,data } = this.state
        const { navigate, goBack } = this.props.navigation
        // AsyncStorage.removeItem("cart").then((cartArray) => {console.log("aaaaaaaaaaaaa",cartArray)})
        console.log("cart data", cart)
        return (
            <View style={{
                flex: 1, backgroundColor: Colors.Black
            }}>

                <StatusBar barStyle="light-content" backgroundColor={Colors.Black} />

                {/* Body */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Myorder
                        data={data}
                        totalAmount={totalAmount}
                        onPressBack={() => { goBack() }}
                        onPressAdd={this.add}
                        onPressSubtract={this.subtract}
                        onPressDelete={this.onDelete}
                        onPressProceed={this.onProceed}
                    />
                </View>
            </View >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Cart: state.DatabaseReducer.cart,
        TotalAmount: state.DatabaseReducer.totalAmount
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        AddtoCart: (payload) => dispatch(DatabaseMiddleware.AddToCart(payload)),
        SaveTotalAmount: (payload) => dispatch(DatabaseMiddleware.SaveTotalAmount(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);