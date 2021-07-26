import React from 'react';
import { Text, View, FlatList, Dimensions, ActivityIndicator, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { Fonts, Images, Colors } from '../../config';
import { ImageSlider, ComponentShadow, RoundedView } from '..';
import { Icon, Col } from 'native-base'
import { color } from 'react-native-reanimated';
const { height, width } = Dimensions.get('window');


const ProductDescription = ({ product, itemAdded, onPressBack, onPressHeart, onPressMenu, onPressAdd }) => {
    return (
        product ?
            <View style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center", position: "relative" }}>
                <Image source={product.images[0]} style={{ height: "100%", width: "100%", position: "absolute" }} />

                <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", position: "absolute", top: 30, zIndex: 10 }}>
                    <TouchableOpacity style={{ paddingHorizontal: 15 }} activeOpacity={0.7} onPress={onPressBack} >
                        <Icon name="ios-arrow-back" style={{ color: Colors.White, fontSize: 25 }} />
                    </TouchableOpacity>


                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={()=>onPressHeart(product)} style={{ paddingHorizontal: 15 }} activeOpacity={0.7} >
                            <Icon name={itemAdded?'heart':'heart-empty'}  style={{color:Colors.Red}}  />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressMenu} style={{ paddingHorizontal: 15 }} activeOpacity={0.7} >
                            <Icon name="more" style={{ color: Colors.White, fontSize: 25 }} />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={{ width: "85%", maxHeight: 200, position: "absolute", top: 70, zIndex: 10 }}>
                    <RoundedView
                        backgroundColor={Colors.White}
                    >
                        <Text style={{ textAlign: "center", color: Colors.Black, fontSize: 14, fontFamily: Fonts.Montserrat_Bold, letterSpacing: 1, textShadowColor: Colors.Black, textShadowRadius: 1 }} numberOfLines={3}>{String(product.name).toUpperCase()}</Text>
                    </RoundedView>
                </View>

                <View style={{ width: "85%", maxHeight: height * .4, position: "absolute", bottom: 110, zIndex: 10 }}>
                    <RoundedView
                        backgroundColor={Colors.White}
                        flex={1}
                        maxHeight={height * .4}
                    >
                        <Text style={{ width: "100%", color: Colors.Black, fontSize: 15, fontFamily: Fonts.Montserrat_SemiBold, letterSpacing: 0.5, paddingBottom: 10, textShadowColor: Colors.Black, textShadowRadius: 1 }}>Description</Text>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }} keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
                            <Text style={{ width: "100%", color: Colors.Black, fontSize: 11, fontFamily: Fonts.Montserrat_Regular, letterSpacing: 0.3, textShadowColor: Colors.Black, textShadowRadius: 1 }}>{product.description}</Text>
                        </ScrollView>
                    </RoundedView>
                </View>

                <TouchableOpacity disabled={itemAdded} onPress={() => onPressAdd(product)} activeOpacity={0.7} style={{ width: "85%", position: "absolute", bottom: 30, zIndex: 10 }}>
                    <RoundedView
                        backgroundColor={Colors.Black}
                    >
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <Icon name={itemAdded ? "checkmark" : "briefcase"} style={{ color: Colors.White, fontSize: Platform.OS === "ios" ? 18 : 15, paddingRight: 10, textShadowColor: Colors.White, textShadowRadius: 1 }} />
                                <Text style={{ width: "100%", color: Colors.White, fontSize: 12, fontFamily: Fonts.Montserrat_Medium, borderLeftWidth: 1, borderLeftColor: Colors.WhiteOpacity(0.5), paddingHorizontal: 10, textShadowColor: Colors.White, textShadowRadius: 1 }}>{itemAdded ? "Added to cart" : "Add to cart"}</Text>
                            </View>
                            <Text style={{ color: Colors.White, fontSize: 12, fontFamily: Fonts.Montserrat_SemiBold, letterSpacing: 1, textShadowColor: Colors.White, textShadowRadius: 2 }}>Rs. {product.amount}</Text>
                        </View>
                    </RoundedView>
                </TouchableOpacity>

            </View>
            :
            <View style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator color={Colors.White} size="large" />
            </View>
    );
}
export default ProductDescription