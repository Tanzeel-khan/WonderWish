import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Colors, Fonts, } from "../../config";
const { height, width } = Dimensions.get('window');


const FormFooter = ({ title, onPressButton, splash, color }) => {
    return (
        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", paddingVertical: 10 }}>
            <TouchableOpacity activeOpacity={0.7} onPress={onPressButton} style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: color ? "black" : Colors.WhiteOpacity(0.7), fontFamily: Fonts.Montserrat_SemiBold, fontSize: splash ? 12 : 10 }}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FormFooter;