import React from "react";
import { View, StatusBar, Dimensions, NativeModules, Platform, } from "react-native";
import { Colors } from "../../config";

const { OS } = Platform;
const { height } = Dimensions.get("window");

var StatusBarHeight;


if (OS === "ios") {
    NativeModules.StatusBarManager.getHeight((heightObj) => {
        StatusBarHeight = heightObj.height;
    })
    if (!StatusBarHeight) StatusBarHeight = 30
} else {
    StatusBarHeight = StatusBar.currentHeight
}

const Header = ({ children }) => {
    return (
        <View style={{
            // height: OS === "ios" ? height * .07 + StatusBarHeight : height * .05 + StatusBarHeight,
            // maxHeight: 50 + StatusBarHeight,
            // minHeight: 20 + StatusBarHeight,
            height: 40 + StatusBarHeight,
            backgroundColor: Colors.ThemeWhite,
            // paddingTop: OS === "ios" ? StatusBarHeight + 5 : 5,
            paddingHorizontal: 10,
            justifyContent: "center",
            alignItems: "center"
        }}>
            {children}
        </View>

    );
}
export default Header