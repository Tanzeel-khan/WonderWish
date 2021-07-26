import React from "react";
import { View } from "react-native";
import { Colors } from "../../config";

const ComponentShadow = ({ vertical, horizontal, color, opacity, children, containerStyle, elevation }) => {
    return (
        <View style={{
            ...containerStyle,
            shadowOffset: {
                height: vertical || 2,
                width: horizontal || 0
            },
            shadowColor: color || Colors.Black,
            shadowOpacity: opacity || 0.1,
            padding: 2,
            elevation: elevation || 4
        }}>
            {children}
        </View>
    );
}

export default ComponentShadow;