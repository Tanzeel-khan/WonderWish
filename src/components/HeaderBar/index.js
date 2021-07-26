import React from "react";
import { View, StatusBar, Text, NativeModules, Platform, TouchableOpacity } from "react-native";
import { Colors } from "../../config";
import { Icon } from 'native-base'



const HeaderBar = ({ onPressBack }) => {
    return (
        <View style={{ flex: 1, width: "100%", position: "relative", flexDirection: 'row', marginTop: 10, }}>
            <TouchableOpacity onPress={onPressBack} style={{ paddingHorizontal: 20, paddingVertical: 10, width: 60, height: 40, }}>
                <Icon name="arrow-back" style={{ color: Colors.White, fontSize: 25, textShadowColor: Colors.BlackOpacity(0.5), textShadowRadius: 5 }} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <Text></Text>
            </View>
            <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 10, width: 60, height: 40, }}>
                {/* <Icon name="arrow-back" style={{ color: Colors.White, fontSize: 25, textShadowColor: Colors.BlackOpacity(0.5), textShadowRadius: 5 }} /> */}
            </TouchableOpacity>
        </View>

    );
}
export default HeaderBar