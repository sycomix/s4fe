import React from 'react';
import { StyleSheet, Dimensions, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import { Block, Button, Input, Text, theme } from 'galio-framework';

import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../../constants/';
import { HeaderHeight } from "../../constants/utils";
import {Axios} from '../../utils/axios';
import {API} from "../../utils/api";
import ValidationComponent from 'react-native-form-validator';

const { height, width } = Dimensions.get('window');

export default class SignIn extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: 'dj.shone@gmail.com',
            dataLoading: false
        }
    }

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
    sendEmail () {
        const isValid =  this.validate({
            email: {email: true, required: true},
        });
        if (isValid) {
            this.setState({ dataLoading: true })
            console.log('login')
            const formData = {
                email: this.state.email,
            }
            Axios.post(`${API.FORGOT_PASSWORD}`, formData)
                .then((res) => {
                    console.log('res', res)
                    this.setState({ dataLoading: false })
                    Alert.alert('Done', 'Password reset e-mail has been sent!')
                    this.goToScreen('SignIn')
                })
                .catch(err => {
                    console.log(err.response)
                    const nonExistingEmail = err.response.data.email
                    if (nonExistingEmail) {
                        Alert.alert('Warning!', nonExistingEmail.email[0])
                    } else {
                        Alert.alert('Warning!', 'Something went wrong!')
                    }
                    this.setState({ dataLoading: false })
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
                        <Block style={{ marginTop: height * 0.20 }}>
                            <Block row center space="between">
                                <Text style={{
                                    color: 'white',
                                    fontSize: 35,
                                    fontWeight: 'bold',
                                    padding: 20
                                }}>
                                    Forgot Password
                                </Text>
                            </Block>
                            <Block row center space="between">
                                <Text style={{
                                    color: 'white',
                                    fontSize: 20,
                                }}>
                                    Enter your email and we will send you the instructions how to reset your password.
                                </Text>
                            </Block>
                        </Block>
                        <Block  style={{ marginTop: height * 0.03, paddingVertical: theme.SIZES.BASE * 2.625}}>
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
                            </Block>
                            <Block left>
                                <Text style={{fontWeight: 'bold', color: materialTheme.COLORS.ERROR}}>
                                    {this.getErrorMessages()}
                                </Text>
                            </Block>
                            <Block flex top style={{ marginTop: 20 }}>
                                <Button
                                    shadowless
                                    color={materialTheme.COLORS.WHITE}
                                    style={{ height: 48 }}
                                    onPress={() => this.sendEmail()}
                                >
                                    <Text>SEND</Text>
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
