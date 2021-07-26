import React from "react";
import { View, Text, Platform, FlatList, ActivityIndicator, TouchableOpacity, Image, Dimensions } from "react-native";
import { Colors, Fonts, Images } from "../../config";
import { Icon } from 'native-base'
import { CartTotal, RoundedView } from "..";
const { height, width } = Dimensions.get('window');

const Myorder = ({ data, totalAmount, onPressBack, onPressSubtract, onPressAdd, onPressDelete, onPressProceed }) => {
    return (
        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
            <View style={{ width: "85%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                <TouchableOpacity activeOpacity={0.7} onPress={onPressBack} style={{ paddingHorizontal: 10 }}>
                    <Icon name="ios-arrow-back" style={{ color: Colors.White, fontSize: 20 }} />
                </TouchableOpacity>
                <View style={{ paddingVertical: 15, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                    <Icon name="cart" style={{ color: Colors.White, fontSize: 18, textShadowColor: Colors.White, textShadowRadius: 1 }} />
                    <Text style={{ textAlign: "center", color: Colors.White, fontSize: 12, fontFamily: Fonts.Montserrat_SemiBold, letterSpacing: 1, textShadowColor: Colors.White, textShadowRadius: 2, paddingLeft: 10 }}>MY ORDER</Text>
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
                            const date = new Date(item.createddate)
                            return (
                                <View style={{ width: "90%", marginVertical: 2, justifyContent: "center", alignItems: "center", marginHorizontal: "5%", borderRadius: 100, borderBottomLeftRadius: !(index % 2 == 0) ? 0 : 100, borderTopRightRadius: !(index % 2 == 0) ? 100 : 0, backgroundColor: Colors.White }}>
                                    <View style={{ width: "90%", height: height * .28, minHeight: 140, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                        {/* <View style={{ height: 140, width: 140, backgroundColor: Colors.Black }}>
                                            <Image source={item.images[0]} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                        </View> */}
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                            <View><Text style={{ fontFamily: Fonts.Montserrat_Medium, color: Colors.BlackOpacity(0.8), fontSize: 13, textShadowColor: Colors.White, textShadowRadius: 2, }} numberOfLines={2}>Reciever Name: {item.name}</Text>
                                                <Text style={{ fontFamily: Fonts.Montserrat_Medium, color: Colors.BlackOpacity(0.8), fontSize: 13, textShadowColor: Colors.White, textShadowRadius: 2, }} numberOfLines={2}>Reciever Number: {item.number}</Text>
                                                <Text style={{ fontFamily: Fonts.Montserrat_Medium, color: Colors.BlackOpacity(0.8), fontSize: 13, textShadowColor: Colors.White, textShadowRadius: 2, }} numberOfLines={2}>Order Date: {date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()}</Text>
                                                <Text style={{ fontFamily: Fonts.Montserrat_Medium, color: Colors.BlackOpacity(0.8), fontSize: 13, textShadowColor: Colors.White, textShadowRadius: 2, }} numberOfLines={1}>Total Product {item.orderdetail.length}</Text>
                                                <Text style={{ fontFamily: Fonts.Montserrat_SemiBold, color: Colors.Black, fontSize: 14, letterSpacing: 1, textShadowColor: Colors.White, textShadowRadius: 2 }} numberOfLines={1}>Total Ammount Rs. {item.price}</Text>
                                            </View>
                                        </View>
                                        {/* <TouchableOpacity onPress={() => onPressDelete(item)} style={{ height: 30, width: 40, justifyContent: "center", alignItems: "center", }}>
                                            <Icon name="trash" style={{ color: Colors.White, fontSize: 23, textShadowColor: Colors.White, textShadowRadius: 1 }} />
                                        </TouchableOpacity> */}
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

            {/* {data.length ?
                <CartTotal
                    BtnTitle={"Proceed to checkout"}
                    itemsLength={data.length}
                    totalAmount={totalAmount}
                    onPressBtn={onPressProceed}
                />
                : null} */}
        </View>
    );
}

export default Myorder;