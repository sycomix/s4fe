import React, {Component, Fragment} from 'react'
import {
	StyleSheet,
	View,
	StatusBar,
	ImageBackground,
	Text,
	Image,
	TouchableOpacity,
	SafeAreaView,
} from 'react-native'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import LottieView from 'lottie-react-native'
import Colors from '../../constants/Colors'
import {Icon} from 'native-base'
import NfcManager, {NdefParser, NfcTech} from 'react-native-nfc-manager'

const hash = require('object-hash')
const generateNFCKey = () => {
	const generatedHash = hash(Math.round(Math.random() * 10000000000))
	console.log('generated hash', generatedHash)
	return generatedHash
}

function strToBytes(str) {
	let result = []
	for (let i = 0; i < str.length; i++) {
		result.push(str.charCodeAt(i))
	}
	return result
}

function buildTextPayload(valueToWrite) {
	const textBytes = strToBytes(valueToWrite)
	// in this example. we always use `en`
	const headerBytes = [0xd1, 0x01, textBytes.length + 3, 0x54, 0x02, 0x65, 0x6e]
	return [...headerBytes, ...textBytes]
}

export default class ScanNFC extends Component {
	constructor(props) {
		super(props)
		this.state = {
			supported: false,
			enabled: false,
			isTestRunning: false,
			text: 'hi, nfc!',
			parsedText: null,
			tag: null,
		}
	}

	componentDidMount() {
		NfcManager.isSupported().then(supported => {
			this.setState({supported})
			if (supported) {
				this._startNfc()
			}
		})
	}

	goToScreen(nfcKey) {
		this.props.navigation.navigate('AddItem', {
			nfcKey,
		})
	}

	render() {
		const {navigation} = this.props
		let {supported, enabled, tag, text, parsedText, isTestRunning} = this.state
		return (
			<Fragment>
				<StatusBar barStyle="dark-content" backgroundColor={Colors.PRIMARY} />
				<SafeAreaView style={styles.container}>
					<View style={styles.root}>
						{/* Back button */}
						<View
							style={{
								backgroundColor: Colors.PRIMARY,
								paddingTop: 10,
								paddingLeft: 20,
							}}>
							<Icon
								name="arrow-back"
								style={{color: 'white'}}
								onPress={() => {
									navigation.pop()
								}}
							/>
						</View>
						<View style={styles.backgroundStack}>
							<View style={styles.background}>
								<ImageBackground
									style={styles.rect2}
									imageStyle={styles.rect2_imageStyle}
									source={require('../../assets/images/Gradient_EsLX0zX.png')}>
									<View style={styles.icon10Column}>
										<Text style={styles.scanS4FeTarcker}>
											SCAN S4FE TRACKER
										</Text>
										<View style={styles.animation}>
											<LottieView
												source={require('../../assets/animations/nfc-animation.json')}
												autoPlay
												loop
											/>
										</View>
										<Text style={styles.text}>
											Place your phone close to the S4FE sticker
										</Text>

										{/*	Skip scanning */}
										<TouchableOpacity onPress={() => this.goToScreen('none')}>
											<Text style={styles.skipText}>Add without NFC</Text>
										</TouchableOpacity>
									</View>
								</ImageBackground>
							</View>
						</View>
					</View>
				</SafeAreaView>
			</Fragment>
		)
	}

