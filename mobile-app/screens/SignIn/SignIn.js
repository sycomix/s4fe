import React from 'react';
import { StyleSheet, Dimensions, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import { Block, Button, Input, Text, theme } from 'galio-framework';

import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../../constants/';
import { HeaderHeight } from "../../constants/utils";
import {Axios} from '../../utils/axios';
import {API} from "../../utils/api";
import ValidationComponent from 'react-native-form-validator';
import { AsyncStorage } from "react-native";

const { height, width } = Dimensions.get('window');

export default class SignIn extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            dataLoading: false
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
        console.log('data iz logina', data)
        this.props.navigation.navigate(screen, {
            userData: data
        })
    }

    // Phone verification
    login () {
        const isValid =  this.validate({
            email: {email: true, required: true},
            password: {required: true},
        });
        if (isValid) {
            this.setState({ dataLoading: true })
            const formData = {
                email: this.state.email,
                password: this.state.password
            }
            Axios.post(API.LOGIN, formData)
                .then((res) => {
                    console.log('res', res)
                    this.setState({ dataLoading: false })
                    this.storeData('tokenData', res.data.key)
                    this.storeData('userData', JSON.stringify(res.data))
                    this.goToScreen('UserProfile', res.data)
                })
                .catch(err => {
                    console.log(err.response)
                    const nonFieldErrors = err.response.data.non_field_errors
                    if (nonFieldErrors) {
                        Alert.alert('Warning', nonFieldErrors[0])
                    }
                    this.setState({ dataLoading: false })
                    // Alert.alert('Warning!', 'Something went wrong!')
                })
        }
    }

    render() {
        const { navigation } = this.props;
        const { email, password } = this.state;

        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0.25, y: 1.1 }}
                locations={[0.2, 1]}
                colors={['#EBA721', '#EBA721']}
                style={[styles.signin, {flex: 1, paddingTop: theme.SIZES.BASE * 4}]}>
                <Block flex middle>
                    <KeyboardAvoidingView behavior="padding" enabled>
                        <Block style={{ marginTop: height * 0.5 }}>
                            <Block row center space="between">
                                <Text style={{
                                    color: 'white',
                                    fontSize: 35,
                                    fontWeight: 'bold',
                                    padding: 20
                                }}>
                                   Sing In
                                </Text>
                            </Block>
                            <Block row center space="between">
                                <Text style={{
                                    color: 'white',
                                    fontSize: 22,
                                    paddingLeft: 20,
                                    paddingRight: 20
                                }}>
                                    Enter your email and password
                                </Text>
                            </Block>
                        </Block>
                        <Block  style={{ marginTop: height * 0.05}}>
                            <Block center>
                                <Input
                                    borderless
                                    color="white"
                                    placeholder="Email"
                                    type="email-address"
                                    autoCapitalize="none"
                                    bgColor='transparent'
                                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                                    onChangeText={text => this.handleChange('email', text)}
                                    style={[styles.input]}
                                />
                                <Input
                                    password
                                    borderless
                                    color="white"
                                    placeholder="Password"
                                    bgColor='transparent'
                                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                                    onChangeText={text => this.handleChange('password', text)}
                                    style={[styles.input]}
                                />
                                <Text
                                    color={theme.COLORS.WHITE}
                                    size={theme.SIZES.FONT * 0.95}
                                    onPress={() => navigation.navigate('ForgotPassword')}
                                    style={{ alignSelf: 'flex-end', lineHeight: theme.SIZES.FONT * 2 }}
                                >
                                    Forgot your password?
                                </Text>
                            </Block>
                            <Block left>
                                <Text style={{fontWeight: 'bold', color: materialTheme.COLORS.ERROR}}>
                                    {this.getErrorMessages()}
                                </Text>
                            </Block>
                            <Block flex center style={{ marginTop: 20 }}>
                                <Button
                                    shadowless
                                    color={materialTheme.COLORS.WHITE}
                                    style={{ height: 48 }}
                                    onPress={() => this.login()}
                                >
                                    <Text>SIGN IN</Text>
                                </Button>
                                <Button color="transparent" shadowless onPress={() => navigation.navigate('PhoneNumber')}>
                                    <Text
                                        center
                                        color={theme.COLORS.WHITE}
                                        size={theme.SIZES.FONT * 0.95}
                                        style={{marginTop:20}}
                                    >
                                        {"Don't have an account? Sign Up"}
                                    </Text>
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
    signin: {
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
});
