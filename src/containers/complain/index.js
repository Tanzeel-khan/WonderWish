import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Fonts, Images, Colors} from '../../config';
import {HeaderBar} from '../../components';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

import Api from '../../config/api/index';
import {Alert} from 'react-native';

class Complain extends React.Component {
  constructor() {
    super();
    this.state = {
      subject: '',
      message: '',
      file: {},
      SubError: false,
      MsgError: false,
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

  sendEmail() {
    const {message, subject, userData, file, SubError, MsgError} = this.state;
    console.log('file', file);

    this.setState({SubError: false, MsgError: false});
    if (!subject.length) {
      this.setState({SubError: true});
    } else if (!message.length) {
      this.setState({MsgError: true});
    } else {
      axios
        .post(
          Api.BASE_URL + 'supportemail',
          {
            data: {
              subject: this.state.subject,
              message: this.state.message,
            },
            userData,
            attachments: file,
          },
          // {
          //   headers: {
          //     'Content-Type': 'multipart/form-data; ',
          //   },
          // },
        )
        .then(res => {
          Alert.alert(
            'Complain Registered',
            'your complain submited sucessfull we will response in 3 to 4 working hour',
          );
          this.setState({subject: '', message: '', file: {}});
          this.props.navigation.goBack();
        });

      console.log(message + subject);
    }
  }
  render() {
    const {goBack} = this.props.navigation;
    const {MsgError, SubError, file} = this.state;
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
                COMPLAINTS
              </Text>
              <View style={{paddingVertical: 10}}>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', paddingBottom: 7}}>
                  Subject
                </Text>
                <TextInput
                  style={{
                    backgroundColor: '#f1f1f1',
                    borderRadius: 5,
                    padding: 15,
                    borderColor: 'red',
                    borderWidth: SubError ? 0.5 : 0,
                  }}
                  value={this.state.subject}
                  onChangeText={e => this.setState({subject: e})}
                />
                {SubError && <Text style={{color: 'red'}}>* Required</Text>}
              </View>

              <View style={{paddingVertical: 10}}>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', paddingBottom: 7}}>
                  Message
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={8}
                  style={{
                    textAlignVertical: 'top',
                    backgroundColor: '#f1f1f1',
                    borderRadius: 5,
                    padding: 15,
                    height: 90,
                    borderColor: 'red',
                    borderWidth: MsgError ? 0.5 : 0,
                  }}
                  value={this.state.message}
                  onChangeText={e => this.setState({message: e})}
                />
                {MsgError && <Text style={{color: 'red'}}>* Required</Text>}
              </View>

              <View
                style={{
                  paddingVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.imageUpload()}
                  style={{
                    backgroundColor: Colors.Black,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: Colors.White,
                      fontWeight: 'bold',
                      letterSpacing: 1,
                    }}>
                    UPLOAD
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: Colors.BlackOpacity(0.7),
                    width: '40%',
                    fontWeight: 'bold',
                    fontSize: 11,
                    paddingHorizontal: 15,
                  }}>
                  {file.base64
                    ? file.name + ' is selected'
                    : 'any document to release'}
                </Text>
              </View>

              <View style={{paddingVertical: 10, marginTop: 30}}>
                <TouchableOpacity
                  onPress={() => this.sendEmail()}
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
                    Send
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Complain;
