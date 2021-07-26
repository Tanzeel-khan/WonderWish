//Navigations here
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { connect } from "react-redux"

import {
    Splash,
    Admin,
    Signup,
    Login,
    PaymentMethod,
    Products,
    ProductDetails,
    Cart,
    ReceiverDetails,
    Setting,
    Support,
    Complain,
    Help,
    AddAdress,
    MyOrder,
    PaymentSummary,
} from './containers';
import Contact from './containers/contact/index';
import Wishlist from './containers/Wishlist/index';
const RootStack = createStackNavigator(
    {
        Splash: { screen: Splash },
        Admin: { screen: Admin },
        Signup: { screen: Signup },
        Login: { screen: Login },
        Products: { screen: Products },
        ProductDetails: { screen: ProductDetails },
        PaymentMethod: { screen: PaymentMethod },
        Cart: { screen: Cart },
        ReceiverDetails: { screen: ReceiverDetails },
        Setting: { screen: Setting },
        Help: { screen: Help },
        Complain: { screen: Complain },
        Support: { screen: Support },
        AddAdress: { screen: AddAdress },
        MyOrder: { screen: MyOrder },
        Contact: { screen: Contact },
        Wish: { screen: Wishlist },
        PaymentSummary: { screen: PaymentSummary },



    },

    {
        initialRouteName: 'Splash',
        headerMode: 'none',
    }
)

export default createAppContainer(RootStack);