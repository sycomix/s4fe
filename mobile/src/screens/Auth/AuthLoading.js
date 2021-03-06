import React from 'react'
import {
	ActivityIndicator,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'

class AuthLoadingScreen extends React.Component {
	componentDidMount() {
		this._bootstrapAsync()
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = async () => {
		const userToken = await AsyncStorage.getItem('token')
		console.log('token', userToken)

		// This will switch to the App screen or Auth screen and this loading
		// screen will be unmounted and thrown away.
		this.props.navigation.navigate(userToken ? 'App' : 'Auth')
	}

	// Render any loading content that you like here
	render() {
		return (
			<View>
				<ActivityIndicator />
			</View>
		)
	}
}

export default AuthLoadingScreen
