import React from 'react';
import { Alert, Dimensions, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Block, Button, Input, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../../constants/';
import { HeaderHeight } from "../../constants/utils";
import ValidationComponent from 'react-native-form-validator';

const { height, width } = Dimensions.get('window');

export default class PhoneNumber extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            userData: '',
            password: '',
            repeatPassword: '',
            passwordDidntMatch: false
        }
        this.state.userData = this.props.navigation.getParam('userData')

    }

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    }

    handleNext() {
        const isValid =  this.validate({
            userData: {required: true},
            password: {required: true},
            repeatPassword: {required: true},
        });
        const passwordMatch = this.state.password === this.state.repeatPassword
        if (!passwordMatch) { this.setState({passwordDidntMatch: true})}
        if (isValid && passwordMatch) {
            this.goToScreen('SignupUserInfo')
        }
    }

    goToScreen(screen) {
        this.props.navigation.navigate(screen, {
            userData: this.state
        })
    }

    render() {
        console.log('this.state', this.state)
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
                                }}>
                                    Create your account password
                                </Text>
                            </Block>
                        </Block>


                        <Block flex={1} style={{ marginTop: height * 0.05 }} space="between">
                            <Block center>
                                <Input
                                    secureTextEntry={true}
                                    bgColor='transparent'
                                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                                    borderless
                                    color="white"
                                    placeholder="Enter your password"
                                    autoCapitalize="none"
                                    style={[styles.input]}
                                    onChangeText={text => this.handleChange('password', text)}

                                />
                            </Block>
                            <Block center style={{marginTop: 20}}>
                                <Input
                                    secureTextEntry={true}
                                    bgColor='transparent'
                                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                                    borderless
                                    color="white"
                                    placeholder="Repeat your password"
                                    autoCapitalize="none"
                                    style={[styles.input]}
                                    onChangeText={text => this.handleChange('repeatPassword', text)}
                                />
                            </Block>
                            <Block left>
                                {this.state.passwordDidntMatch ?
                                <Text style={{fontWeight: 'bold', color: materialTheme.COLORS.ERROR}}>
                                    Passwords didn't match.
                                </Text>
                                    : <Block />}

                                <Text style={{fontWeight: 'bold', color: materialTheme.COLORS.ERROR}}>
                                    {this.getErrorMessages()}
                                </Text>
                            </Block>
                            <Block flex center>
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
