import React from "react";
import { View, Dimensions, TextInput, Text, TouchableOpacity, Picker, Platform } from "react-native";
import { Colors, Fonts, } from "../../config";
import { } from 'native-base'
const { height, width } = Dimensions.get('window');

const FormDropDown = ({ value, selectedValue, onValueChange }) => {
    return (
        <View style={{ width: "90%", paddingVertical: Platform.OS == "ios" ? 15 : 0, marginVertical: 8, paddingHorizontal: 20, borderRadius: 25, borderTopRightRadius: 0, backgroundColor: Colors.WhiteOpacity(0.2) }}>
            <Picker
                mode="dialog"
                style={{ width: "100%", paddingHorizontal: 10, color: value ? Colors.White : Colors.WhiteOpacity(0.5), fontFamily: Fonts.Montserrat_Medium, fontSize: 10, letterSpacing: 0.5, }}
                selectedValue={selectedValue}
                onValueChange={onValueChange}
            >
                <Picker.Item label="Select Product Category" color={Platform.OS == "ios" ? Colors.WhiteOpacity(0.8) : Colors.BlackOpacity(0.5)} />
                <Picker.Item label="Kids" value="kids" color={Platform.OS == "ios" ? Colors.White : Colors.Black} />
                <Picker.Item label="Wedding" value="wedding" color={Platform.OS == "ios" ? Colors.White : Colors.Black} />
                <Picker.Item label="General" value="general" color={Platform.OS == "ios" ? Colors.White : Colors.Black} />
                <Picker.Item label="Engagement" value="engagement" color={Platform.OS == "ios" ? Colors.White : Colors.Black} />
            </Picker>
        </View>
    )
}

export default FormDropDown;