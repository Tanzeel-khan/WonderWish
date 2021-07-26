import React from 'react';
import { Text, View, FlatList, Dimensions, ActivityIndicator, TouchableOpacity, Platform, Image } from 'react-native';
import { Fonts, Images, Colors } from '../../config';
import { ImageSlider, ComponentShadow, RoundedView } from '..';
import { Icon, Col } from 'native-base'
const { height, width } = Dimensions.get('window');
import NavigationService from '../../config/NavigationService';


const Category = ({ title, onPressCategory, category, type }) => {
    return (
        // <ComponentShadow elevation={40}>
        <TouchableOpacity activeOpacity={0.7} onPress={(category) => onPressCategory(category)} activeOpacity={0.7} style={{ backgroundColor: category == type ? Colors.White : Colors.Black, marginVertical: 5, paddingVertical: 8, paddingHorizontal: 12, borderColor: Colors.White, borderRadius: 5, }}>
            <Text style={{ color: category == type ? Colors.Gray70 : Colors.White, textAlign: "center", fontFamily: Fonts.Montserrat_ExtraBold, fontSize: 10, letterSpacing: 1, textShadowColor: Colors.Black, textShadowRadius: 0 }}>{title}</Text>
        </TouchableOpacity>

        // </ComponentShadow >
    );
}

