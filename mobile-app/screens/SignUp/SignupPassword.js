import React from 'react';
import { Alert, Dimensions, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import { Block, Button, Input, Text, theme } from 'galio-framework';

import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../../constants/';
import { HeaderHeight } from "../../constants/utils";

const { height, width } = Dimensions.get('window');

export default class PhoneNumber extends React.Component {
    state = {
        user: '-',
        email: '-',
        password: '-',
        active: {
            user: false,
            email: false,
            password: false,
        }
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    }

    toggleActive = (name) => {
        const { active } = this.state;
        active[name] = !active[name];

        this.setState({ active });
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
                                }}>
                                    Create your account password
                                </Text>
                            </Block>
                        </Block>


                        {/* Phone number */}
                        <Block flex={1} style={{ marginTop: height * 0.05 }} center space="between">
                            <Block center>
                                <Input
                                    type='number-pad'
                                    bgColor='transparent'
                                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                                    borderless
                                    color="white"
                                    placeholder="Enter your password"
                                    autoCapitalize="none"
                                    style={[styles.input, this.state.active.user ? styles.inputActive : null]}
                                    onChangeText={text => this.handleChange('user', text)}
                                    onBlur={() => this.toggleActive('user')}
                                    onFocus={() => this.toggleActive('user')}
                                />
                            </Block>
                            <Block center style={{marginTop: 20}}>
                                <Input
                                    type='number-pad'
                                    bgColor='transparent'
                                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                                    borderless
                                    color="white"
                                    placeholder="Repeat your password"
                                    autoCapitalize="none"
                                    style={[styles.input, this.state.active.user ? styles.inputActive : null]}
                                    onChangeText={text => this.handleChange('user', text)}
                                    onBlur={() => this.toggleActive('user')}
                                    onFocus={() => this.toggleActive('user')}
                                />
                            </Block>
                            <Block flex bottom style={styles.bottom}>
                                <Button
                                    shadowless
                                    style={styles.button}
                                    color={materialTheme.COLORS.WHITE}
                                    onPress={() => navigation.navigate('SignupUserInfo')}
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
