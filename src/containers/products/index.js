import React, { Component } from 'react';
import {
    View,
    StatusBar,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput,
    Image,
} from 'react-native';
import { Fonts, Images, Colors } from '../../config';
import { Header, ProductList } from '../../components';
import { connect } from "react-redux"
import AsyncStorage from '@react-native-community/async-storage'
import DrawerRef from "../../components/DrawerRef";
import DatabaseMiddleware from '../../store/middlewares/DatabaseMiddleware';
const { height, width } = Dimensions.get('window');
import Firebase from 'react-native-firebase';




class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            currentItem: "",
            cart: [],
            indexes: [],
            itemAdded: false,
            category: "general",
            flag: false
        }

        this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)
        this.handleViewableItemsChangedHor = this.handleViewableItemsChangedHor.bind(this)
        this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 90 }
        this.viewabilityConfigHor = { viewAreaCoveragePercentThreshold: 90 }
    }

    scroll;

    handleViewableItemsChanged = ({ viewableItems }) => {
        const { cart, indexes } = this.state
        if (viewableItems[0]) {
            if (viewableItems[0].item) {
                const itemExists = cart.find((val, ind) => val.id === viewableItems[0].item.id)
                if (itemExists) {
                    this.setState({ itemAdded: true })
                }
                else {
                    this.setState({ itemAdded: false })
                }
                this.setState({ currentItem: viewableItems[0].item, currentPageIndex: viewableItems[0].index })
                if (!indexes[viewableItems[0].index]) {
                    indexes[viewableItems[0].index] = 0
                }
                this.props.CurrentProduct(viewableItems[0].item)
            }
        }
    }
    handleViewableItemsChangedHor = ({ viewableItems }) => {
        if (viewableItems[0]) {
            const { indexes, currentPageIndex } = this.state
            indexes[currentPageIndex] = viewableItems[0].index
            this.setState({
                indexes
            });
        }
    }

    addToCart = (item) => {
        const { cart } = this.state
        const itemExists = cart.find((val, ind) => val.id === item.id)
        if (itemExists) {
            this.setState({ itemAdded: true })
        }
        else {
            item.quantity = 1;
            item.selected = true
            item.total = item.amount
            cart.push(item)
            AsyncStorage.setItem("cart", JSON.stringify(cart)).then(() => {
                this.props.AddtoCart(cart)
                this.saveTotalAmount()
                this.setState({ itemAdded: true })
            })
        }
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

    getProducts = (category) => {
        {}
        this.setState({ products: [], indexes: [], currentItem: "", itemAdded: false, category }, () => {
            this.props.ClearProducts()
            this.props.GetProducts(category)
        })
    }

    lowPrice = () => {
        const { Products } = this.props;
        this.scroll.scrollToIndex({ animated: true, index: 0 });
        Products.sort((a, b) => a.amount - b.amount)
        this.props.CurrentProduct(Products[0])
        this.props.LowPrice(Products)

    }

    highPrice = () => {
        const { Products } = this.props;
        this.scroll.scrollToIndex({ animated: true, index: 0 });
        Products.sort((a, b) => b.amount - a.amount)
        this.props.CurrentProduct(Products[0])
        this.props.HighPrice(Products)


    }

    checkCart = () => {
        const itemExists = this.props.Cart.find((val, ind) => val.id === this.props.CurrentItem.id)
        if (itemExists) this.setState({ itemAdded: true })
        else this.setState({ itemAdded: false })
        this.setState({ cart: this.props.Cart })
    }

    componentDidMount() {
        const { navigation } = this.props;
        const { Products } = this.props;

        this.props.GetProducts("general")
        AsyncStorage.getItem("cart").then(cart => {
            if (cart) {
                this.props.AddtoCart(JSON.parse(cart))
                this.saveTotalAmount()
            }
            else {
                const cartArray = [];
                AsyncStorage.setItem("cart", JSON.stringify(cartArray))
            }
        })

        navigation.addListener('willFocus', (data) => {
            this.checkCart()
            this.saveTotalAmount()
        });
        this.props.GetUserData(Firebase.auth().currentUser.phoneNumber)

        this.setState({ products: Products })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.products.length !== this.props.Products.length) {
            const { Products } = this.props
            this.setState({ products: Products })
        }
        if (prevState.currentItem.id !== this.props.CurrentItem.id) {

            this.setState({ currentItem: this.props.CurrentItem }, () => {
                this.checkCart()
            })
        }
    }

    render() {
        const { products, currentItem, cart, heart,indexes, currentPageIndex, itemAdded, category, flag } = this.state
        const { navigate } = this.props.navigation
        return (
            <View style={{ flex: 1, backgroundColor: Colors.Black }}>

                <StatusBar barStyle="light-content" backgroundColor={Colors.Black} />

                {/* Body */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ProductList
                        data={products}
                        scrollview={ref => this.scroll = ref}
                        onViewableItemsChanged={this.handleViewableItemsChanged}
                        onViewableItemsChangedHor={this.handleViewableItemsChangedHor}
                        viewabilityConfig={this.viewabilityConfig}
                        viewabilityConfigHor={this.viewabilityConfigHor}
                        currentItem={currentItem}
                        swiperIndex={indexes[currentPageIndex]}
                        swiperRef={swiper => this.swiper = swiper}
                        cart={cart}
                        itemAdded={itemAdded}
                        category={category}
                        visibility={flag}
                        onPressMenu={() => { DrawerRef.openDrawer() }}
                        onPressLeftMenu={() => { this.setState({ flag: !flag }) }}
                        onPressCart={() => { navigate("Cart") }}
                        onPressCategory={(category) => { this.getProducts(category) }}
                        onPressLow={this.lowPrice}
                        onPressHigh={this.highPrice}
                        onPressDetails={(product) => { navigate("ProductDetails", { product }) }}
                        onPressSend={() => { navigate("ReceiverDetails") }}
                        onPressAdd={this.addToCart}
                        userImage={this.props.userData.image}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Products: state.DatabaseReducer.products,
        Cart: state.DatabaseReducer.cart,
        CurrentItem: state.DatabaseReducer.currentProduct,
        userData:state.DatabaseReducer.userData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        AddtoCart: (payload) => dispatch(DatabaseMiddleware.AddToCart(payload)),
        CurrentProduct: (payload) => dispatch(DatabaseMiddleware.CurrentProduct(payload)),
        GetProducts: (payload) => dispatch(DatabaseMiddleware.GetProducts(payload)),
        ClearProducts: () => dispatch(DatabaseMiddleware.ClearProducts()),
        LowPrice: (payload) => dispatch(DatabaseMiddleware.LowPrice(payload)),
        HighPrice: (payload) => dispatch(DatabaseMiddleware.HighPrice(payload)),
        SaveTotalAmount: (payload) => dispatch(DatabaseMiddleware.SaveTotalAmount(payload)),
        GetUserData:(number)=>  dispatch(DatabaseMiddleware.GetUserData(number))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
