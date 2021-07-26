import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  KeyboardAvoidingViewComponent,
} from 'react-native';
import Root from './src';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import Store from './src/store';
import {Drawer} from 'native-base';
import {DrawerComp} from './src/components';
import DrawerRef from './src/components/DrawerRef';
import NavigationService from './src/config/NavigationService';
import Firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationActions} from 'react-navigation';
import {Buffer} from 'buffer';
import {Colors} from './src/config';

global.Buffer = Buffer;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: '',
    };
  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }

  //1
  async checkPermission() {
    const enabled = await Firebase.messaging().hasPermission();
    console.log('ENABLED', enabled);
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await Firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  //2
  async requestPermission() {
    try {
      await Firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        console.log('NOTIFICATION', notification);
        const {title, body} = notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {title, body} = notificationOpen.notification;
        this.showAlert(title, body);
      });
  }
  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  }

  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  checkUser = () => {
    const {userType} = this.state;
    AsyncStorage.getItem('userType').then(val => {
      if (val) {
        if (userType !== val) {
          this.setState({userType: val});
        }
      }
    });
  };

  MainView = () => (
    <Provider store={Store}>
      <Drawer
        ref={ref => {
          DrawerRef.getRef(ref);
          this.drawer = ref;
        }}
        side="right"
        styles={{elevation: 0}}
        negotiatePan={true}
        onOpenStart={this.checkUser}
        content={
          <DrawerComp
            userType={this.state.userType}
            onPressCart={() => {
              this.closeDrawer(), NavigationService.navigate('Cart');
            }}
            onPressHelp={() => {
              this.closeDrawer(), NavigationService.navigate('Help');
            }}
            onPressSetting={() => {
              this.closeDrawer(), NavigationService.navigate('Setting');
            }}
            onPressComplain={() => {
              this.closeDrawer(), NavigationService.navigate('Complain');
            }}
            onPressSupport={() => {
              this.closeDrawer(), NavigationService.navigate('Support');
            }}
            onPressPayment={() => {
              this.closeDrawer(), NavigationService.navigate('MyOrder');
            }}
            onPressNum={()=>{
              this.closeDrawer(), NavigationService.navigate('Contact');
            }}
            onPressWish={()=>{
              this.closeDrawer(), NavigationService.navigate('Wish');
            }}
            onPressLogout={() => {
              Firebase.auth()
                .signOut()
                .then(() => {
                  this.closeDrawer();
                  NavigationService.reset(0, [
                    NavigationActions.navigate({routeName: 'Splash'}),
                  ]);
                  AsyncStorage.removeItem('userType');
                  AsyncStorage.removeItem('cart');
                })
                .catch(() => {
                  this.closeDrawer();
                  NavigationService.reset(0, [
                    NavigationActions.navigate({routeName: 'Splash'}),
                  ]);
                  AsyncStorage.removeItem('userType');
                  AsyncStorage.removeItem('cart');
                });
            }}
          />
        }>
        <Root
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Drawer>
    </Provider>
  );

  render() {
    const {MainView} = this;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.Black}}>
        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <MainView />
          </KeyboardAvoidingView>
        ) : (
          <MainView />
        )}
      </SafeAreaView>
    );
  }
}

export default App;
