import {Alert,AlertIOS,Platform} from 'react-native'

export const AlertUtil = (content) => {
    if(Platform.OS === 'android') {
        Alert.alert(
            '提示',
            content,
            [{text: 'OK', onPress: () => {}}]
        );
    }else if(Platform.OS === 'ios'){
        AlertIOS.alert(
            '提示',
            content,
            [{text: 'OK', onPress: () => {}}]
        );
    }	
}