import React from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import { Colors, Fonts, } from "../../config";
const { height, width } = Dimensions.get('window');
import { FormHeader, FormInput, FormButton, FormFooter } from '../../components';



const LoginConfirm = ({ background, title, buttonTitle, inputTitle, icon, value, placeHolder, keyboardType, loginloader, onPress, confirmCode, confirmLoader, confirmResult, user, goBack, replace, onChangeText, onButtonPress, navigateToLogin }) => {
    // console.warn(phoneNumber)
    return (
        <View style={{ height: "95%", width: "100%", justifyContent: "flex-end", alignItems: "center" }}>
            <FormHeader title={title} onPressBack={() => { goBack() }} background={background} />
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>

                <View style={{ width: "85%", justifyContent: "center", alignItems: "center" }}>
                    <FormInput inputTitle={inputTitle} icon={icon} value={value} onChangeText={onChangeText} placeHolder={placeHolder} keyboardType={keyboardType} />
                </View>
            </View>
            {loginloader ?
                <ActivityIndicator style={{ paddingTop: 20 }} color={Colors.White} size="large" />
                :
                <>
                    <FormButton
                        title={buttonTitle}
                        // onPressButton={this.signIn}
                        onPressButton={onPress}
                    />
                    {(navigateToLogin) ? <FormFooter title="Enter another number" onPressButton={onButtonPress} />
                        : null}
                </>
            }
        </View>
    )
}

export default LoginConfirm;