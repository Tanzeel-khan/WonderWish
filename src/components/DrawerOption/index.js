import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, } from "../../config";
import { Icon } from 'native-base'
// import { Icon } from 'react-native-vector-icons'


const DrawerOption = ({ image, title, onPressOption }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPressOption} style={{ flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center", paddingVertical: 12, paddingLeft: 30, paddingRight: 10 }}>
            <Icon name={image} style={{ color: Colors.Black, fontSize: 23 }} />
            <View style={{ flex: 1, justifyContent: "center", paddingLeft: 10 }}>
                <Text style={{ fontFamily: Fonts.Montserrat_SemiBold, color: Colors.Black, fontSize: 14 }} numberOfLines={2}>{title}</Text>
            </View>

        </TouchableOpacity>
    );
}

export default DrawerOption;