const ProductList = ({ userImage, data, onViewableItemsChanged, onViewableItemsChangedHor, currentItem, viewabilityConfig, viewabilityConfigHor, swiperRef, swiperIndex, cart, category, onPressCategory, onPressLow, onPressHigh, onPressDetails, onPressSend, onPressAdd, onPressMenu, onPressLeftMenu, onPressCart, itemAdded, scrollview, visibility }) => {
    //  console.log("length of data",data)
    return (
        data.length ?
            <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
                <FlatList
                    pagingEnabled
                    ref={(ref) => { scrollview(ref) }}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    style={{ width: "100%" }}
                    keyExtractor={(item, index) => index.toString()}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    renderItem={({ item, index }) => {
                        return (
                            <ImageSlider
                                images={item.images}
                                swiperRef={swiperRef}
                                index={swiperIndex}
                                onViewableItemsChangedHor={onViewableItemsChangedHor}
                                viewabilityConfigHor={viewabilityConfigHor}
                            />
                        )
                    }}
                />
                <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", position: "absolute", top: 25, zIndex: 10, }}>
                    <View style={{ height: 35, width: 40, backgroundColor: Colors.Black, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <TouchableOpacity activeOpacity={0.7} onPress={onPressLeftMenu} >
                            <Icon name="menu" style={{ color: Colors.White, fontSize: 30 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ maxHeight: 100 }}>
                        {currentItem ?
                            <RoundedView
                                backgroundColor={Colors.White}
                                maxWidth={width * .5}
                            >
                                <Text style={{ textAlign: "center", color: Colors.Black, fontSize: 11, fontFamily: Fonts.Montserrat_SemiBold, letterSpacing: 1, textShadowColor: Colors.Black, textShadowRadius: 1 }} numberOfLines={3}>{String(currentItem.name).toUpperCase()}</Text>
                            </RoundedView>
                            : null}
                    </View>
                    <TouchableOpacity activeOpacity={0.7} onPress={onPressMenu} style={{ height: 40, width: 40, backgroundColor: Colors.Black, borderRadius: 45, justifyContent: "center", alignItems: "center" }} >

                        <Image source={(userImage) ? userImage : Images.UserImage} style={(userImage) ? { borderRadius: 30, height: 40, width: 40 } : { height: 25, width: 25 }} />

                    </TouchableOpacity>
                    {/* {cart.length ?
                        <TouchableOpacity activeOpacity={0.7} onPress={onPressCart} style={{ position: "relative" }}>
                            <View style={{ position: "absolute", right: -5, top: -5, height: 15, width: 15, padding: 0, backgroundColor: Colors.Black, zIndex: 10, borderRadius: 7.5, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: Colors.White, textAlign: "center", fontFamily: Fonts.Montserrat_Medium, fontSize: 8, letterSpacing: 1, textShadowColor: Colors.White, textShadowRadius: 1 }}>{cart.length}</Text>
                            </View>
                            <Icon name="cart" style={{ color: Colors.White, fontSize: 25 }} />
                        </TouchableOpacity> :
                        <View style={{ height: 25, width: 25 }} />} */}
                </View>

{/* 
Best Wishes best_wishes
Eid Special eid_special
Eng & Wedding eng_and_wedding
Men & Women men_and_women
Candy Buckets candy_buckets
Infant & Kids infant_and_kids
Others others
 */}
                {(visibility) ?
                    <>
                        <View style={{ position: "absolute", left: '5%', top: 120,backgroundColor:'white',height:330,width:200,padding:20,borderRadius:10 }}>
                            <Category title={"BEST WISHES"} onPressCategory={() => onPressCategory("best_wishes")} category={category} type="best_wishes" />
                            <Category title={"EID SPECIAL"} onPressCategory={() => onPressCategory("eid_special")} category={category} type="eid_special" />
                            <Category title={"ENG AND WEDDING"} onPressCategory={() => onPressCategory("eng_wedding")} category={category} type="eng_wedding" />
                            <Category title={"MEN AND WOMEN"} onPressCategory={() => onPressCategory("men_and_women")} category={category} type="men_and_women" />
                            <Category title={"CANDY BUCKETS"} onPressCategory={() => onPressCategory("candy_buckets")} category={category} type="candy_buckets" />
                            <Category title={"INFANT AND KIDS"} onPressCategory={() => onPressCategory("kids")} category={category} type="kids" />
                            <Category title={"OTHERS"} onPressCategory={() => onPressCategory("general")} category={category} type="general" />
                        </View>
                        {/* <View style={{ position: "absolute", left: '5%', bottom: 172, width: 110 }}>
                            <TouchableOpacity onPress={onPressLow} activeOpacity={0.7} style={{ backgroundColor: Colors.White, marginVertical: 10, padding: 17, borderRadius: 5 }}>
                                <Text style={{ color: Colors.Black, textAlign: "center", fontFamily: Fonts.Montserrat_Medium, fontSize: 10, letterSpacing: 1, textShadowColor: Colors.Black, textShadowRadius: 1 }}>LOW PRICE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onPressHigh} activeOpacity={0.7} style={{ backgroundColor: Colors.White, marginVertical: 10, padding: 17, borderRadius: 5 }}>
                                <Text style={{ color: Colors.Black, textAlign: "center", fontFamily: Fonts.Montserrat_Medium, fontSize: 10, letterSpacing: 1, textShadowColor: Colors.Black, textShadowRadius: 1 }}>HIGH PRICE</Text>
                            </TouchableOpacity>
                        </View> */}
                    </>
                    :  
                    <View style={{ flex:1, width: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Text style={{ fontFamily: Fonts.Montserrat_Light, color: Colors.White, fontSize: 20}}>There Is No Product</Text>
                </View>
                    }
                <View style={{ position: "absolute", right: 30, bottom: 350 }}>
                    <TouchableOpacity onPress={() => { currentItem ? onPressDetails(currentItem) : null }} activeOpacity={0.7} style={{ backgroundColor: Colors.White, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 18 }}>
                        <Image source={Images.Info} style={{ height: 15, width: 15, resizeMode: "contain" }} />
                    </TouchableOpacity>
                </View>
                {/* send it */}
                {/* <View style={{ position: "absolute", right: '5%', bottom: 170, width: 110 }}>
                    <TouchableOpacity onPress={onPressSend} activeOpacity={0.7} style={{ width: "100%", alignSelf: "flex-end", backgroundColor: Colors.White, marginBottom: 10, padding: 17, borderRadius: 5 }}>
                        <Text style={{ color: Colors.Black, textAlign: "center", fontFamily: Fonts.Montserrat_Medium, fontSize: 10, letterSpacing: 1, textShadowColor: Colors.Black, textShadowRadius: 1 }}>SEND TO IT</Text>
                    </TouchableOpacity>
                </View> */}


                <View style={{ width: "90%", position: "absolute", bottom: 40, alignItems: "center" }}>
                    <RoundedView
                        width={"100%"}
                        backgroundColor={Colors.Black}
                        paddingHorizontal={10}
                        paddingVertical={10}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                    >
                        <TouchableOpacity  onPress={() => NavigationService.navigate("Cart")}>

                         <Text style={{ color: Colors.White, textAlign: "center", fontFamily: Fonts.Montserrat_SemiBold, fontSize: 20, paddingHorizontal: 10, textShadowColor: Colors.Black, textShadowRadius: 0 }}>Rs. {currentItem.amount}</Text>

                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => NavigationService.navigate("Cart")} style={{ height: 30, width: 30, borderRadius: 30, justifyContent: "center", alignItems: "center" }}>
                                <Icon name="cart" style={{ color: Colors.White, fontSize: 25 }} />
                            </TouchableOpacity>
                            <Text style={{ color: Colors.White, textAlign: "center", fontFamily: Fonts.Montserrat_SemiBold, fontSize: 15, paddingHorizontal: 15, textShadowColor: Colors.White, textShadowRadius: 1 }}>{cart.length}</Text>
                            <TouchableOpacity disabled={itemAdded} onPress={() => { onPressAdd(currentItem) }} activeOpacity={0.7} style={{ height: 30, width: 30, backgroundColor: Colors.White, borderRadius: 27, justifyContent: "center", alignItems: "center" }}>
                                <Icon name={itemAdded ? "checkmark" : "add"} style={{ color: Colors.Black, fontSize: Platform.OS === "ios" ?20 : 22 ,alignSelf:"center"}} />
                            </TouchableOpacity>
                        </View>
                    </RoundedView>

                </View>
                <View style={{ position: "absolute", flexDirection: "row", bottom: 10, justifyContent: "center", alignItems: "center" }}>
                    {currentItem.images &&
                        currentItem.images.map((img, ind) => {
                            return (
                                <View key={ind} style={{ padding: 3 }}>
                                    <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: swiperIndex === ind ? Colors.White : Colors.Black }}></View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            :
            <View style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator color={Colors.White} size="large" />
            </View>
    );
}
export default ProductList