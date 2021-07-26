import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, TextInput, Platform } from "react-native";
import { Colors, Fonts, Images } from "../../config";
import { Icon } from 'native-base'
const { height, width } = Dimensions.get('window');


const RoundedView = ({ children, flex, flexDirection, justifyContent, alignItems, width, maxHeight, maxWidth, paddingVertical, paddingHorizontal, backgroundColor, radius = 10 }) => {
    const horizontal = paddingHorizontal || 20
    const vertical = paddingVertical || 15
    return (
        <View style={{
            flex,
            width,
            maxHeight,
            maxWidth,
            flexDirection: flexDirection || "column",
            paddingVertical: vertical,
            paddingHorizontal: horizontal,
            borderRadius: radius,
            backgroundColor,
            justifyContent: justifyContent || "center",
            alignItems: alignItems || "center",
        }}>
            {children}
        </View>
    )
}
export default RoundedView;