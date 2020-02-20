import React from 'react';
import { Alert, Dimensions, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import { Block, Button, Input, Text, theme } from 'galio-framework';

import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../../constants/';
import { HeaderHeight } from "../../constants/utils";

import * as Facebook from 'expo-facebook';

const { height, width } = Dimensions.get('window');
async function logIn() {
    try {
        await Facebook.initializeAsync('315972705787761');
        const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        } else {
            // type === 'cancel'
        }
    } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
    }
}
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
                                    fontSize: 35,
                                    fontWeight: 'bold',
                                    padding: 20
                                }}>
                                    Start Using S4FE
                                </Text>
                            </Block>
                            <Block row center space="between">
                                <Text style={{
                                    color: 'white',
                                    fontSize: 22,
                                }}>
                                    Enter  your phone number
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
                                    placeholder="Phone number"
                                    autoCapitalize="none"
                                    style={[styles.input, this.state.active.user ? styles.inputActive : null]}
                                    onChangeText={text => this.handleChange('user', text)}
                                    onBlur={() => this.toggleActive('user')}
                                    onFocus={() => this.toggleActive('user')}
                                />
                            </Block>
                            <Block flex top style={{ marginTop: 20 }}>
                                <Button
                                    shadowless
                                    style={{ height: 48 }}
                                    color={materialTheme.COLORS.WHITE}
                                    onPress={() => navigation.navigate('PhoneVerification')}
                                >
                                    <Text>START</Text>
                                </Button>
                                <Button color="transparent" shadowless onPress={() => navigation.navigate('SignIn')}>
                                    <Text center color={theme.COLORS.WHITE} size={theme.SIZES.FONT * 0.75}>
                                        Already have an account? Sign In
                                    </Text>
                                </Button>
                            </Block>
                        </Block>
                        <Block style={{ marginBottom: height * 0.05 }}>
                            <Block row center space="between" style={{ marginVertical: theme.SIZES.BASE * 1.875 }}>
                                <Block flex middle right>
                                    <Button
                                        round
                                        onlyIcon
                                        iconSize={theme.SIZES.BASE * 1.625}
                                        icon="facebook"
                                        iconFamily="font-awesome"
                                        onPress={() => logIn()}
                                        color={theme.COLORS.FACEBOOK}
                                        shadowless
                                        iconColor={theme.COLORS.WHITE}
                                        style={styles.social}
                                    />

                                </Block>
                                <Block flex middle center>
                                    <Button
                                        round
                                        onlyIcon
                                        iconSize={theme.SIZES.BASE * 1.625}
                                        icon="twitter"
                                        iconFamily="font-awesome"
                                        onPress={() => Alert.alert('Not implemented')}
                                        color={theme.COLORS.TWITTER}
                                        shadowless
                                        iconColor={theme.COLORS.WHITE}
                                        style={styles.social}
                                    />
                                </Block>
                                <Block flex middle left>
                                    <Button
                                        round
                                        onlyIcon
                                        iconSize={theme.SIZES.BASE * 1.625}
                                        icon="dribbble"
                                        iconFamily="font-awesome"
                                        onPress={() => Alert.alert('Not implemented')}
                                        color={theme.COLORS.DRIBBBLE}
                                        shadowless
                                        iconColor={theme.COLORS.WHITE}
                                        style={styles.social}
                                    />
                                </Block>
                            </Block>
                            <Text color='#fff' center size={theme.SIZES.FONT * 0.875}>
                                or be classical
                            </Text>
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
});
