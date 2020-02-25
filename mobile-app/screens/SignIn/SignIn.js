import React from 'react';
import { StyleSheet, Dimensions, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import { Block, Button, Input, Text, theme } from 'galio-framework';

import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../../constants/';
import { HeaderHeight } from "../../constants/utils";
import Axios from "axios";
import {BASE_API} from "../../utils/api";

const { height, width } = Dimensions.get('window');

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: {},
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
    login () {
        this.setState({ dataLoading: true })
        console.log('login')
        const formData = {
            email: this.state.email,
            password: this.state.password
        }
        Axios.post(`${BASE_API}rest-auth/login/`, formData)
            .then((res) => {
                console.log('res', res)
                this.setState({ dataLoading: false })
                this.goToScreen('UserProfile', res.data)
            })
            .catch(err => {
                console.log(err.response)
                this.setState({ dataLoading: false })
                Alert.alert('Warning!', 'Something went wrong!')
            })
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
                        <Block style={{ marginTop: height * 0.3 }}>
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
                                }}>
                                    Enter your email and password
                                </Text>
                            </Block>
                        </Block>
                        <Block middle style={{ marginTop: height * 0.06, paddingVertical: theme.SIZES.BASE * 2.625}}>
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
                                    viewPass
                                    borderless
                                    color="white"
                                    iconColor="white"
                                    placeholder="Password"
                                    bgColor='transparent'
                                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                                    onChangeText={text => this.handleChange('password', text)}
                                    style={[styles.input]}
                                />
                                <Text
                                    color={theme.COLORS.WHITE}
                                    size={theme.SIZES.FONT * 0.95}
                                    onPress={() => Alert.alert('Not implemented')}
                                    style={{ alignSelf: 'flex-end', lineHeight: theme.SIZES.FONT * 2 }}
                                >
                                    Forgot your password?
                                </Text>
                            </Block>
                            <Block flex top style={{ marginTop: 20 }}>
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
