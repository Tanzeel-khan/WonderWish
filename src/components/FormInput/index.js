import React from "react";
import { View, Dimensions, TextInput, Text } from "react-native";
import { Colors, Fonts, } from "../../config";
import { Icon } from 'native-base'


const FormInput = ({ value, onChangeText, placeHolder, keyboardType, multiline, icon, inputTitle, Admin, color }) => {
        return (
                Admin ?
                        <View style={{ maxHeight: 200, width: "90%", flexDirection: "row", paddingVertical: Platform.OS == "ios" ? 15 : 0, marginVertical: 8, paddingHorizontal: 20, borderRadius: 25, borderTopRightRadius: 0, backgroundColor: Colors.WhiteOpacity(0.2) }}>
                                <TextInput
                                        selectionColor={Colors.White}
                                        multiline={multiline}
                                        keyboardType={keyboardType}
                                        value={value}
                                        placeholder={placeHolder}
                                        onChangeText={onChangeText}
                                        placeholderTextColor={Colors.WhiteOpacity(0.8)}
                                        style={{ flex: 1, color: Colors.White, fontFamily: Fonts.Montserrat_Medium, fontSize: 12, letterSpacing: 1 }}
                                />
                        </View>
                        :
                        <View style={{ width: "90%", borderBottomWidth: 1, borderBottomColor: color ? Colors.BlackOpacity(0.8) : Colors.WhiteOpacity(0.8), marginVertical: 10 }}>
                                <Text style={{ fontFamily: Fonts.Montserrat_SemiBold, fontSize: 11, color: color ? color : Colors.White }}>{inputTitle}</Text>
                                <View style={{ height: 40, width: "100%", flexDirection: "row" }}>
                                        <View style={{ height: "100%", justifyContent: "center", alignItems: "center", paddingRight: 15 }}>
                                                <Icon name={icon} style={{ fontSize: 14, color: color ? color : Colors.White }} />
                                        </View>
                                        <TextInput
                                                selectionColor={Colors.Black}
                                                multiline={multiline}
                                                keyboardType={keyboardType}
                                                value={value}
                                                placeholder={placeHolder}
                                                onChangeText={onChangeText}
                                                placeholderTextColor={color ? Colors.BlackOpacity(0.8) : Colors.WhiteOpacity(0.8)}
                                                style={{ flex: 1, color: color ? color : Colors.White, fontFamily: Fonts.Montserrat_Medium, fontSize: 11, letterSpacing: 1 }}
                                        />
                                </View>
                        </View>
        )
}

export default FormInput;