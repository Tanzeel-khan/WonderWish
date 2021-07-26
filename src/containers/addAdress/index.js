import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Dimensions,
    Image,
    Modal,
    TouchableOpacity,
    Text
} from 'react-native';
import { Fonts, Images, Colors } from '../../config';
import { connect } from "react-redux"
import DatabaseMiddleware from '../../store/middlewares/DatabaseMiddleware';
import { AddAddressCom } from '../../components';
const { height, width } = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage'




class AddAddress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            number: "",
            address: "",
            cart: [],
            totalAmount: 0,
            payment: "",
            modal: false,
            error: null
        }
    }
    componentDidMount() {
        const { Cart, TotalAmount } = this.props
        this.setState({ cart: Cart })
        if (TotalAmount) {
            this.setState({ totalAmount: TotalAmount })
        }
    }
    saveAddres() {
        const { name, number, address, payment } = this.state
        if (name == "" || number == "" || address == "" || payment == "") {
            this.setState({ error: "Please Fill All Field" })
        }
        else {
            this.setState({ error: "Loading..." })
            const data = {
                name,
                number,
                address,
                payment
            }
            console.log("DATA", data)
            
        AsyncStorage.setItem("address", JSON.stringify(data))
        this.props.navigation.navigate("PaymentMethod")
        }
    }
    render() {
        const { name, number, address, cart, totalAmount, payment, modal, error } = this.state
        const { navigate, goBack } = this.props.navigation
        return (
            <View style={{ flex: 1, backgroundColor: Colors.Black }}>

                <StatusBar barStyle="light-content" backgroundColor={Colors.Black} />
                {/* Body */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <AddAddressCom
                        onPressBack={() => { goBack() }}
                        name={name}
                        number={number}
                        address={address}
                        onChangeName={(name) => { this.setState({ name }) }}
                        onChangeNumber={(number) => { this.setState({ number }) }}
                        onChangeAddress={(address) => { this.setState({ address }) }}
                        cart={cart}
                        totalAmount={totalAmount}
                        onPressPlace={() => { this.saveAddres() }}
                        payment={payment}
                        onPressPayment={() => { this.setState({ modal: true }) }}
                        error={error}
                    />
                </View>
                <Modal visible={modal} transparent animated animationType="slide" on>
                    <View style={{ height: "100%", width: "100%", backgroundColor: Colors.BlackOpacity(0.8), justifyContent: "flex-end", alignItems: "center" }}>
                        <View
                            style={{
                                width,
                                paddingTop: 20,
                                backgroundColor: Colors.White,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                justifyContent: "center"
                            }}
                        >
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => { this.setState({ modal: false, payment: "Credit Card" }) }}
                                style={{ width: "100%", paddingVertical: 15, borderBottomColor: Colors.BlackOpacity(0.2), borderBottomWidth: 1 }}
                            >
                                <Text style={{ fontFamily: Fonts.Montserrat_Medium, fontSize: 14, color: Colors.Black, paddingHorizontal: 20 }}>
                                    Credit Card
                                </Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => { this.setState({ modal: false, payment: "Jazz Cash" }) }}
                                style={{ width: "100%", paddingVertical: 15, borderBottomColor: Colors.BlackOpacity(0.2), borderBottomWidth: 1 }}
                            >
                                <Text style={{ fontFamily: Fonts.Montserrat_Medium, fontSize: 14, color: Colors.Black, paddingHorizontal: 20 }}>
                                    Jazz Cash
                                </Text>
                            </TouchableOpacity> */}

                        </View>
                    </View>
                </Modal>
            </View>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);