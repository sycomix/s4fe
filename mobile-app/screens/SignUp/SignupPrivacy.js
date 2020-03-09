import React from 'react';
import {Alert, Dimensions, StyleSheet, KeyboardAvoidingView, Platform, AsyncStorage} from 'react-native';
import { Block, Button, Input, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../../constants/';
import { HeaderHeight } from "../../constants/utils";
import {API} from "../../utils/api";
import {Axios} from '../../utils/axios'

const { height, width } = Dimensions.get('window');

export default class SignupPrivacy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: '',
            firstName: '',
            lastName: ''
        }
        const userData =this.props.navigation.getParam('userData')
        if (userData) {
            this.state.userData = userData
        }

    }

    // Store data
    storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            // saving error
            console.log(e);
        }
    };

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    }

    goToScreen(screen, data) {
        this.props.navigation.navigate(screen, {
            userData: data
        })
    }

    saveUser() {
        const phoneVerification = this.state.userData.userData.userData.userData.phoneVerificationData.verificationCode
        const formData = {
            email: this.state.userData.userData.userData.userData.email,
            password1: this.state.userData.userData.userData.password,
            password2: this.state.userData.userData.userData.repeatPassword,
            first_name: this.state.userData.firstName,
            last_name: this.state.userData.lastName,
            phone_number: this.state.userData.userData.userData.userData.phoneVerificationData.phoneNumber,
            otp: phoneVerification
        }
        console.log('formData', formData)
        Axios.post(`${API.REGISTRATION}`, formData)
            .then(res => {
                console.log('res user added', res)
                this.storeData('tokenData', res.data.key)
                this.storeData('userData', JSON.stringify(res.data))
                this.goToScreen('UserProfile', res.data)
            })
            .catch(err => {
                console.log('err', err.response)
                const error = err.response
                if (error.data.otp) {
                    Alert.alert('Wrong verification code!', 'Make sure that you have entered the correct verification number.')
                } else {
                    Alert.alert('Warning!', 'Something went wrong!')
                }
            })
    }

    render() {
        const { navigation } = this.props;
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0.25, y: 1.1 }}
                locations={[0.2, 1]}
                colors={['#EBA721', '#EBA721']}
                style={[styles.signup, { flex: 1, paddingTop: theme.SIZES.BASE * 4 }]}>
                <Block flex middle>
                    <KeyboardAvoidingView behavior="padding" enabled>
                        <Block style={{ marginTop: height * 0.2 }}>
                            <Block row center space="between">
                                <Text style={{
                                    color: 'white',
                                    fontSize: 30,
                                    letterSpacing: 1,
                                    padding: 20
                                }}>
                                    By continuing, you agree to S4FE's Terms of Use and Privacy Policy
                                </Text>
                            </Block>
                            <Block row space="between">
                                <Text style={{
                                    color: 'white',
                                    fontSize: 20,
                                    padding: 20
                                }}>
                                    To learn more see our Terms of use and Privacy Policy
                                </Text>

                            </Block>
                            <Block row space="between">
                                <Text
                                    onPress={() => {
                                        navigation.navigate('TermsAndConditions')
                                    }}
                                    style={{
                                    color: materialTheme.COLORS.BLUE_LIGHT,
                                    fontSize: 20,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                }}>
                                    Terms of use
                                </Text>
                            </Block>
                            <Block row space="between">
                                <Text
                                    onPress={() => {
                                        navigation.navigate('PrivacyPolicy')
                                    }}
                                    style={{
                                    color: materialTheme.COLORS.BLUE_LIGHT,
                                    fontSize: 20,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                }}>
                                    Privacy Policy
                                </Text>
                            </Block>

                        </Block>


                        <Block flex={1} style={{ marginTop: height * 0.05 }}  space="between">
                            <Block  center style={styles.bottom}>
                                <Button
                                    shadowless
                                    style={styles.button}
                                    color={materialTheme.COLORS.WHITE}
                                    onPress={() => this.saveUser()}
                                >
                                    <Text>NEXT</Text>
                                </Button>

                            </Block>
                        </Block>
                    </KeyboardAvoidingView>
                </Block>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    signup: {
        marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    },
    social: {
        width: theme.SIZES.BASE * 3.5,
        height: theme.SIZES.BASE * 3.5,
        borderRadius: theme.SIZES.BASE * 1.75,
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 1
    },
    input: {
        width: width * 0.9,
        borderRadius: 0,
        borderBottomWidth: 1,
        borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
    },
    inputActive: {
        borderBottomColor: "white",
    },
    button: {
        position: 'absolute',
        bottom: 0
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    }
});
