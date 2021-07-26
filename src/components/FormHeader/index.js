import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import { Colors, Fonts, Images, } from "../../config";
import { Icon } from 'native-base'
const { height, width } = Dimensions.get('window');

const FormHeader = ({ title, onPressBack, confirm, background }) => {
    return (
        <View style={{  marginBottom: 10, width: "100%", position: "relative" }}>
            {/* <Image source={{ uri: background }} style={{ position: "absolute", height: "100%", width: "100%" }} /> */}
            {/* <View style={{ height: "100%", position: "absolute", width: "100%", flexDirection: "column" }}>
                {[...Array(1000)].map((val, i) => <View key={i} style={{
                    width: "100%", flex: 1,
                    backgroundColor: `rgba( 255, 255, 255, ${i / 1000})`
                }} />)}
            </View> */}
            {!confirm ?
                <View style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
                    <TouchableOpacity onPress={onPressBack} style={{ paddingHorizontal: 20, paddingVertical: 10, }}>
                        <Icon name="arrow-back" style={{ color: Colors.White, fontSize: 25, textShadowColor: Colors.BlackOpacity(0.5), textShadowRadius: 5 }} />
                    </TouchableOpacity>
                </View> : null}
            {/* <View style={{ height: "50%", paddingHorizontal: 20, justifyContent: "center", }}>
                <Text style={{ width: "90%", color: Colors.White, fontFamily: Fonts.Montserrat_Regular, fontSize: 35, textShadowColor: Colors.BlackOpacity(0.5), textShadowRadius: 10 }}>{title}</Text>
            </View> */}
        </View>
    );
}

export default FormHeader;