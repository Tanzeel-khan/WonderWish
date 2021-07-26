/**
 * @format
 */
// "react-native-swiper": "^1.5.14",
// "react-native-payments": "./src/modules/react-native-payments",

import { AppRegistry } from 'react-native';
import App from './App';
// import App from './src/containers/PaymentSummary';
import { name as appName } from './app.json';
console.disableYellowBox = true

AppRegistry.registerComponent(appName, () => App);
