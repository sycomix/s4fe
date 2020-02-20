import React from 'react';
import { Alert, Dimensions, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import { Block, Button, Input, Text, theme } from 'galio-framework';

import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../constants/';
import { HeaderHeight } from "../constants/utils";

const { height, width } = Dimensions.get('window');

export default class PrivacyPolicy extends React.Component {
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
                                    letterSpacing: 1,
                                    padding: 20
                                }}>
                                    Privacy
                                </Text>
                            </Block>
                            <Block row space="between">
                                <Text style={{
                                    color: 'white',
                                    fontSize: 20,
                                    padding: 20
                                }}>
                                    To learn more see our Tearms of use and Privacy Policy
                                </Text>

                            </Block>
                            <Block row space="between">
                                <Text
                                    onPress={() => {
                                        alert('test')
                                    }}
                                    style={{
                                        color: materialTheme.COLORS.BLUE_LIGHT,
                                        fontSize: 20,
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                    }}>Terms of use
                                </Text>
                            </Block>
                            <Block row space="between">
                                <Text style={{
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
                                    onPress={() => navigation.navigate('SignupPrivacy')}
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

