import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  Alert,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Firebase from 'react-native-firebase';
import {Icon, Col} from 'native-base';
import {Fonts, Images, Colors} from '../../config';
import {connect} from 'react-redux';
import {FormHeader, FormInput, FormButton, FormFooter} from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const {fontScale} = Dimensions.get('window');
const {height, width} = Dimensions.get('window');

class Login extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '+92',
      confirmResult: null,
      modal: false,
      userDetail: [],
      fn: null,
      userType: '',
      Loginloader: false,
      confirmLoader: false,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const number = this.props.navigation.getParam('number');
    if (number) {
      this.setState({phoneNumber: number});
    }
    this.unsubscribe = Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.phoneNumber) {
          Firebase.database()
            .ref('Users')
            .child(user.phoneNumber)
            .once('value', snapshot => {
              let val = snapshot.val();
              console.warn('zeeshan', val);
              console.log('zeeshan', val);

              if (val) {
                AsyncStorage.setItem('userData', JSON.stringify(val));

                if (val.type === 'admin') {
                  AsyncStorage.setItem('userType', 'admin');
                  this.props.navigation.replace('Admin');
                } else {
                  AsyncStorage.setItem('userType', 'user');
                  this.props.navigation.replace('Products');
                }
              } else {
                this.signOut('not registered');
              }
            });
        } else {
          this.props.navigation.replace('Admin');
        }
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '+92',
          confirmResult: null,
        });
        if (number) {
          this.setState({phoneNumber: number});
        }
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    const {phoneNumber} = this.state;
    if (phoneNumber.length) {
      this.setState({message: 'Sending code ...', Loginloader: true});

      Firebase.auth()
        .signInWithPhoneNumber(phoneNumber)
        .then(confirmResult => {
          this.setState({
            confirmResult,
            message: 'Code has been sent!',
            Loginloader: false,
          });
        })
        .catch(error =>
          this.setState({
            message: `Sign In With Phone Number Error: ${error.message}`,
            Loginloader: false,
          }),
        );
    }
  };

  confirmCode = () => {
    const {codeInput, confirmResult} = this.state;

    this.setState({confirmLoader: true});

    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          this.setState({message: 'Code Confirmed!'});

          Firebase.database()
            .ref('Users')
            .child('+923132324085')
            .once('value', snapshot => {
              let val = snapshot.val();
              if (val) {
                if (val.type === 'admin') {
                  AsyncStorage.setItem('userType', 'admin');
                  this.props.navigation.replace('Admin');
                } else {
                  AsyncStorage.setItem('userType', 'user');
                  this.props.navigation.replace('Products');
                }
                this.setState({confirmLoader: false});
              } else {
                this.signOut('not registered');
                this.setState({confirmLoader: false});
              }
            });
        })
        .catch(error =>
          this.setState({
            message: `Code Confirm Error: ${error.message}`,
            confirmLoader: false,
          }),
        );
    }
  };

  signOut = msg => {
    AsyncStorage.clear();
    if (!msg) {
      Firebase.auth().signOut();
    } else if (msg === 'not registered') {
      var message = 'Your are not registered, please resgister yourself';
      Firebase.auth()
        .currentUser.delete()
        .then(() => {
          this.setState({
            message,
            user: null,
            confirmResult: null,
          });
          this.props.navigation.navigate('Signup', {message});
        })
        .catch(e => console.log('ERROR', e));
    }
  };

  renderMessage() {
    const {message} = this.state;
    if (!message.length) return null;
    return (
      <Text
        style={{
          width: '100%',
          padding: 10,
          fontSize: 12,
          letterSpacing: 0.3,
          backgroundColor: Colors.BlackOpacity(0.5),
          fontFamily: Fonts.Montserrat_Medium,
          color: Colors.White,
          position: 'absolute',
          top: 0,
          zIndex: 11,
        }}>
        {message}
      </Text>
    );
  }

  render() {
    const {
      message,
      user,
      confirmResult,
      phoneNumber,
      codeInput,
      Loginloader,
      confirmLoader,
      background,
    } = this.state;
    const {navigate, goBack, replace} = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: Colors.White}}>
        {this.renderMessage()}
        <View style={{flex: 1, backgroundColor: Colors.White}}>
          <StatusBar barStyle="light-content" backgroundColor={'black'} />
          {/* Body */}
          <View style={{flex: 1}}>
            {/* <ScrollView
                            contentInsetAdjustmentBehavior="automatic"
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
                            style={{ width: "100%",flex:1 }}
                            keyboardShouldPersistTaps="handled"
                            keyboardDismissMode="interactive"
                        > */}

            <LinearGradient
              colors={['#000', '#000', '#321575']}
              style={{
                flex: 1,
                height: height + 40,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Image source={{ uri: this.props.background }} style={{ position: "absolute", height: "100%", width: "100%" }} /> */}
              {!user && !confirmResult && (
                <View style={{flex: 1, width: '100%', paddingBottom: 30}}>
                  {/* <FormHeader title={"Sign In"} onPressBack={() => { goBack() }} /> */}
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    {/* <Image
                      source={require('../../assets/images/wonder.png')}
                      style={{
                        height: 200,
                        width: 200,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        marginBottom: 40,
                      }}
                    /> */}
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

                    <View
                      style={{
                        backgroundColor: 'white',
                        width: '70%',
                        alignSelf: 'center',
                        borderRadius: 5,
                        paddingVertical: 20,
                       
                      }}>
                      <View
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: '85%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {/* <FormInput inputTitle={"Mobile Number"} icon="call" value={} onChangeText= placeHolder="Enter your phone number" keyboardType="" /> */}

                          <View
                            style={{
                              width: '90%',
                              borderBottomWidth: 1,
                              borderBottomColor: Colors.BlackOpacity(0.3),
                              marginVertical: 10,
                            }}>
                            <Text
                              style={{
                                fontFamily: Fonts.Montserrat_SemiBold,
                                fontSize: 11,
                                fontWeight: 'bold',
                                letterSpacing: 1,
                                color: Colors.Black,
                                textAlign: 'center',
                              }}>
                              {'MOBILE NUMBER'}
                            </Text>
                            <View
                              style={{
                                height: 50,
                                width: '100%',
                                flexDirection: 'row',
                              }}>
                              {/* <View style={{ height: "100%", justifyContent: "center", alignItems: "center", paddingRight: 15 }}>
                                                                <Icon name={"call"} style={{ fontSize: 14, color: Colors.Black }} />
                                                            </View> */}
                              <TextInput
                                selectionColor={Colors.Black}
                                // multiline={multiline}
                                keyboardType={'phone-pad'}
                                value={phoneNumber}
                                placeholder={'Mobile Number'}
                                onChangeText={phoneNumber =>
                                  this.setState({phoneNumber, message: ''})
                                }
                                placeholderTextColor={Colors.BlackOpacity(0.8)}
                                placeHo
                                style={{
                                  flex: 1,
                                  color: Colors.Black,
                                  fontFamily: Fonts.Montserrat_Medium,
                                  fontSize: 25,
                                  fontWeight: 'bold',
                                  letterSpacing: 0.5,
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                      {Loginloader ? (
                        <ActivityIndicator
                          style={{paddingTop: 20}}
                          color={Colors.Black}
                          size="large"
                        />
                      ) : (
                        <FormButton
                          title="Sign In"
                          onPressButton={this.signIn}
                          color={'black'}
                          // onPressButton={this.confirmCode}
                        />
                      )}

                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('Signup');
                        }}>
                        <Text
                          style={{
                            fontFamily: Fonts.Montserrat_SemiBold,
                            fontSize: 11,
                            fontWeight: 'bold',
                            letterSpacing: 1,
                            color: Colors.Black,
                            textAlign: 'center',
                            paddingVertical: 10,
                          }}>
                          {'CREATE NEW ACCOUNT'}
                        </Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity onPress={() => { }}><Text style={{ fontFamily: Fonts.Montserrat_SemiBold, fontSize: 11, fontWeight: "bold", letterSpacing: 1, color: Colors.Black, textAlign: "center" }}>{"CREATE NEW ACCOUNT"}</Text></TouchableOpacity> */}
                    </View>
                  </View>
                </View>
              )}

              {!user && confirmResult && (
                <View
                  style={{
                    height: height,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'black',
                  }}>
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

                  <View
                    style={{
                      backgroundColor: 'white',
                      width: '70%',
                      alignSelf: 'center',
                      borderRadius: 5,
                      paddingVertical: 20,
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts.Montserrat_SemiBold,
                        fontSize: 11,
                        fontWeight: 'bold',
                        letterSpacing: 1,
                        color: Colors.Black,
                        textAlign: 'center',
                      }}>
                      {'VERIFY CODE'}
                    </Text>

                    {/* <FormHeader title={"Confirm Code"} confirm /> */}
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: '85%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {/* <FormInput inputTitle={"Confirmation Code"} icon="code" value={codeInput} onChangeText={(codeInput) => this.setState({ codeInput, message: "" })} placeHolder="Enter confirmation code" keyboardType="numeric" /> */}

                        <View
                          style={{
                            width: '90%',
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.BlackOpacity(0.3),
                            marginVertical: 10,
                          }}>
                          <View
                            style={{
                              height: 50,
                              width: '100%',
                              flexDirection: 'row',
                            }}>
                            {/* <View style={{ height: "100%", justifyContent: "center", alignItems: "center", paddingRight: 15 }}>
                                                                <Icon name={"call"} style={{ fontSize: 14, color: Colors.Black }} />
                                                            </View> */}
                            <TextInput
                              selectionColor={Colors.Black}
                              // multiline={multiline}
                              keyboardType={'phone-pad'}
                              value={codeInput}
                              placeholder={'Enter confirmation code'}
                              onChangeText={codeInput =>
                                this.setState({codeInput, message: ''})
                              }
                              placeholderTextColor={Colors.BlackOpacity(0.8)}
                              placeHo
                              style={{
                                flex: 1,
                                color: Colors.Black,
                                fontFamily: Fonts.Montserrat_Medium,
                                fontSize: 25,
                                fontWeight: 'bold',
                                letterSpacing: 0.5,
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                    {confirmLoader ? (
                      <ActivityIndicator
                        style={{paddingTop: 20}}
                        color={Colors.Black}
                        size="large"
                      />
                    ) : (
                      <>
                        <FormButton
                          color={'black'}
                          title="Confirm"
                          onPressButton={this.confirmCode}
                        />
                        <FormFooter
                          color="black"
                          title="Enter another number"
                          onPressButton={() => {
                            replace('Login');
                            this.setState({confirmLoader: false});
                          }}
                        />
                      </>
                    )}
                  </View>
                </View>
              )}
            </LinearGradient>
            {/* </ScrollView> */}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    background: state.DatabaseReducer.background,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
