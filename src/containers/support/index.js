import React from 'react'
import {
    View,
} from 'react-native';
import { Fonts, Images, Colors } from '../../config';
import { HeaderBar } from '../../components';



class Support extends React.Component {
    render() {
        const { goBack } = this.props.navigation
        return (
            <View>
                <HeaderBar onPressBack={() => { goBack() }} />
            </View>
        )
    }
}

export default Support;