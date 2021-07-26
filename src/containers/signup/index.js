import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Dimensions,
    ScrollView,
    Text,
    TextInput,
    Image,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { Fonts, Images, Colors } from '../../config';
import { connect } from "react-redux"
import { ReceiverDetailsComp, FormHeader, FormInput, FormButton, FormFooter } from '../../components';
import Firebase from 'react-native-firebase';
import { Icon } from 'native-base';
const { height, width } = Dimensions.get('window');
import ImagePicker from "react-native-image-crop-picker";
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            name: "",
            email: "",
            number: "+92",
            loader: false,
            imagePath: ""
        }
    }

    componentDidMount() {
        const message = this.props.navigation.getParam('message');
        if (message) this.setState({ message })
    }

    submit = () => {
        const { navigate, goBack, replace } = this.props.navigation
        const { name, number, email, imagePath } = this.state
        if (name && number && email) {
            this.setState({ loader: true })
            Firebase.database().ref().child("Users").child(number).set({ name, email, number, type: "user", image: imagePath })
                .then(() => {
                    replace("Login", { number })
                    this.setState({ name: "", email: "", number: "", loader: false });
                })
                .catch(() => { this.setState({ loader: false }) })

        }
    }

    imagePicker = () => {
        ImagePicker.openPicker({
            includeBase64: true
        }).then(image => {
            if (image) {
                this.setState({ imagePath: { uri: `data:image/jpeg;base64,${image.data}` } })
            }
        })
    }

    renderMessage() {
        const { message } = this.state;
        if (!message.length) return null;
        return (
            <Text style={{ width: "100%", padding: 10, fontSize: 12, letterSpacing: 0.3, backgroundColor: Colors.BlackOpacity(0.5), fontFamily: Fonts.Montserrat_Medium, color: Colors.White, position: "absolute", top: 0, zIndex: 11, }}>{message}</Text>
        );

    }

    render() {
        const { name, number, email, loader, imagePath } = this.state
        const { navigate, goBack } = this.props.navigation
        return (
            <View style={{ flex: 1, backgroundColor: Colors.White }}>
                <StatusBar barStyle="light-content" backgroundColor={Colors.Black} />
                {/* Body */}
                <LinearGradient colors={['#000', '#000', '#321575']} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    {this.renderMessage()}
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: "center", alignItems: "center", }} style={{ width: "100%" }} keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
                        <FormHeader title={"Sign Up"} onPressBack={() => { goBack() }} background={this.props.background} />



                        {/* <Image source={{ uri: this.props.background }} style={{ position: "absolute", height: "100%", width: "100%" }} /> */}
                        <View style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center", paddingBottom: 30 }}>
                        <Video source={require('../../assets/wonderwish.mp4')}
                     style={{
                        height: 200,
                        width: 200,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        marginBottom: 0,
                             marginLeft:'auto',
                             marginRight:'auto',
                             bottom: 0,
                             opacity: 0.9}}
                             muted={true}
                             repeat={true}
                             />

                            <View style={{ backgroundColor: "white",  marginTop:0,width: "70%", alignSelf: "center", borderRadius: 5, paddingVertical: 20 }}>
                                <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ width: "85%",justifyContent: "center", alignItems: "center" }}>
                                        {/* <TouchableOpacity onPress={this.imagePicker} style={{ height: 80, width: 80, backgroundColor: Colors.White, borderRadius: 45, justifyContent: "center", alignItems: "center" }}>
                                        <Image source={(imagePath) ? imagePath : Images.Image} style={(imagePath) ? { width: '100%', height: '100%', borderRadius: 40 } : { width: '60%', height: '60%' }} />
                                    </TouchableOpacity> */}
                                        <FormInput color={Colors.Black} inputTitle={"Name"} icon="person" value={name} onChangeText={(name) => this.setState({ name, message: "" })} placeHolder="Enter your name" />
                                        <FormInput color={Colors.Black} inputTitle={"Email"} icon="mail" value={email} onChangeText={(email) => this.setState({ email, message: "" })} placeHolder="Enter your Email" />
                                        <FormInput color={Colors.Black} inputTitle={"Mobile Number"} icon="call" value={number} onChangeText={(number) => this.setState({ number, message: "" })} placeHolder="Enter your phone number" keyboardType="phone-pad" />
                                    </View>
                                </View>
                                {loader ?
                                    <ActivityIndicator style={{ paddingTop: 20 }} color={Colors.Black} size="large" />
                                    :
                                    <FormButton title="Sign Up" color="black" onPressButton={this.submit} />
                                }
                                {/* <FormFooter title="Already have account? Signin" onPressButton={() => { goBack(); this.setState({ loader: false }) }} /> */}
                            </View>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        background: state.DatabaseReducer.background
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);