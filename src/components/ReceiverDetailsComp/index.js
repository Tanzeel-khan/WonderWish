import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, TextInput, Platform } from "react-native";
import { Colors, Fonts, Images } from "../../config";
import { Icon } from 'native-base'
import { CartTotal } from "..";
const { height, width } = Dimensions.get('window');


const Input = ({ title, value, onChangeText, placeHolder, keyboardType, multiline, payment, onPressPayment }) => {
    return (
        <View style={{ paddingVertical: 10 }}>
            <View style={{ paddingBottom: 10, paddingLeft: 10 }}>
                <Text style={{ fontFamily: Fonts.Montserrat_SemiBold, fontSize: 15, color: Colors.White, textShadowColor: Colors.White, textShadowRadius: 2, }}>{title}</Text>
            </View>
            {payment ?
                <TouchableOpacity onPress={onPressPayment} activeOpacity={0.8} style={{ width: "100%", paddingVertical: 15, paddingHorizontal: 20, borderRadius: 25, borderTopRightRadius: 0, backgroundColor: Colors.WhiteOpacity(0.2) }}>
                    <Text style={{ flex: 1, color: Colors.White, fontFamily: Fonts.Montserrat_Medium, fontSize: 12, letterSpacing: 1 }}>{value || placeHolder}</Text>
                </TouchableOpacity> :
                <View style={{ width: "100%", paddingVertical: Platform.OS == "ios" ? 15 : 0, paddingHorizontal: 20, borderRadius: 25, borderTopRightRadius: 0, backgroundColor: Colors.WhiteOpacity(0.2) }}>
                    <TextInput selectionColor={Colors.White} multiline={multiline} keyboardType={keyboardType} value={value} placeholder={placeHolder} onChangeText={onChangeText} placeholderTextColor={Colors.WhiteOpacity(0.8)} style={{ flex: 1, color: Colors.White, fontFamily: Fonts.Montserrat_Medium, fontSize: 12, letterSpacing: 1 }} />
                </View>
            }
        </View>
    )
}

const ReceiverDetailsComp = ({ onPressBack, name, onChangeName, number, onChangeNumber, address, onChangeAddress, payment, onPressPayment, cart, totalAmount, onPressPlace }) => {
    return (
        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
            <View style={{ width: "85%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                <TouchableOpacity activeOpacity={0.7} onPress={onPressBack} style={{ paddingHorizontal: 10 }}>
                    <Icon name="ios-arrow-back" style={{ color: Colors.White, fontSize: 20 }} />
                </TouchableOpacity>
                <View style={{ paddingVertical: 15, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ textAlign: "center", color: Colors.White, fontSize: 12, fontFamily: Fonts.Montserrat_SemiBold, letterSpacing: 1, textShadowColor: Colors.White, textShadowRadius: 2, paddingLeft: 10 }}>RECEIVER DETAILS</Text>
                </View>
                <View style={{ height: 25, width: 25 }} />
            </View>
            <View style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: "center", alignItems: "center", }} style={{ width: "100%" }} keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
                    <View style={{ minHeight: Platform.OS === "ios" ? height * .55 : height * .5, width: "85%", marginVertical: 10 }}>
                        <Input
                            value={name}
                            onChangeText={onChangeName}
                            placeHolder={"Enter Name"}
                            title={"Name"}
                        />
                        <Input
                            value={number}
                            onChangeText={onChangeNumber}
                            placeHolder={"Enter Number"}
                            keyboardType="phone-pad"
                            title={"Number"}
                        />
                        <Input
                            value={address}
                            onChangeText={onChangeAddress}
                            placeHolder={"Enter Address"}
                            title={"Address"}
                            multiline
                        />
                        <Input
                            value={payment}
                            placeHolder={"Select Payment Method"}
                            title={"Payment Method"}
                            onPressPayment={onPressPayment}
                            payment
                        />
                    </View>
                    {cart.length ?
                        <CartTotal
                            BtnTitle={"Place Order"}
                            itemsLength={cart.length}
                            totalAmount={totalAmount}
                            onPressBtn={onPressPlace}
                        />
                        : null
                    }
                </ScrollView>
            </View>
        </View>
    );
}

export default ReceiverDetailsComp;