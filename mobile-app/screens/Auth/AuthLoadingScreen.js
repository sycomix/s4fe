import React, {memo} from 'react';
import {ActivityIndicator, AsyncStorage, View} from 'react-native';

// Initialize Firebase

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('tokenData');
        console.log('TOKEN DATA', value)
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        // error reading value
    }
};

const AuthLoadingScreen = ({navigation}) => {
    getData()
        .then(res => {
            if (!res) {
                console.log('treba da ide negde')
                navigation.navigate('PhoneNumber');
            } else {
                console.log(res ? 'logged in' : 'false', res);
                navigation.navigate('UserProfile');
            }

        })
        .catch(err => {
            console.log('nema tokena', err);
            navigation.navigate('PhoneNumber');
        });

    return (
        <View>
            <ActivityIndicator size="large" />
        </View>
    );
};

export default memo(AuthLoadingScreen);
