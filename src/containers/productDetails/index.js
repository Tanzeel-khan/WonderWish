import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Dimensions,
} from 'react-native';
import { Colors } from '../../config';
import { ProductDescription } from '../../components';
import { connect } from "react-redux"
import AsyncStorage from '@react-native-community/async-storage'
import DatabaseMiddleware from '../../store/middlewares/DatabaseMiddleware';



class ProductDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: "",
            cart: [],
            heart:[],
            itemAdded: false,
            liked:''
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
                this.setState({ cart: this.props.Cart, itemAdded: true })
            })
        }
    }
    addToHeart = (item) =>{
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
            //   AsyncStorage.setItem("cart", JSON.stringify(cart)).then(() => {
            //       this.props.AddtoCart(cart)
            //       this.setState({ cart: this.props.Cart, itemAdded: true })
            //   })
          }
    }

    componentDidMount() {
        // AsyncStorage.getItem("cart").then(cart => {
        //     if (cart) {
        //         this.setState({ cart: JSON.parse(cart) })
        //     }
        // })

        const navigation = this.props.navigation
        const newProduct = navigation.getParam('product');
        const itemExists = this.props.Cart.find((val, ind) => val.id === newProduct.id)

        if (itemExists) {
            this.setState({ itemAdded: true })
        }
        else {
            this.setState({ itemAdded: false })
        }
        this.setState({ cart: this.props.Cart, product: newProduct })
    }

    render() {
        const { product, itemAdded } = this.state
        const { navigate, goBack } = this.props.navigation
        return (
            <View style={{ flex: 1, backgroundColor: Colors.Black }}>

                <StatusBar barStyle="light-content" backgroundColor={Colors.Black} />

                {/* Body */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ProductDescription
                        product={product}
                        itemAdded={itemAdded}
                        onPressBack={() => { goBack() }}
                        onPressHeart={this.addToCart}
                        onPressMenu={() => { }}
                        onPressAdd={this.addToCart}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Cart: state.DatabaseReducer.cart
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        AddtoCart: (payload) => dispatch(DatabaseMiddleware.AddToCart(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);