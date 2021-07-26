import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Dimensions,
    ScrollView,
    Text,
    TextInput,
    Image,
    ActivityIndicator
} from 'react-native';
import { Fonts, Images, Colors } from '../../config';
import { connect } from "react-redux"
import { FormButton, FormFooter } from '../../components';
const { height, width } = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage'
import Firebase from 'react-native-firebase';
import DatabaseAction from '../../store/actions/DatabaseAction';
import DatabaseMiddleware from '../../store/middlewares/DatabaseMiddleware';
import LinearGradient from 'react-native-linear-gradient';

class Splash extends Component {

    state = {
        bg: ''
    }
    componentDidMount() {

        Firebase.database().ref("Application").child("background").once("value", (snapshot) => {
            this.setState({ bg: snapshot.val() })
            this.props.bgImage(snapshot.val())
        })

        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if (user.phoneNumber) {
                    Firebase.database().ref("Users").child(user.phoneNumber).once("value", (snapshot) => {
                        let val = snapshot.val()
                        console.log("ZEESHAN DATA", val)
                        if (val) {
                            if (val.type === "admin")
                                this.props.navigation.replace("Admin")
                            else
                                this.props.navigation.replace("Products")
                        }
                    })
                }
                // this.props.GetUserData(user.phoneNumber)
            }
            else {
                this.props.navigation.navigate("Login")
            }
        });
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        const { bg } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: Colors.Black, justifyContent: "center", alignItems: "center" }}>
               
                <StatusBar backgroundColor={Colors.Black} />
               
                {/* <LinearGradient colors={['#FF057C', '#8D0B93', '#321575']} style={{ flex: 1, justifyContent: 'flex-end' }}> */}
                <Image source={require("../../assets/images/wonder.png")} style={{ position: "absolute", height: 200, width: 200, resizeMode: "contain", alignSelf: "center", top: 100 }} />
                {/* <View style={{ height: "100%", position: "absolute", width: "100%", flexDirection: "column" }}>
                        {[...Array(1000)].map((val, i) => <View key={i} style={{
                            width: "100%", flex: 1,
                            backgroundColor: `rgba( 255, 255, 255, ${i / 1000})`
                        }} />)}
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: Colors.White, fontFamily: Fonts.Montserrat_Medium, fontSize: 35, textShadowColor: Colors.BlackOpacity(0.5), textShadowRadius: 10 }}>Wonder Wish</Text>
                    </View> */}

                {/* <View style={{ paddingBottom: 20, }}>
                        <FormButton title="Sign In" onPressButton={() => { navigate("Login") }} />
                        <FormButton title="Sign Up" onPressButton={() => { navigate("Signup") }} />
                    </View> */}
                {/* </LinearGradient> */}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        bgImage: (data) => {
            dispatch(DatabaseAction.bgImage(data))
        },
        // GetUserData:(number)=>  dispatch(DatabaseMiddleware.GetUserData(number))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);