	_writeToNFCTag = NFCKey => {
		const cleanUp = () => {
			this.setState({isTestRunning: false})
			NfcManager.cancelTechnologyRequest().catch(() => 0)
			// NfcManager.unregisterTagEvent()
		}

		const parseText = tag => {
			if (tag.ndefMessage) {
				return NdefParser.parseText(tag.ndefMessage[0])
			}
			return null
		}

		this.setState({isTestRunning: true})
		NfcManager.registerTagEvent(tag => console.log(tag))
			.then(() => NfcManager.requestTechnology(NfcTech.Ndef))
			.then(() => NfcManager.getTag())
			.then(tag => {
				console.log(tag)
			})
			.then(() => NfcManager.getNdefMessage())
			.then(tag => {
				let parsedText = parseText(tag)
				this.setState({tag, parsedText})
			})
			.then(() => NfcManager.writeNdefMessage(buildTextPayload(NFCKey)))
			.then(() => {
				console.log('Tag se upisao, ovo je hash: ', NFCKey)
				this.goToScreen(NFCKey)
				cleanUp()
			})
			.catch(err => {
				console.warn(err)
				cleanUp()
			})
	}

	_cancelTest = () => {
		NfcManager.cancelTechnologyRequest().catch(err => console.warn(err))
	}

	_startNfc = () => {
		NfcManager.start()
			.then(() => NfcManager.isEnabled())
			.then(enabled => {
				if (enabled) {
					this._writeToNFCTag(generateNFCKey())
				}
				this.setState({enabled})
			})
			.catch(err => {
				console.warn(err)
				this.setState({enabled: false})
			})
	}

	_clearMessages = () => {
		this.setState({tag: null, parsedText: null})
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: 'rgb(255,255,255)',
	},
	background: {
		flex: 1,
	},
	backgroundStack: {
		flex: 1,
	},
	rect2: {
		flex: 1,
	},
	rect2_imageStyle: {},
	icon10: {
		color: 'rgba(252,252,252,1)',
		fontSize: 30,
		height: 30,
		width: 30,
	},
	progressBar: {
		height: 40,
		flexDirection: 'row',
		marginLeft: 44,
		marginRight: 10,
	},
	icon2: {
		color: 'rgba(244,244,244,1)',
		fontSize: 38,
		width: 33,
		height: 40,
	},
	rect4: {
		width: 50,
		height: 7,
		backgroundColor: 'rgba(255,255,255,1)',
		borderRadius: 40,
		marginLeft: 9,
		marginTop: 16,
	},
	icon3: {
		color: 'rgba(219,219,219,0.5)',
		fontSize: 35,
		width: 40,
		height: 36,
		marginLeft: 7,
		marginTop: 4,
	},
	rect5: {
		width: 50,
		height: 7,
		backgroundColor: 'rgba(219,219,219,1)',
		opacity: 0.5,
		borderRadius: 40,
		marginLeft: 2,
		marginTop: 16,
	},
	icon2Row: {
		height: 40,
		flexDirection: 'row',
	},
	icon2RowFiller: {
		flex: 1,
		flexDirection: 'row',
	},
	icon4: {
		color: 'rgba(219,219,219,0.5)',
		fontSize: 38,
		width: 34,
		height: 40,
		opacity: 0.75,
	},
	scanS4FeTarcker: {
		color: 'rgba(255,255,255,1)',
		fontSize: 24,
		marginTop: 36,
		textAlign: 'center',
	},
	image: {
		width: 200,
		height: 200,
		backgroundColor: 'rgba(237,237,237,1)',
		marginTop: 34,
		marginLeft: 69,
	},
	icon10Column: {
		marginTop: 23,
	},
	icon10ColumnFiller: {
		flex: 1,
	},
	button: {
		height: 59,
		backgroundColor: 'rgba(247,247,247,0)',
		borderRadius: 5,
		borderColor: 'rgba(255,255,255,1)',
		borderWidth: 1,
		marginLeft: 50,
		marginRight: 50,
	},
	cancel: {
		color: 'rgba(255,255,255,1)',
		fontSize: 18,
		alignSelf: 'center',
		marginTop: 15,
	},
	container: {flex: 1},
	animation: {
		height: 300,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: 'white',
		fontSize: 20,
		textAlign: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 30,
	},
	skipText: {
		color: '#e9e9e9',
		marginTop: 10,
		fontSize: 18,
		textAlign: 'center',
	},
})
