import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Fonts, imagesPath, Colors, Images} from '../../config';
import {connect} from 'react-redux';
import DatabaseMiddleware from '../../store/middlewares/DatabaseMiddleware';
import {
  ReceiverDetailsComp,
  FormInput,
  FormButton,
  FormDropDown,
  DrawerRef,
} from '../../components';
import ImagePicker from 'react-native-image-crop-picker';
import {Icon} from 'native-base';
import Firebase from 'react-native-firebase';

var uuid = require('react-native-uuid');
const {height, width} = Dimensions.get('window');

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      description: '',
      amount: '',
      category: '',
      imagesPath: [],
      loader: false,
    };
  }

  componentDidMount() {}

  addProduct = () => {
    const {name, category, description, amount, imagesPath} = this.state;

    if (name && category && description && amount && imagesPath.length) {
      this.setState({loader: true});
      let images = [];
      imagesPath.map((image, ind) => {
        Firebase.storage()
          .ref()
          .child('Products')
          .child(category)
          .child(name)
          .child(new Date().getTime().toString())
          .put(image.path)
          .then(data => {
            images.push({uri: data.downloadURL});
            if (images.length === imagesPath.length) {
              let payload = {
                id: uuid.v4(),
                name,
                description,
                amount,
                images,
              };
              Firebase.database()
                .ref()
                .child('Products')
                .child(category)
                .push(payload)
                .then(() => {
                  this.setState({
                    name: '',
                    category: '',
                    description: '',
                    amount: '',
                    imagesPath: [],
                  });
                  this.setState({loader: false});
                })
                .catch(err => console.warn(err));
            }
          })
          .catch(err => console.warn(err.message));
      });
    }
  };
  imagePicker = () => {
    const {imagesPath} = this.state;

    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      images.map((image, ind) => {
        if (image.path) {
          imagesPath.push({
            path: image.path,
          });
        } else {
          imagesPath.push({
            path: image.sourceURL,
          });
        }
        this.setState({imagesPath});
      });
    });
  };

  deleteImage = ind => {
    const {imagesPath} = this.state;
    imagesPath.splice(ind, 1);
    this.setState({imagesPath});
  };

  render() {
    const {
      id,
      name,
      category,
      description,
      amount,
      imagesPath,
      loader,
    } = this.state;
    const {navigate, goBack} = this.props.navigation;

    return (
      <View style={{flex: 1, backgroundColor: Colors.Black}}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.Black} />

        {/* Body */}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              paddingVertical: 30,
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '60%',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.White,
                  fontSize: 20,
                  fontFamily: Fonts.Montserrat_SemiBold,
                  letterSpacing: 1,
                  textShadowColor: Colors.White,
                  textShadowRadius: 2,
                }}>
                Add Product
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => DrawerRef.openDrawer()}
                style={{}}>
                <Icon
                  name="menu"
                  style={{color: Colors.WhiteOpacity(0.6), fontSize: 25}}
                />
              </TouchableOpacity>
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
            <FormDropDown
              value={category}
              selectedValue={category}
              onValueChange={category => {
                this.setState({category});
              }}
            />

            <FormInput
              value={name}
              onChangeText={name => {
                this.setState({name});
              }}
              placeHolder={'Enter Product Name'}
              Admin
            />
            <FormInput
              value={amount}
              onChangeText={amount => {
                this.setState({amount});
              }}
              placeHolder={'Enter Product Amount'}
              keyboardType="numeric"
              Admin
            />
            <FormInput
              value={description}
              onChangeText={description => {
                this.setState({description});
              }}
              placeHolder={'Enter Product Description'}
              multiline
              Admin
            />
            <View
              style={{
                width: '85%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 10,
                alignItems: 'center',
                justifyContent: imagesPath.length
                  ? 'flex-start'
                  : 'space-between',
              }}>
              {imagesPath.length ? (
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {imagesPath.map((img, ind) => {
                    return (
                      <View
                        key={ind}
                        style={{
                          height: width * 0.17,
                          width: width * 0.17,
                          margin: 4,
                        }}>
                        <TouchableOpacity
                          onPress={() => this.deleteImage(ind)}
                          style={{
                            position: 'absolute',
                            zIndex: 10,
                            height: 20,
                            width: 20,
                            backgroundColor: Colors.BlackOpacity(0.3),
                            borderRadius: 23,
                            right: 3,
                            top: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Icon
                            name="close"
                            style={{color: Colors.White, fontSize: 16}}
                          />
                        </TouchableOpacity>
                        <Image
                          source={{uri: img.path}}
                          style={{height: '100%', width: '100%'}}
                        />
                      </View>
                    );
                  })}
                </View>
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    color: Colors.WhiteOpacity(0.8),
                    fontSize: 12,
                    fontFamily: Fonts.Montserrat_Regular,
                    letterSpacing: 1,
                    textShadowColor: Colors.White,
                    paddingRight: 10,
                  }}>
                  Add Images
                </Text>
              )}

              <TouchableOpacity
                onPress={this.imagePicker}
                style={{
                  marginTop: imagesPath.length ? 15 : 0,
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  backgroundColor: Colors.White,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="add" color={Colors.Black} style={{fontSize: 20}} />
              </TouchableOpacity>
            </View>
            {loader ? (
              <ActivityIndicator
                style={{padding: 20}}
                color={Colors.White}
                size="large"
              />
            ) : (
              <FormButton
                title={'Add'}
                onPressButton={this.addProduct}
                containerStyle={{height: 80}}
                admin
              />
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Admin);
