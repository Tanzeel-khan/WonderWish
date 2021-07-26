import React from 'react';
import { Text, View, FlatList, Dimensions, NativeModules, Platform, StatusBar, Image, } from 'react-native';
import { Fonts, Images, Colors } from '../../config';
const { height, width } = Dimensions.get('window');
const { OS } = Platform;

import Swiper from 'react-native-swiper';

var StatusBarHeight;

if (OS === "ios") {
    NativeModules.StatusBarManager.getHeight((heightObj) => {
        StatusBarHeight = heightObj.height;
    })
    if (!StatusBarHeight) StatusBarHeight = 25
} else {
    StatusBarHeight = StatusBar.currentHeight
}


const ImageSlider = ({ images, swiperRef, index,onViewableItemsChangedHor,viewabilityConfigHor }) => {
    return (
     
            <FlatList
                pagingEnabled
                horizontal
                ref={(ref) => { swiperRef(ref) }}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChangedHor}
                viewabilityConfig={viewabilityConfigHor}
                data={images}
                style={{ width: "100%", flex: 1 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <View key={index} style={{ height:height - StatusBarHeight, width: width, alignItems: "center", justifyContent: "center" }}>
                            <Image source={item} style={{ height: "100%", width: "100%" }} />
                        </View>
                    )
                }}
            />
        
    )
}
export default ImageSlider