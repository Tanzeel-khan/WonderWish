import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {Fonts, Images, Colors} from '../../config';
import {HeaderBar} from '../../components';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Entypo';
import Api from '../../config/api/index';
import {color} from 'react-native-reanimated';
import Firebase from 'react-native-firebase';
import firebase from 'react-native-firebase';

class Setting extends React.Component {
  constructor() {
    super();
    this.state = {
      subject: '',
      message: '',
      file: {},
      EditUser: false,
      EditEmail: false,
      UserError: false,
      EmailError: false,
      userData: {},
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('userData').then(Ures => {
      // console.log("ADZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZzzDRESS", Ures )
      const Udata = JSON.parse(Ures);
      console.log(Udata, '++++++++++++');
      // const data = JSON.parse(res)

      this.setState({userData: Udata});
    });
  }

  async imageUpload() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // console.log(
      //   res.uri,
      //   res.type, // mime type
      //   res.name,
      //   res.size,
      // );

      console.log('res', res);
      // const a = await this.toBase64(res.uri);
      var data = await RNFS.readFile(res.uri, 'base64').then(res => {
        return res;
      });

      console.log('hecj', data);
      this.setState({file: {...res, ...{base64: data}}});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  updateProfile() {
    const {userData, UserError, EmailError, EditEmail, EditUser} = this.state;
    firebase
      .database()
      .ref('Users')
      .child(userData.number)
      .update(userData)
      .then(e => {
        Alert.alert('Success', 'Your Profile Updated Successfully');
        console.log('Error==>', e);

        AsyncStorage.removeItem('userData');
        AsyncStorage.setItem('userData', JSON.stringify(userData));
        this.setState({EditEmail: false, EditUser: false});
      });
  }
  render() {
    const {goBack} = this.props.navigation;
    const {
      EmailError,
      UserError,
      file,
      EditUser,
      EditEmail,
      userData,
    } = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={{height: 65, backgroundColor: Colors.Black}}>
          <HeaderBar
            onPressBack={() => {
              goBack();
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.Black,
            justifyContent: 'center',
          }}>
          {/* <Text>sdfasfsdfsdfasdf</Text> */}
          <View
            style={{
              backgroundColor: Colors.White,
              borderRadius: 5,
              marginHorizontal: 18,
              marginBottom: 10,
            }}>
            <View style={{paddingHorizontal: 25}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 22,
                  color: Colors.BlackOpacity(0.7),
                  paddingVertical: 20,
                }}>
                SETTINGS
              </Text>
              <View style={{paddingVertical: 10}}>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', paddingBottom: 7}}>
                  User Name
                </Text>
                {!EditUser && (
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Colors.BlackOpacity(0.8),
                        paddingBottom: 7,
                      }}>
                      {userData.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({EditUser: true});
                      }}>
                      <Text style={{fontSize: 14, color: Colors.Red}}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                {EditUser && (
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#f1f1f1',
                      borderRadius: 5,
                      paddingHorizontal: 10,

                      borderColor: 'red',
                      borderWidth: UserError ? 0.5 : 0,
                    }}>
                    <TextInput
                      style={{
                        width: '90%',
                      }}
                      value={this.state.userData.name}
                      onChangeText={e => {
                        userData.name = e;
                        this.setState({userData});
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => this.setState({EditUser: false})}>
                      <Icon name="squared-cross" color="red" size={40} />
                    </TouchableOpacity>
                  </View>
                )}
                {UserError && <Text style={{color: 'red'}}>* Required</Text>}
              </View>

              {/* Email */}
              <View style={{paddingVertical: 10}}>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', paddingBottom: 7}}>
                  Email
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.BlackOpacity(0.8),
                    paddingBottom: 7,
                  }}>
                  {userData.email}
                </Text>
                {!EditEmail && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({EditEmail: true});
                    }}>
                    <Text style={{fontSize: 14, color: Colors.Red}}>Edit</Text>
                  </TouchableOpacity>
                )}
                {EditEmail && (
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#f1f1f1',
                      borderRadius: 5,
                      paddingHorizontal: 10,

                      borderColor: 'red',
                      borderWidth: EmailError ? 0.5 : 0,
                    }}>
                    <TextInput
                      style={{
                        width: '90%',
                      }}
                      value={this.state.userData.email}
                      onChangeText={e => {
                        userData.email = e;
                        this.setState({userData});
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => this.setState({EditEmail: false})}>
                      <Icon name="squared-cross" color="red" size={40} />
                    </TouchableOpacity>
                  </View>
                )}
                {EmailError && <Text style={{color: 'red'}}>* Required</Text>}
              </View>

              {/* Phone */}
              <View style={{paddingVertical: 10}}>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', paddingBottom: 7}}>
                  Mobile
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.BlackOpacity(0.8),
                    paddingBottom: 7,
                  }}>
                  +923462337076
                </Text>
              </View>

              {(EditEmail || EditUser) && (
                <View style={{paddingVertical: 10, marginTop: 30}}>
                  <TouchableOpacity
                    onPress={() => this.updateProfile()}
                    style={{
                      backgroundColor: Colors.Black,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: Colors.White,
                        // fontWeight: "bold",
                        letterSpacing: 1,
                      }}>
                      Update Profile
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Setting;
