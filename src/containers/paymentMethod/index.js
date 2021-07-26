import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Linking,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Platform,
  Dimensions,
  TextInput,
  CheckBox,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import {Colors, Fonts, Images} from '../../config';
import {RoundedView} from '../../components/index';
import stripe from 'tipsi-stripe';
import Button from './Button';
import axios from 'axios';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../../config/NavigationService';
import DatabaseMiddleware from '../../store/middlewares/DatabaseMiddleware';
import Firebase from 'react-native-firebase';
import {Icon, Card} from 'native-base';
import Api from '../../config/api/index';

const BASE_URL = Api.BASE_URL;
const CARDS="CARDS"
// const BASE_URL = "http://localhost:3050/"

stripe.setOptions({
  publishableKey: 'pk_test_sJvgDZu647YRTcdOlvv3luGP',
  merchantId: '4000002500003155',
  androidPayMode: 'test',
});

class PaymentMethod extends PureComponent {
  static title = 'Card Form';

  state = {
    showModelPayment: false,
    payment_modals: false,

    nameoncard: 'nzme',
    cardno: '4242 4242 4242 4242',
    expirymonthyear: '02/21',
    cvv: '123',

    checkbox: true,
    loading: false,
    token: null,
    address: null,
    userData: null,
    cardList:[]
  };

  componentDidMount() {
    AsyncStorage.getItem('userData').then(Ures => {
      console.log("ADZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZzzDRESS", Ures )
      const Udata = JSON.parse(Ures);
      console.log(Udata, '++++++++++++');
      // const data = JSON.parse(res)

      this.setState({userData: Udata});
    });
    // })
  }


async selectedCard(v,i){
  const {cardList}=this.state
  try{
    const token = await stripe.createTokenWithCard(v);
    console.log("token",token)
    this.setState({token:token,showModelPayment:false})
  }
  catch(e){
    Alert.alert("Error","Your code is not valid")
  let updatedCardList=  cardList.splice(i,0)
  console.log(updatedCardList)
  this.setState({cardList:updatedCardList,showModelPayment:false})
  await AsyncStorage.setItem(CARDS,JSON.stringify(updatedCardList))
  }
}

