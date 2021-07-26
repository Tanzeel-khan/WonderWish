import React from "react";
import { View, Text, Platform, FlatList, ActivityIndicator, TouchableOpacity, Image, Dimensions } from "react-native";
import { Colors, Fonts, Images } from "../../config";
import { Icon } from 'native-base'
import { CartTotal, RoundedView } from "..";
const { height, width } = Dimensions.get('window');

const CartList = ({ msg, onSelectAddress, data, totalAmount, onPressBack, onPressSubtract, onPressAdd, onPressDelete, onPressProceed }) => {
    return (
        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
            <View style={{ width: "85%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                <TouchableOpacity activeOpacity={0.7} onPress={onPressBack} >
                    <Icon name="ios-arrow-back" style={{ color: Colors.White, fontSize: 20, paddingLeft: 10, paddingRight: 20 }} />
                </TouchableOpacity>
                <View style={{ paddingVertical: 15, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                    <Icon name="cart" style={{ color: Colors.White, fontSize: 18, textShadowColor: Colors.White, textShadowRadius: 1 }} />
                    <Text style={{ textAlign: "center", color: Colors.White, fontSize: 12, fontFamily: Fonts.Montserrat_SemiBold, letterSpacing: 1, textShadowColor: Colors.White, textShadowRadius: 2, paddingLeft: 10 }}>CART</Text>
                </View>
                <View style={{ height: 25, width: 25 }} />
            </View>
            {data.length ?
                <View style={{ flex: 1, width: "100%" }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        style={{ width: "100%" }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ width: "95%", justifyContent: "center", alignItems: "center", backgroundColor: Colors.WhiteOpacity(0.8), borderRadius: 25, marginHorizontal: "2%", paddingTop: 5, marginBottom: 20 }}>
                                    <View style={{ width: "90%", minHeight: 120, flexDirection: "row", justifyContent: "center" }}>
                                        <View style={{ height: 95, width: 95, alignSelf: "center" }}>
                                            <Image source={item.images[0]} style={{ height: 95, width: "100%", resizeMode: "cover", borderRadius: 20 }} />
                                        </View>
                                        <View style={{ flex: 1, justifyContent: "center", paddingLeft: 20 }}>
                                            <Text style={{ fontFamily: Fonts.Montserrat_SemiBold, color: Colors.Black, fontSize: 20 }} numberOfLines={2}>{item.name}</Text>
                                            <Text style={{ fontFamily: Fonts.Montserrat_SemiBold, color: Colors.Black, fontSize: 18, letterSpacing: 1, textShadowColor: Colors.White, textShadowRadius: 2 }} numberOfLines={1}>Rs. {item.total}</Text>
                                            <View style={{ marginTop: 8, alignItems: "flex-start", }}>
                                                <View style={{ flexDirection: "row" }}>
                                                    <TouchableOpacity onPress={() => onPressSubtract(item)} style={{ justifyContent: "center", borderRadius: 20 }}>
                                                        <Icon name="remove" style={{ paddingHorizontal: 15, paddingVertical: 10, color: Colors.White, fontSize: 13, backgroundColor: Colors.Black, borderRadius: 8, alignItems: "center" }} />
                                                    </TouchableOpacity>

                                                    <Text style={{ marginHorizontal: 10, paddingHorizontal: 30, paddingVertical: 5, backgroundColor: Colors.Black, fontFamily: Fonts.Montserrat_Medium, color: Colors.White, fontSize: 16, textShadowColor: Colors.Black, textShadowRadius: 1, borderRadius: 8 }}>{item.quantity}</Text>

                                                    <TouchableOpacity onPress={() => onPressAdd(item)} style={{ justifyContent: "center", alignItems: "center" }}>
                                                        <Icon name="add" style={{ paddingHorizontal: 15, paddingVertical: 10, color: Colors.White, fontSize: 13, backgroundColor: Colors.Black, borderRadius: 8, alignItems: "center" }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => onPressDelete(item)} style={{ height: 30, width: 40, justifyContent: "flex-start", alignItems: "flex-end", marginRight: 0, marginTop:12 }}>
                                            <Icon name="circle-with-cross" type="Entypo" style={{ color: Colors.Black, fontSize: 30, textShadowColor: Colors.White, textShadowRadius: 1 }} />
                                        </TouchableOpacity>
                                    </View>


                                    <View style={{ width: 300 }}>
                                        <TouchableOpacity onPress={() => { onSelectAddress(item) }} activeOpacity={0.7} style={{ width: "100%", alignSelf: "flex-end", backgroundColor: Colors.Black, marginBottom: 19, padding: 17, borderRadius: 5 }}>
                                            <Text style={{ fontFamily: "Roboto", color: Colors.White, fontWeight: "bold", textAlign: "center", fontSize: 10, letterSpacing: 1, textShadowColor: Colors.Black, textShadowRadius: 1 }}>{item.address != undefined && item.address != null && Object.values(item.address).length ? "Your address has been set for this gift" : "Set Your Shipping address for this gift pack"}</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            )
                        }}
                    />
                </View>
                :
                <View style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontFamily: Fonts.Montserrat_Light, color: Colors.White, fontSize: 15, }} numberOfLines={2}>Cart Empty</Text>
                </View>}

            {data.length ?

                <CartTotal
                    msg={msg}
                    BtnTitle={"Proceed to checkout"}
                    itemsLength={data.length}
                    totalAmount={totalAmount}
                    onPressBtn={onPressProceed}
                />
                : null}
        </View>
    );
}

export default CartList;