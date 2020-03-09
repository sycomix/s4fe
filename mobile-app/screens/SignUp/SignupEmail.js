import React from 'react';
import { Alert, Dimensions, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Block, Button, Input, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../../constants/';
import { HeaderHeight } from "../../constants/utils";
import ValidationComponent from 'react-native-form-validator';
import {API} from "../../utils/api";
import {Axios} from '../../utils/axios'

const { height, width } = Dimensions.get('window');

export default class PhoneNumber extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            phoneVerificationData: {}
        }
        this.inputRef = React.createRef();
        this.state.phoneVerificationData = this.props.navigation.getParam('phoneVerificationData')

    }

    handleChange = (value) => {
        this.setState({ email: value });
    }

    sendEmail() {
        const formData = {
            email: this.state.email
        }
        Axios.post(API.REGISTRATION, formData)
            .then(() => {
                console.log('success')
            })
            .catch(e => {
                console.log(e)
                console.log(e.response)
                const error = e.response.data
                if (error.email) {
                    Alert.alert('Error!', error.email[0])
                } else {
                    console.log('go to next screen')
                    this.goToScreen('SignupPassword')
                }
            })
    }

    handleNext() {
        const isValid =  this.validate({
            phoneNumber: {numbers: true, required: true},
            verificationCode: {numbers: true, required: true},
            email: {email: true, required: true},
        });
        if (isValid) {
            this.sendEmail()
        }
    }

    goToScreen(screen) {
        this.props.navigation.navigate(screen, {
            userData: this.state
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
                                    padding: 20
                                }}>
                                    What is your Email address?
                                </Text>
                            </Block>
                        </Block>


                        {/* Phone number */}
                        <Block flex={1} style={{ marginTop: height * 0.05 }} space="between">
                            <Block center>
                                <Input
                                    bgColor='transparent'
                                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                                    borderless
                                    color="white"
                                    placeholder="user@user.com"
                                    autoCapitalize="none"
                                    style={[styles.input]}
                                    onChangeText={text => this.handleChange(text)}
                                />
                            </Block>
                            <Block left>
                                <Text style={{fontWeight: 'bold', color: materialTheme.COLORS.ERROR}}>
                                    {this.getErrorMessages()}
                                </Text>
                            </Block>
                            <Block center flex>
                                <Button
                                    shadowless
                                    style={styles.button}
                                    color={materialTheme.COLORS.WHITE}
                                    onPress={() => this.handleNext()}
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
        // position: 'absolute',
        marginTop: 10
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    }
});