  CartTotals(token, itemsLength, totalAmount, loading) {
 
    return (
      <RoundedView
        backgroundColor={Colors.White}
        width={'95%'}
        paddingHorizontal={15}>
        <View style={{width: '100%', paddingTop: 10}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingBottom: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.Black,
                fontSize: 12,
                fontFamily: Fonts.Montserrat_Medium,
                letterSpacing: 0.3,
                textShadowColor: Colors.BlackOpacity(0.8),
                textShadowRadius: 0,
              }}>
              {itemsLength} {itemsLength > 1 ? 'items' : 'item'}
            </Text>
            <Text
              style={{
                color: Colors.Black,
                fontSize: 12,
                fontFamily: Fonts.Montserrat_Medium,
                letterSpacing: 0.5,
                textShadowColor: Colors.BlackOpacity(0.8),
                textShadowRadius: 0,
              }}>
              Rs. {totalAmount}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingBottom: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.Black,
                fontSize: 12,
                fontFamily: Fonts.Montserrat_Medium,
                letterSpacing: 0.3,
                textShadowColor: Colors.BlackOpacity(0.8),
                textShadowRadius: 0,
              }}>
              Discount
            </Text>
            <Text
              style={{
                color: Colors.Black,
                fontSize: 12,
                fontFamily: Fonts.Montserrat_Medium,
                letterSpacing: 0.3,
                textShadowColor: Colors.BlackOpacity(0.8),
                textShadowRadius: 0,
              }}>
              0
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingBottom: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.Black,
                fontSize: 12,
                fontFamily: Fonts.Montserrat_Medium,
                letterSpacing: 0.3,
                textShadowColor: Colors.BlackOpacity(0.8),
                textShadowRadius: 0,
              }}>
              Shipping
            </Text>
            <Text
              style={{
                color: Colors.Black,
                fontSize: 12,
                fontFamily: Fonts.Montserrat_Medium,
                letterSpacing: 0.3,
                textShadowColor: Colors.BlackOpacity(0.8),
                textShadowRadius: 0,
              }}>
              Free
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingVertical: 10,
            paddingHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 30,
            borderTopWidth: 1,
            borderTopColor: Colors.BlackOpacity(0.1),
          }}>
          <Text
            style={{
              color: Colors.Black,
              fontSize: 15,
              fontFamily: Fonts.Montserrat_SemiBold,
              letterSpacing: 0.3,
              textShadowColor: Colors.Black,
              textShadowRadius: 0,
            }}>
            Total{' '}
          </Text>
          <Text
            style={{
              color: Colors.Black,
              fontSize: 15,
              fontFamily: Fonts.Montserrat_SemiBold,
              letterSpacing: 0.5,
              textShadowColor: Colors.Black,
              textShadowRadius: 0,
            }}>
            Rs. {totalAmount}
          </Text>
        </View>
        <RoundedView
          backgroundColor={Colors.Black}
          width={'100%'}
          radius={5}
          paddingHorizontal={1}>
          <TouchableOpacity
            onPress={
              token ? this.createPayment.bind(this) :  this.enterCardAndPay.bind(this)
            }
            activeOpacity={0.7}
            style={{width: '100%'}}>
            {loading ? (
              <ActivityIndicator animating size="small" color="white" />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.White,
                  fontSize: 15,
                  fontFamily: Fonts.Montserrat_Medium,
                  letterSpacing: 0.5,
                  textShadowColor: Colors.White,
                  textShadowRadius: 1,
                }}>
                {token ? 'Pay' : 'Enter your card and pay'}
              </Text>
            )}
          </TouchableOpacity>
        </RoundedView>
        {this.AddPaymentModel()}
      </RoundedView>
    );
  }

  AddPaymentModel() {
    let {nameoncard, cardno, expirymonthyear, cvv, checkbox} = this.state;
    console.log(
      'Add Payment modal===>',
      nameoncard,
      cardno,
      expirymonthyear,
      cvv,
      checkbox,
    );
    return (
      <Modal
        animationType="slide"
        visible={this.state.payment_modals}
        // transparent={true}
        onRequestClose={() =>
          this.setState({
            payment_modals: false,
            nameoncard: '',
            cardno: '',
            expirymonthyear: '',
            cvv: '',
            checkbox: false,
          })
        }
        style={{flex: 1, backgroundColor: '#212121'}}>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
          }}>
          <View
            style={{
              width: '85%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.setState({payment_modals: false})}
              style={{paddingHorizontal: 10}}>
              <Icon
                name="ios-arrow-back"
                style={{color: Colors.White, fontSize: 20, padding: 5}}
              />
            </TouchableOpacity>
            <View
              style={{
                paddingVertical: 15,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.White,
                  fontSize: 12,
                  fontFamily: Fonts.Montserrat_SemiBold,
                  letterSpacing: 1,
                  textShadowColor: Colors.White,
                  textShadowRadius: 2,
                  paddingLeft: 10,
                }}>
                ADD PAYMENT CARD
              </Text>
            </View>
            <View style={{height: 25, width: 25}} />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            style={{width: '100%'}}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive">
            <View style={{mwidth: '85%', marginVertical: 10}}>
              <View style={{paddingVertical: 8.5}}>
                <View style={{paddingBottom: 10, paddingLeft: 5}}>
                  <Text
                    style={{
                      fontFamily: Fonts.Montserrat_SemiBold,
                      fontSize: 15,
                      color: Colors.White,
                      textShadowColor: Colors.White,
                      textShadowRadius: 2,
                    }}>
                    Name On Card
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    paddingVertical: Platform.OS == 'ios' ? 15 : 0,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    backgroundColor: Colors.WhiteOpacity(0.2),
                  }}>
                  <TextInput
                    style={{
                      flex: 1,
                      color: Colors.White,
                      fontFamily: Fonts.Montserrat_Medium,
                      fontSize: 12,
                      letterSpacing: 1,
                    }}
                    placeholderTextColor={Colors.WhiteOpacity(0.8)}
                    placeholder={'Name on card'}
                    maxLength={25}
                    keyboardType="default"
                    onChangeText={name => this.setState({nameoncard: name})}
                  />
                </View>
              </View>

              <View style={{paddingVertical: 8.5}}>
                <View style={{paddingBottom: 10, paddingLeft: 5}}>
                  <Text
                    style={{
                      fontFamily: Fonts.Montserrat_SemiBold,
                      fontSize: 15,
                      color: Colors.White,
                      textShadowColor: Colors.White,
                      textShadowRadius: 2,
                    }}>
                    Card Number
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    paddingVertical: Platform.OS == 'ios' ? 15 : 0,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    backgroundColor: Colors.WhiteOpacity(0.2),
                  }}>
                  <TextInput
                    style={{
                      flex: 1,
                      color: Colors.White,
                      fontFamily: Fonts.Montserrat_Medium,
                      fontSize: 12,
                      letterSpacing: 1,
                    }}
                    placeholderTextColor={Colors.WhiteOpacity(0.8)}
                    keyboardType="number-pad"
                    maxLength={19}
                    placeholder={'42** **** **** ****'}
                    value={this.state.cardno}
                    onChangeText={num => this.cardText(num)}
                  />
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{paddingVertical: 8.5, width: '43%'}}>
                  <View style={{paddingBottom: 10, paddingLeft: 5}}>
                    <Text
                      style={{
                        fontFamily: Fonts.Montserrat_SemiBold,
                        fontSize: 15,
                        color: Colors.White,
                        textShadowColor: Colors.White,
                        textShadowRadius: 2,
                      }}>
                      MM/YY
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      paddingVertical: Platform.OS == 'ios' ? 15 : 0,
                      paddingHorizontal: 20,
                      borderRadius: 10,
                      backgroundColor: Colors.WhiteOpacity(0.2),
                    }}>
                    <TextInput
                      style={{
                        flex: 1,
                        color: Colors.White,
                        fontFamily: Fonts.Montserrat_Medium,
                        fontSize: 12,
                        letterSpacing: 1,
                      }}
                      placeholderTextColor={Colors.WhiteOpacity(0.8)}
                      maxLength={5}
                      keyboardType="number-pad"
                      placeholder={'MM/YY'}
                      value={this.state.expirymonthyear}
                      onChangeText={mmyy => this.validateMonthAndYear(mmyy)}
                    />
                  </View>
                </View>

                <View style={{paddingVertical: 8.5, width: '45%'}}>
                  <View style={{paddingBottom: 10, paddingLeft: 5}}>
                    <Text
                      style={{
                        fontFamily: Fonts.Montserrat_SemiBold,
                        fontSize: 15,
                        color: Colors.White,
                        textShadowColor: Colors.White,
                        textShadowRadius: 2,
                      }}>
                      CVV
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      paddingVertical: Platform.OS == 'ios' ? 15 : 0,
                      paddingHorizontal: 20,
                      borderRadius: 10,
                      backgroundColor: Colors.WhiteOpacity(0.2),
                    }}>
                    <TextInput
                      style={{
                        flex: 1,
                        color: Colors.White,
                        fontFamily: Fonts.Montserrat_Medium,
                        fontSize: 12,
                        letterSpacing: 1,
                      }}
                      placeholderTextColor={Colors.WhiteOpacity(0.8)}
                      maxLength={3}
                      keyboardType="number-pad"
                      placeholder={'CVV'}
                      onChangeText={cvv => this.setState({cvv: cvv})}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
                <View style={{bordorColor: 'white', borderWidth: 0.1}}>
                  {/* <CheckBox
                    value={this.state.checkbox}
                    onValueChange={() =>
                      this.setState({checkbox: !this.state.checkbox})
                    }
                    tintColors={{true: 'white'}}
                  /> */}
                </View>

                <Text
                  style={{
                    textAlign: 'center',
                    color: Colors.White,
                    fontSize: 10,
                    fontFamily: Fonts.Montserrat_SemiBold,
                    letterSpacing: 2,
                  }}>
                  {' '}
                  Do You Want To Save The Card Detail
                </Text>
              </View>
              <View style={{width: 300, marginTop: 20}}>
                <TouchableOpacity
                  onPress={() => this.handleDoneButton()}
                  activeOpacity={0.7}
                  style={{
                    width: '100%',
                    alignSelf: 'flex-end',
                    backgroundColor: Colors.White,
                    marginBottom: 10,
                    padding: 17,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: Colors.Black,
                      textAlign: 'center',
                      fontFamily: Fonts.Montserrat_Medium,
                      fontSize: 14,
                      letterSpacing: 1,
                      textShadowColor: Colors.Black,
                      textShadowRadius: 1,
                    }}>
                    DONE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }

  ProceedToPaymentModel() {
    let {nameoncard, cardno, showModelPayment} = this.state;
    // console.log("Proceed to Payment Modal=======>", nameoncard, cardno)
    const cardDisc = cardno;
    const masked = '**** **** **** ' + cardDisc.substr(-4);

    //     // componentDidMount(){
    // let temp= ''
    //     AsyncStorage.getItem("CARDS")
    //       .then(res =>{
    //         temp = JSON.parse(res)
    //         console.log('resposnse==>>', temp)
    //         // console.log('resposnse==>>', temp.nameoncard)
    //         // console.log('resposnse==>>', temp.cardno)
    //       })
    //     // }

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showModelPayment}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.White,
          }}>
          <View
            style={{
              width: '85%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.setState({showModelPayment: false})}
              style={{paddingHorizontal: 10}}>
              <Icon
                name="ios-arrow-back"
                style={{color: Colors.Black, fontSize: 20}}
              />
            </TouchableOpacity>
            <View
              style={{
                paddingVertical: 15,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.Black,
                  fontSize: 12,
                  fontFamily: Fonts.Montserrat_SemiBold,
                  letterSpacing: 1,
                  textShadowColor: Colors.Black,
                  textShadowRadius: 2,
                  paddingLeft: 10,
                }}>
                CARD LIST
              </Text>
            </View>
            <View style={{height: 25, width: 25}} />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            style={{width: '100%'}}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive">
          
          {this.state.cardList.map((v,i)=>
            <TouchableOpacity
            onPress={()=>this.selectedCard(v,i)}
            
            style={{width: '85%', marginVertical: 10}}>
              <View
                style={{
                  width: '100%',
                  minHeight: 120,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  backgroundColor: Colors.BlackOpacity(0.2),
                  borderRadius: 20,
                  paddingVertical: 0,
                  paddingHorizontal: 10,
                  marginBottom: 20,
                }}>
                <View
                  style={{width: '70%', alignSelf: 'center', paddingLeft: 0}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      paddingBottom: 10,
                    }}>
                    {v.number}
                  </Text>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                    {this.state.nameoncard}{' '}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>)}

            {/* {temp.map((data, i) => {
            return <Text>{data}</Text>
          }
          )} */}
          </ScrollView>
          <View>
            <TouchableOpacity
              onPress={()=>this.setState({payment_modals:true})}
              activeOpacity={0.7}
              style={{
                width: '100%',
                alignSelf: 'flex-end',
                backgroundColor: Colors.Black,
                marginBottom: 10,
                padding: 17,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: Colors.White,
                  textAlign: 'center',
                  fontFamily: Fonts.Montserrat_Medium,
                  fontSize: 11,
                  letterSpacing: 1,
                  textShadowColor: Colors.Black,
                  textShadowRadius: 1,
                }}>
                ADD ANOTHER CARD
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  //  {/* =======================Stripe card form provide UI=============================== */}

  // handleCardPayPress = async () => {
  //   try {
  //     this.setState({ loading: true, token: null });
  //     const token = await stripe.paymentRequestWithCardForm({
  //       // Only iOS support this options
  //       smsAutofillDisabled: true,
  //       requiredBillingAddressFields: 'full',
  //       // prefilledInformation: {
  //       //     billingAddress: {
  //       //         name: 'Gunilla Haugeh',
  //       //         line1: 'Canary Place',
  //       //         line2: '3',
  //       //         city: 'Macon',
  //       //         state: 'Georgia',
  //       //         country: 'US',
  //       //         postalCode: '31217',
  //       //         email: 'ghaugeh0@printfriendly.com',
  //       //     },
  //       // },
  //     });
  //     console.log('token', token);

  //     this.setState({  ading: false, token });
  //   } catch (error) {
  //     this.setState({ loading: false });
  //   }
  // };

  createPayment() {
    const {address, userData} = this.state;
    console.log('loading donne', address);
    const createddate = new Date();
    const payload = {
      name: userData.name,
      number: userData.number,
      email: userData.email,
      price: Math.ceil(this.props.TotalAmount),
      orderdetail: this.props.Cart,
      userdata: userData,
      createddate,
      isActive: true,
      isDeleted: false,
    };
    const data = {
      userData,
      name: userData.name,
      number: userData.number,
      email: userData.email,
      price: Math.ceil(this.props.TotalAmount),
      address,
    };
    // axios.post("https://us-central1-wonder-wish.cloudfunctions.net/charge", {
    // axios.post("http://localhost:5001/wonder-wish/us-central1/charge",{

    this.setState({loading: true});

    this.props.navigation.navigate('PaymentSummary', data);

    axios
      .post(BASE_URL + 'strip', {
        amount: Math.ceil(this.props.TotalAmount),
        currency: 'usd',
        token: this.state.token.tokenId,
      })
      .then(res => {
        if (res.data.status == 'paid') {
          AsyncStorage.removeItem('cart').then(cartArray => {
            this.props.ClearToCart();
            console.log('cart array', cartArray);

            Alert.alert(
              'Reciept',
              'payment success fully done',
              [
                {
                  text: 'Your Reciept',

                  onPress: () => Linking.openURL(res.data.receipt_url),
                },

                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
            axios.post(BASE_URL + 'email', {
              name: data.name,
              number: data.number,
              price: data.price,
              stripe: res.data.receipt_url,
            });

            payload.payemntResponse = res.data;
            payload.status = 'PENDING';
            const ref = Firebase.database()
              .ref()
              .child('Orders');

            ref
              .push(payload)
              .then(snapshot => {
                ref.child(snapshot.key).update({orderId: snapshot.key});
                this.setState({loading: false});

                this.props.navigation.navigate('PaymentSummary', data);
              })
              .catch(err => console.warn(err));
          });
        } else {
          Alert.alert('Error', 'Something wrong');
        }
        console.log('res from App', res);
      });
  }

  // ====================================================
  // For Credit Card Input Text Field
  cardText = num => {
    let {cardno} = this.state;
    let edited = String(num);
    console.log('Edited=>>>', edited.length);
    if (edited.length >= 15) {
      this.setState({
        cardno: edited
          .replace(/ /g, '')
          .replace(/(\d{4})(\d{4})(\d{4})(\d{1})/, '$1 $2 $3 $4'),
      });
      console.log('Edited 1313=>>>', edited);
    } else if (edited.length >= 11) {
      this.setState({
        cardno: edited.replace(/(\d{4})(\d{4})(\d{1})/, '$1 $2 $3'),
      });
      console.log('Edited 99=>>>', edited);
    } else if (edited.length >= 5) {
      this.setState({cardno: edited.replace(/(\d{4})(\d{1})/, '$1 $2')});
      console.log('Edited 55=>>>', edited);
    } else {
      this.setState({cardno: edited});
      console.log('Edited ELSE  =>>>', edited);
    }
  };

  // Month Year Split
  async validateMonthAndYear(mmyy) {
    let {expirymonthyear} = this.state;
    console.log('Validation', mmyy, expirymonthyear);
    var editedmmyy = '';
    if (mmyy.length === 2 && expirymonthyear.length === 1) {
      editedmmyy = mmyy + '/';
    } else if (mmyy.length === 2 && expirymonthyear.length === 3) {
      editedmmyy = mmyy.charAt(0);
    } else {
      editedmmyy = mmyy;
    }
    this.setState({expirymonthyear: editedmmyy});
  }

  // Handle Done Button
  handleDoneButton = async () => {
    let {nameoncard, cardno, expirymonthyear, cvv, checkbox} = this.state;
    if (nameoncard == '') {
      Alert.alert('Error', ' Please Enter Name On Card');
    } else if (cardno == '') {
      Alert.alert('Error', 'Please Enter Card Number');
    } else if (cardno.length < 19) {
      Alert.alert('Error', 'Please Enter 16 Digits Card Number');
    } else if (expirymonthyear == '') {
      Alert.alert(
        'Error',
        'Please Enter Month and Year in this formate MM/YY  e.g 02/21',
      );
    } else if (cvv == '') {
      Alert.alert('Error', 'Please Enter CVV');
    } else if (cvv.length < 3) {
      Alert.alert('Error', 'Please Enter 3 Digits CVV');
    } else {

      const monthYear = expirymonthyear.split('/');

      const params = {
        number: cardno,
        expMonth: parseInt(monthYear[0]),
        expYear: parseInt(monthYear[1]),
        cvc: cvv,
        name: nameoncard,
        // checkbox: checkbox,
      };
      console.log(params);
      const token = await stripe.createTokenWithCard(params);
      this.setState({token:token,payment_modals:false,showModelPayment:false})
      // alert(token.tokenId);    
      // alert(checkbox)
      if (checkbox == true && token.tokenId) {
        console.log(' GET DATA====>>>>>> checkbox', checkbox);
        AsyncStorage.getItem(CARDS).then(async res => {
          let temp = [];
          console.log(' GET DATA====>>>>>>', res);
          if (res != null) {
            console.log('ander==>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', res);
            temp = JSON.parse(res);
            temp.push(params);
            console.log('TEMP  ==>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', temp);
            AsyncStorage.setItem(CARDS, JSON.stringify(temp));
          } else {
          console.log(' GET DATA====>>>>>> else ke ander', res);
            await AsyncStorage.setItem(CARDS, JSON.stringify([params]));
          }
        });
      } else {
      }
    } //else
  };


  enterCardAndPay() {
    AsyncStorage.getItem(CARDS).then(async res => {
      console.log("res",res)
      if (res != null && JSON.parse(res).length) {
      this.setState({ showModelPayment: true ,cardList:JSON.parse(res)})
    
      } else {
    this.setState({payment_modals: true});
      }
    });





  }

  render() {
    console.log("props", this.props)
    const {Cart, TotalAmount} = this.props;
    const {loading, token, userData} = this.state;
    // console.log("USERDATA", userData)
    

    return (
      <View style={styles.container}>
        {this.ProceedToPaymentModel()}
        <Text style={styles.header}>Wonder wish</Text>
   
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Cart}
          style={{width: '100%', marginTop: 10}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            console.log(item, 'itemmmmm');
            return (
              <View
                style={{
                  width: '95%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.WhiteOpacity(0.8),
                  borderRadius: 25,
                  marginHorizontal: '2%',
                  paddingTop: 5,
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    width: '90%',
                    minHeight: 120,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <View style={{height: 95, width: 95, alignSelf: 'center'}}>
                    <Image
                      source={item.images[0]}
                      style={{
                        height: 95,
                        width: '100%',
                        resizeMode: 'cover',
                        borderRadius: 20,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      paddingLeft: 20,
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts.Montserrat_SemiBold,
                        color: Colors.Black,
                        fontSize: 20,
                      }}
                      numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Fonts.Montserrat_SemiBold,
                        color: Colors.Black,
                        fontSize: 18,
                        letterSpacing: 1,
                        textShadowColor: Colors.White,
                        textShadowRadius: 2,
                      }}
                      numberOfLines={1}>
                      Rs. {item.total}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Fonts.Montserrat_SemiBold,
                        color: Colors.Black,
                        fontSize: 18,
                        letterSpacing: 1,
                        textShadowColor: Colors.White,
                        textShadowRadius: 2,
                      }}
                      numberOfLines={2}>
                      {item.address.address}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
  
        {Cart.length
                    ? this.CartTotals(token, Cart.length, TotalAmount, loading)
                    : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
  },
  bottom: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
});
const mapStateToProps = state => {
  return {
    Cart: state.DatabaseReducer.cart,
    TotalAmount: state.DatabaseReducer.totalAmount,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ClearToCart: () => dispatch(DatabaseMiddleware.ClearToCart()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentMethod);
