import React, { PureComponent } from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Colors, Fonts, Images } from "../../config";
import { RoundedView } from "../../components/index";
import stripe from 'tipsi-stripe'
// import Button from './Button'
import axios from "axios"
import { connect } from "react-redux"
import AsyncStorage from '@react-native-community/async-storage'
import NavigationService from '../../config/NavigationService';
import DatabaseMiddleware from '../../store/middlewares/DatabaseMiddleware';
import Firebase from "react-native-firebase"
import { Icon } from 'native-base'
import { NavigationActions } from 'react-navigation';



const BASE_URL = "https://dalaservice.herokuapp.com/"
// const BASE_URL = "http://localhost:3050/"



class PaymentSummary extends PureComponent {

    state = {
        loading: false,
        token: null,
        address: null,
        userData: null
    }

    componentDidMount() {




    }







    render() {
        // console.log(" anasssss", this.props)
        const { name, email, price, address, number } = this.props.navigation.state.params
        console.log(this.props.navigation.state.params.userData, "aaassaaaaa")
        // const { loading, token, userData } = this.state


        return (
            <View style={styles.container}>
                <View style={{ flex: 0.1, justifyContent: "center", }}>
                    <Text style={{ fontFamily: Fonts.Montserrat_Medium, fontWeight: "bold", fontSize: 20 }}>Payment Summary</Text>
                </View>
                <View style={{ flex: 0.7, width: "100%", padding: 10, justifyContent: "center" }}>

                    <Text style={{ letterSpacing: 0.3, textShadowColor: Colors.BlackOpacity(0.8), textShadowRadius: 0, color: Colors.Black, fontFamily: Fonts.Montserrat_Medium, fontWeight: "bold", fontSize: 20, paddingHorizontal: 30, paddingBottom: 10, marginBottom: 20 }}>Pay in full with</Text>
                    <View style={{ borderTopColor: Colors.Black, margin: 30, padding: 10, paddingVertical: 20, borderTopWidth: 3, }}>
                        <Text style={{ letterSpacing: 0.3, textShadowColor: Colors.BlackOpacity(0.8), textShadowRadius: 0, color: Colors.Black, fontFamily: Fonts.Montserrat_Medium, fontWeight: "bold", fontSize: 20, paddingHorizontal: 10 }}>Bill to</Text>
                        <Text style={{ letterSpacing: 0.3, textShadowColor: Colors.BlackOpacity(0.8), textShadowRadius: 0, color: Colors.Black, fontFamily: Fonts.Montserrat_Medium, fontWeight: "bold", fontSize: 16, padding: 10 }}>{name}</Text>
                        <Text style={{ letterSpacing: 0.3, textShadowColor: Colors.BlackOpacity(0.8), textShadowRadius: 0, color: Colors.Black, fontFamily: Fonts.Montserrat_Medium, fontWeight: "bold", fontSize: 16, padding: 10 }}>{email}</Text>
                        <Text style={{ letterSpacing: 0.3, textShadowColor: Colors.BlackOpacity(0.8), textShadowRadius: 0, color: Colors.Black, fontFamily: Fonts.Montserrat_Medium, fontWeight: "bold", fontSize: 16, padding: 10 }}>{number}</Text>
                        {/* <Text style={{ fontWeight: "bold", fontSize: 18, padding: 10 }}>{address.address}</Text> */}

                    </View>
                    <View style={{ paddingTop: 20, alignSelf: "center", width: "80%", marginLeft: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-around", borderTopWidth: 3, borderTopColor: Colors.Black, }}>

                        <Text style={{ letterSpacing: 0.3, textShadowColor: Colors.BlackOpacity(0.8), textShadowRadius: 0, color: Colors.Black, fontFamily: Fonts.Montserrat_Medium, fontWeight: "bold", alignSelf: "center", fontSize: 22, paddingHorizontal: 10 }}>Your Total</Text>
                        <Text style={{ letterSpacing: 0.3, textShadowColor: Colors.BlackOpacity(0.8), textShadowRadius: 0, color: Colors.Black, fontFamily: Fonts.Montserrat_Medium, fontWeight: "bold", alignSelf: "center", fontSize: 22, paddingHorizontal: 10 }}>{price}/-</Text>
                    </View>

                </View>
                <View style={{ flex: 0.2, justifyContent: "center" }}>
                    <TouchableOpacity

                        onPress={() => {
                            NavigationService.reset(0, [NavigationActions.navigate({ routeName: 'Products' })])
                        }}
                        style={{ borderRadius: 5, backgroundColor: "#000", }}>

                        <Text style={{ letterSpacing: 0.3, textShadowColor: Colors.BlackOpacity(0.8), textShadowRadius: 0, color: Colors.White, fontFamily: Fonts.Montserrat_Medium, fontWeight: "bold", fontSize: 18, padding: 10, paddingHorizontal: 20 }}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f1f1",
        alignItems: 'center',
    },

})
const mapStateToProps = (state) => {
    return {
        Cart: state.DatabaseReducer.cart,
        TotalAmount: state.DatabaseReducer.totalAmount

    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        ClearToCart: () => dispatch(DatabaseMiddleware.ClearToCart()),
        // SaveTotalAmount: (payload) => dispatch(DatabaseMiddleware.SaveTotalAmount(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentSummary)
// export default PaymentSummary

