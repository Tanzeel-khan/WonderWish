import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StatusBar,
  NativeModules,
  Platform,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {Colors, Fonts, Images} from '../../config';
import {Icon} from 'native-base';
import {DrawerOption} from '..';
import {connect} from 'react-redux';

var {height, width} = Dimensions.get('window');
var StatusBarHeight;

if (Platform.OS === 'ios') {
  NativeModules.StatusBarManager.getHeight(heightObj => {
    StatusBarHeight = heightObj.height;
  });
  if (!StatusBarHeight) StatusBarHeight = 30;
} else {
  StatusBarHeight = StatusBar.currentHeight;
}

class DrawerComp extends React.Component {
  render() {
    const {
      userType,
      userData,
      onPressCart,
      onPressLogout,
      onPressPayment,
      onPressHelp,
      onPressSetting,
      onPressComplain,
      onPressNum,
      onPressWish,
      onPressSupport,
     
    } = this.props;
    console.warn('userData ' + JSON.stringify(userData.image));
    return (
      <View style={{flex: 1, width: '100%', paddingRight: 15, paddingTop: 20}}>
        {/* {Platform.OS == "ios" ? <View style={{ height: StatusBarHeight, width: "100%" }} /> : null} */}
        <View
          style={{
            width: '100%',
            height: '95%',
            paddingVertical: 10,
            justifyContent: 'space-between',
            backgroundColor: Colors.White,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 10,
              paddingBottom: 20,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                height: 60,
                width: 60,
                backgroundColor: Colors.Black,
                borderRadius: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={userData.image ? userData.image : Images.UserImage}
                style={
                  userData.image
                    ? {width: '100%', height: '100%', borderRadius: 30}
                    : {width: '65%', height: '65%'}
                }
              />
            </View>
            <View style={{flex: 1, justifyContent: 'center', paddingLeft: 10}}>
              <Text
                style={{
                  fontFamily: Fonts.Montserrat_SemiBold,
                  color: Colors.Black,
                  fontSize: 16,
                }}
                numberOfLines={2}>
                {userType === 'user' ? 'User' : 'Admin'}
              </Text>
            </View>
          </View>
          {userType === 'user' ? (
            <View style={{flex: 1}}>
              <DrawerOption
                image="cart"
                title="Cart"
                onPressOption={onPressCart}
              />
                <DrawerOption
                image="heart"
                title="Wishlist"
                onPressOption={onPressWish}
              />
              <DrawerOption
                image="md-basket"
                title="My Order"
                onPressOption={onPressPayment}
              />
              <View
                style={{
                  backgroundColor: Colors.Black,
                  height: 1,
                  width: '80%',
                  alignSelf: 'center',
                  marginVertical: 20,
                }}
              />
              {/* <DrawerOption image="md-help-circle" title="Help" onPressOption={onPressHelp} /> */}
              <DrawerOption
                image="md-settings"
                title="Setting"
                onPressOption={onPressSetting}
              />
              {/* <DrawerOption image="md-mail" title="Complain" onPressOption={onPressComplain} /> */}
              <View
                style={{
                  backgroundColor: Colors.Black,
                  height: 1,
                  width: '80%',
                  alignSelf: 'center',
                  marginVertical: 20,
                }}
              />
              {/* <DrawerOption image="md-information-circle" title="Support" onPressOption={onPressSupport} /> */}
              <DrawerOption
                image="md-information-circle"
                title="Support"
                onPressOption={onPressComplain}
              />

              <DrawerOption
                image="call"
                title={`Contact Us`}
                onPressOption={onPressNum}
              />
            </View>
          ) : null}

          {/* <DrawerOption image="log-out" title="Logout" onPressOption={onPressLogout} /> */}
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 6,
            }}>
            <TouchableOpacity
              onPress={onPressLogout}
              activeOpacity={0.7}
              style={{
                width: '90%',
                paddingVertical: 15,
                backgroundColor: Colors.Black,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.White,
                  fontSize: 13,
                  fontFamily: Fonts.Montserrat_SemiBold,
                  letterSpacing: 0.5,
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.DatabaseReducer.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerComp);
