import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Images } from "../../config";
import { RoundedView } from "../index";


const CartTotal = ({ BtnTitle, itemsLength, totalAmount, onPressBtn, msg }) => {
    return (
        <RoundedView
            backgroundColor={Colors.White}
            width={"95%"}
            paddingHorizontal={15}
        >
            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                <Text style={{ textAlign: "center", color: Colors.Red, fontSize: 10, fontFamily: Fonts.Montserrat_SemiBold, letterSpacing: 2 }}>{msg}</Text>
            </View>
            <View style={{ width: "100%", paddingTop: 10 }}>

                <View style={{ width: "100%", flexDirection: "row", paddingHorizontal: 15, paddingBottom: 10, justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Colors.Black, fontSize: 12, fontFamily: Fonts.Montserrat_Medium, letterSpacing: 0.3, textShadowColor: Colors.BlackOpacity(0.8), textShadowRadius: 0 }}>{itemsLength} {itemsLength > 1 ? "items" : "item"}</Text>
                    <Text style={{ color: Colors.Black, fontSize: 12, fontFamily: Fonts.Montserrat_Medium, letterSpacing: 0.5, textShadowColor: Colors.BlackOpacity(0.8), textShadowRadius: 0 }}>Rs. {totalAmount}</Text>
                </View>
                <View style={{ width: "100%", flexDirection: "row", paddingHorizontal: 15, paddingBottom: 10, justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Colors.Black, fontSize: 12, fontFamily: Fonts.Montserrat_Medium, letterSpacing: 0.3, textShadowColor: Colors.BlackOpacity(0.8), textShadowRadius: 0 }}>Discount</Text>
                    <Text style={{ color: Colors.Black, fontSize: 12, fontFamily: Fonts.Montserrat_Medium, letterSpacing: 0.3, textShadowColor: Colors.BlackOpacity(0.8), textShadowRadius: 0 }}>0</Text>
                </View>
                <View style={{ width: "100%", flexDirection: "row", paddingHorizontal: 15, paddingBottom: 10, justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Colors.Black, fontSize: 12, fontFamily: Fonts.Montserrat_Medium, letterSpacing: 0.3, textShadowColor: Colors.BlackOpacity(0.8), textShadowRadius: 0 }}>Shipping</Text>
                    <Text style={{ color: Colors.Black, fontSize: 12, fontFamily: Fonts.Montserrat_Medium, letterSpacing: 0.3, textShadowColor: Colors.BlackOpacity(0.8), textShadowRadius: 0 }}>Free</Text>
                </View>
            </View>
            <View style={{ width: "100%", paddingVertical: 10, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRadius: 30, borderTopWidth: 1, borderTopColor: Colors.BlackOpacity(0.1) }}>
                <Text style={{ color: Colors.Black, fontSize: 15, fontFamily: Fonts.Montserrat_SemiBold, letterSpacing: 0.3, textShadowColor: Colors.Black, textShadowRadius: 0 }}>Total </Text>
                <Text style={{ color: Colors.Black, fontSize: 15, fontFamily: Fonts.Montserrat_SemiBold, letterSpacing: 0.5, textShadowColor: Colors.Black, textShadowRadius: 0 }}>Rs. {totalAmount}</Text>
            </View>
            <RoundedView
                backgroundColor={Colors.Black}
                width={"100%"}
                radius={5}
                paddingHorizontal={1}
            >
                <TouchableOpacity onPress={onPressBtn} activeOpacity={0.7} style={{ width: "100%" }}>
                    <Text style={{ textAlign: "center", color: Colors.White, fontSize: 15, fontFamily: Fonts.Montserrat_Medium, letterSpacing: 0.5, textShadowColor: Colors.White, textShadowRadius: 1 }}>{BtnTitle}</Text>
                </TouchableOpacity>
            </RoundedView>
        </RoundedView>

    );
}

export default CartTotal;