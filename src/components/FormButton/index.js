import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Colors, Fonts, } from "../../config";
const { height, width } = Dimensions.get('window');


const FormButton = ({ title, onPressButton, containerStyle, admin, color }) => {
    return color ? (

        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", paddingVertical: 5, ...containerStyle }}>
            <TouchableOpacity activeOpacity={0.7} onPress={onPressButton} style={{ width: "75%", padding: 10, backgroundColor: color ? color : Colors.White, justifyContent: "center", alignItems: "center", borderRadius: 5 }}>
                <Text style={{ color: color ? "white" : Colors.Black, fontFamily: Fonts.Montserrat_Medium, textShadowColor: Colors.Black, textShadowRadius: 1, fontSize: 13 }}>{title}</Text>
            </TouchableOpacity>
        </View>

    ) :



        (
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", paddingVertical: 5, ...containerStyle }}>
                <TouchableOpacity activeOpacity={0.7} onPress={onPressButton} style={{ width: "75%", padding: 20, backgroundColor: Colors.White, justifyContent: "center", alignItems: "center", borderRadius: 5 }}>
                    <Text style={{ color: Colors.Black, fontFamily: Fonts.Montserrat_Medium, textShadowColor: Colors.Black, textShadowRadius: 1, fontSize: 13 }}>{title}</Text>
                </TouchableOpacity>
            </View>
        )
}

export default FormButton;