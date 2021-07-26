import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Dimensions,
    Image,
    Modal,
    Alert,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    FlatList,
    ScrollView, Platform,
    TextInput
} from 'react-native';
import { Fonts, Images, Colors } from '../../config';
import { connect, createSelectorHook } from "react-redux"
import AsyncStorage from '@react-native-community/async-storage'
import WishList from '../../components/Wishlist/index';
import DatabaseMiddleware from '../../store/middlewares/DatabaseMiddleware';
import { NavigationActions } from 'react-navigation';
import NavigationService from '../../config/NavigationService';
import { Icon, Radio } from 'native-base'
import { CartTotal, RoundedView } from "..";
const { height, width } = Dimensions.get('window');

const Input = ({ title, value, onChangeText, placeHolder, keyboardType, multiline, payment, onPressPayment }) => {
    return (
        <View style={{ paddingVertical: 8.5 }}>

            <View style={{ paddingBottom: 10, paddingLeft: 5 }}>
                <Text style={{ fontFamily: Fonts.Montserrat_SemiBold, fontSize: 15, color: Colors.White, textShadowColor: Colors.White, textShadowRadius: 2, }}>{title}</Text>
            </View>
            <View style={{ width: "100%", paddingVertical: Platform.OS == "ios" ? 15 : 0, paddingHorizontal: 20, borderRadius: 10, backgroundColor: Colors.WhiteOpacity(0.2) }}>
                <TextInput numberOfLines={multiline ? 4 : 1} selectionColor={Colors.White} multiline={multiline} keyboardType={keyboardType} value={value} placeholder={placeHolder} onChangeText={onChangeText} placeholderTextColor={Colors.WhiteOpacity(0.8)} style={{ flex: 1, color: Colors.White, fontFamily: Fonts.Montserrat_Medium, fontSize: 12, letterSpacing: 1, top: multiline ? Platform.OS=="ios"? 0:-20 : 0, }} />
            </View>

        </View>
    )
}

class Wishlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: [],
            totalAmount: 0,
            showModel: false,
            error: "",
            name: "",
            address: "",
            number: "",
            showModel2: false,
            saveAddress: [],
            selectRedioButton: 0,
            msg: ""
        }
    }
    saveAddress() {
        const { name, number, address } = this.state
        if (name == "" || number == "" || address == "") {
            this.setState({ error: "Please Fill All Field" })
        }
        else {
            this.setState({ error: "Loading..." })
            const data = {
                name,
                number,
                address,
            }
            console.log("DATA", data)
            AsyncStorage.getItem("address").then(res => {
                let temp = []
                console.log("data", res)
                if (res != null) {
                    // console.log("ander")
                    temp = JSON.parse(res)
                    temp.push(data)
                    this.addProductAddress(data)
                    AsyncStorage.setItem("address", JSON.stringify(temp))
                    this.setState({ showModel: false })

                }
                else {
                    this.addProductAddress(data)
                    AsyncStorage.setItem("address", JSON.stringify([data]))
                    this.setState({ showModel: false })


                }

            })
            // AsyncStorage.setItem("address", JSON.stringify(data))
            // this.props.navigation.navigate("PaymentMethod")
        }
    }

    addAddressModel() {
        const { showModel, error } = this.state
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModel}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
                    <View style={{ width: "85%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.setState({ showModel: false })} style={{ paddingHorizontal: 10 }}>
                            <Icon name="ios-arrow-back" style={{ color: Colors.White, fontSize: 20, padding: 5 }} />
                        </TouchableOpacity>
                        <View style={{ paddingVertical: 15, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ textAlign: "center", color: Colors.White, fontSize: 12, fontFamily: Fonts.Montserrat_SemiBold, letterSpacing: 1, textShadowColor: Colors.White, textShadowRadius: 2, paddingLeft: 10 }}>ENTER RECIEVER DETAILS</Text>
                        </View>
                        <View style={{ height: 25, width: 25 }} />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: "center", alignItems: "center", }} style={{ width: "100%" }} keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
                        <View style={{ minHeight: Platform.OS === "ios" ? height * .55 : height * .5, width: "85%", marginVertical: 10 }}>
                            <Input
                                value={this.state.name}
                                onChangeText={(e) => this.onchange("name", e)}
                                placeHolder={"Enter Name"}
                                title={"Name"}
                            />
                            <Input
                                value={this.state.number}
                                onChangeText={(e) => this.onchange("number", e)}
                                placeHolder={"Enter Number"}
                                keyboardType="phone-pad"
                                title={"Number"}
                            />
                            <Input
                                value={this.state.address}
                                onChangeText={(e) => this.onchange("address", e)}
                                placeHolder={"Enter Address"}
                                title={"Address"}
                                multiline
                            />

                            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                <Text style={{ textAlign: "center", color: Colors.Red, fontSize: 10, fontFamily: Fonts.Montserrat_SemiBold, letterSpacing: 2 }}>{error}</Text>
                            </View>
                            <View style={{ width: 300 }}>
                                <TouchableOpacity onPress={() => this.saveAddress()} activeOpacity={0.7} style={{ width: "100%", alignSelf: "flex-end", backgroundColor: Colors.White, marginBottom: 10, padding: 17, borderRadius: 5 }}>
                                    <Text style={{ color: Colors.Black, textAlign: "center", fontFamily: Fonts.Montserrat_Medium, fontSize: 10, letterSpacing: 1, textShadowColor: Colors.Black, textShadowRadius: 1 }}>ADD AND SELECT THIS ADDRESS</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </ScrollView>
                </View>


            </Modal>
        )
    }

    RadioButton(props) {
        return (
            <View style={[{
                height: 32,
                width: 32,
                borderRadius: 24,
                borderWidth: 4,
                borderColor: Colors.BlackOpacity(0.6),
                alignItems: 'center',
                justifyContent: 'center',
            }, props.style]}>
                {
                    props.selected ?
                        <View style={{
                            height: 16,
                            width: 16,
                            borderRadius: 12,
                            backgroundColor: Colors.BlackOpacity(0.6),
                        }} />
                        : null
                }
            </View>
        );
    }
    addressModel() {
        const { showModel2, saveAddress, selectRedioButton } = this.state
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModel2}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: Colors.White }}>
                    <View style={{ width: "85%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.setState({ showModel2: false })} style={{ paddingHorizontal: 10 }}>
                            <Icon name="ios-arrow-back" style={{ color: Colors.Black, fontSize: 20 }} />
                        </TouchableOpacity>
                        <View style={{ paddingVertical: 15, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ textAlign: "center", color: Colors.Black, fontSize: 12, fontFamily: Fonts.Montserrat_SemiBold, letterSpacing: 1, textShadowColor: Colors.Black, textShadowRadius: 2, paddingLeft: 10 }}>ADDRESSES</Text>
                        </View>
                        <View style={{ height: 25, width: 25 }} />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: "center", alignItems: "center", }} style={{ width: "100%" }} keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
                        <View style={{ minHeight: Platform.OS === "ios" ? height * .55 : height * .5, width: "85%", marginVertical: 10 }}>
                            {saveAddress.map((v, i) =>
                                <View style={{ width: "100%", minHeight: 120, flexDirection: "row", justifyContent: "space-between", backgroundColor: Colors.BlackOpacity(0.2), borderRadius: 20, alignSelf: "center", paddingVertical: 20, paddingHorizontal: 10, marginBottom: 20 }}>
                                    <View style={{ width: "70%", alignSelf: "center", paddingLeft: 20 }}>
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{v.address}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{v.name}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ selectRedioButton: i, showModel2: false })
                                        this.addProductAddress(v)
                                    }}
                                        style={{ paddingRight: 8 }}
                                    >
                                        {this.RadioButton({ selected: i == selectRedioButton ? true : false })}
                                    </TouchableOpacity>

                                </View>
                            )}

                        </View>

                    </ScrollView>
                    <View >
                        <TouchableOpacity onPress={() => { this.setState({ showModel: true, showModel2: false }) }} activeOpacity={0.7} style={{ width: "100%", alignSelf: "flex-end", backgroundColor: Colors.Black, marginBottom: 10, padding: 17, borderRadius: 5 }}>
                            <Text style={{ color: Colors.White, textAlign: "center", fontFamily: Fonts.Montserrat_Medium, fontSize: 10, letterSpacing: 1, textShadowColor: Colors.Black, textShadowRadius: 1 }}>ADD NEW ADDRESS</Text>
                        </TouchableOpacity>

                    </View>
                </View>


            </Modal>
        )
    }
    onSelectAddress = (item) => {
        const { saveAddress } = this.state
        // console.log("Selected address", item)
        saveAddress.length ?
            this.setState({ showModel2: true, setAddressItem: item }) :
            this.setState({ showModel: true, setAddressItem: item })

    }


    addProductAddress(address) {
        const { setAddressItem } = this.state
        console.log("add", setAddressItem)
        AsyncStorage.getItem("cart").then(cart => {
            let cartArray = JSON.parse(cart);
            cartArray.map((val, ind) => {
                if (val.id === setAddressItem.id) {
                    // val.quantity = val.quantity + 1
                    // val.total = (val.amount * val.quantity).toFixed(2)
                    val.address = address
                }
            })
            AsyncStorage.setItem("cart", JSON.stringify(cartArray)).then(() => {
                this.props.AddtoCart(cartArray)
                this.saveTotalAmount()

                AsyncStorage.getItem("address").then(res => {
                    if (res != null) {
                        this.setState({ saveAddress: JSON.parse(res) })
                    }
                })
            })
        })
    }


    saveTotalAmount = () => {
        let amount = 0
        const amounts = this.props.Cart.map((val, ind) => {
            return val.total
        })
        amounts.map((val, ind) => { amount = amount + Number(val) })

        const totalAmount = amount.toFixed(2);
        this.setState({ cart: this.props.Cart, totalAmount })
        if (totalAmount) {
            this.props.SaveTotalAmount(totalAmount)
        }
    }

    add = (item) => {
        console.log("add", item)
        AsyncStorage.getItem("cart").then(cart => {
            let cartArray = JSON.parse(cart);
            cartArray.map((val, ind) => {
                if (val.id === item.id) {
                    val.quantity = val.quantity + 1
                    val.total = (val.amount * val.quantity).toFixed(2)
                }
            })
            AsyncStorage.setItem("cart", JSON.stringify(cartArray)).then(() => {
                this.props.AddtoCart(cartArray)
                this.saveTotalAmount()
            })
        })
    }

    subtract = (item) => {
        let setStorage = true;
        AsyncStorage.getItem("cart").then(cart => {
            let cartArray = JSON.parse(cart);
            cartArray.map((val, ind) => {
                if (val.id === item.id) {
                    if (val.quantity > 1) {
                        val.quantity = val.quantity - 1
                        val.total = (val.amount * val.quantity).toFixed(2)
                    }
                    else {
                        setStorage = false
                    }
                }
            })

            if (setStorage) {
                AsyncStorage.setItem("cart", JSON.stringify(cartArray)).then(() => {
                    this.props.AddtoCart(cartArray)
                    this.saveTotalAmount()
                })
            }
        })
    }

    onDelete = (item) => {
        AsyncStorage.getItem("cart").then(cart => {
            let cartArray = JSON.parse(cart);
            cartArray.map((val, ind) => {
                if (val.id === item.id) {
                    cartArray.splice(ind, 1)
                }
            })
            AsyncStorage.setItem("cart", JSON.stringify(cartArray)).then(() => {
                this.props.AddtoCart(cartArray)
                if (cartArray.length) {
                    this.saveTotalAmount()
                }
                else {
                    this.setState({ cart: this.props.Cart })
                }
            })
        })
    }





    onProceed = () => {

        const { cart } = this.state

        // NavigationService.navigate("PaymentMethod")
        const check = cart.filter(v => v.address == null && v.address == undefined)
        if (!check.length) {
            NavigationService.navigate("PaymentMethod")
            this.setState({ msg: "" })
        }
        else {
            this.setState({ msg: "Please set address for your gift" })
        }


    }

    componentDidMount() {
        const { TotalAmount, Cart } = this.props
        AsyncStorage.getItem("address").then(res => {
            if (res != null) {
                this.setState({ saveAddress: JSON.parse(res) })
            }
        })
        this.setState({ cart: Cart, totalAmount: TotalAmount })
    }
    onchange(key, value) {
        this.setState({ [key]: value })
    }

    render() {
        const { cart, totalAmount, showModel, error, } = this.state
        const { navigate, goBack } = this.props.navigation
        // AsyncStorage.removeItem("cart").then((cartArray) => {console.log("aaaaaaaaaaaaa",cartArray)})
        console.log("cart data", cart)
        return (
            <View style={{ flex: 1, backgroundColor: Colors.Black }}>

                <StatusBar barStyle="light-content" backgroundColor={Colors.Black} />
                {/* Body */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <WishList
                        data={cart}
                        totalAmount={totalAmount}
                        onPressBack={() => goBack()}
                        onPressAdd={this.add}
                        onPressSubtract={this.subtract}
                        onPressDelete={this.onDelete}
                        onPressProceed={this.onProceed}
                        onSelectAddress={this.onSelectAddress}
                        msg={this.state.msg}

                    />
                </View>
                {this.addressModel()}
                {this.addAddressModel()}



            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Cart: state.DatabaseReducer.cart,
        TotalAmount: state.DatabaseReducer.totalAmount
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        AddtoCart: (payload) => dispatch(DatabaseMiddleware.AddToCart(payload)),
        SaveTotalAmount: (payload) => dispatch(DatabaseMiddleware.SaveTotalAmount(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);