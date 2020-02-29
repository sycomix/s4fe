import React from 'react';
import { Alert, Dimensions, StyleSheet, KeyboardAvoidingView, Platform, Image} from 'react-native';

import { Block, Button, Input, Text, theme } from 'galio-framework';

import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../../constants/';
import { HeaderHeight } from "../../constants/utils"
import {API} from '../../utils/api'
import { Dropdown } from 'react-native-material-dropdown';
import * as Facebook from 'expo-facebook';
import ValidationComponent from 'react-native-form-validator';
import ErrorMessage from "../../components/ErrorMessage";
import { Axios } from '../../utils/axios'

const countryTelData = require('country-telephone-data')
const { height, width } = Dimensions.get('window');
import RNPickerSelect from 'react-native-picker-select';


async function logIn() {
    try {
        await Facebook.initializeAsync('151707949234327');
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
            const facebookID = await response.json()

            // Send ID to the API
            const formData = {
                access_token: facebookID.id
            }
            Axios.post(API.FACEBOOK, formData)
                .then(() => {
                    console.log('sent to api')
                })
                .catch(e => {
                    console.log('err', e.response)
                })
            console.log('data', facebookID)
        } else {
            // type === 'cancel'
        }
    } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
    }
}



export default class PhoneNumber extends ValidationComponent {
    constructor(props){
        super(props)
        this.state = {
            phoneNumber: null,
            dataLoading: false,
            countriesList: [],
            selectedCountryCode: null,
            selectedCountryLabel: null,
        }

        this.picker = React.createRef() // make the ref
    }


    componentDidMount() {
        const countries = countryTelData.allCountries
        let result = []
        countries.forEach(country => {
            result.push({
                value: country.dialCode,
                label: `${country.name} +${country.dialCode}`,
                // name: country.name
            })
        })
        this.setState({countriesList: result})
    }

    // Handle selection of the Country
    handleCountrySelect = (value) => {
        console.log('value', value)
        this.setState({
            selectedCountryCode: value
        })
        console.log('selectedCountryCode', this.state.selectedCountryCode)

    }

    handleChange = (value) => {
        this.setState({phoneNumber: value });
    }

    renderPickerItem() {
      const data = this.state.countriesList
        let result = []
        for (let key in data) {
            result.push(<Picker.Item label={data[key].label} value={data[key].value} key={data[key].value} />)
        }
        return result
    }
    // Phone verification
    verifyPhone () {
      const isValid =  this.validate({
            phoneNumber: {numbers: true, required: true},
        });
      if (isValid) {
          this.setState({ dataLoading: true })
          const formData = {
              phone_number: this.state.selectedCountryCode+ this.state.phoneNumber
          }
          Axios.post(`${API.GET_OTP}`, formData)
              .then(res => {
                  console.log(res)
                  this.setState({ dataLoading: false })
                  this.props.navigation.navigate('PhoneVerification', {
                      phoneNumber: this.state.selectedCountryCode + this.state.phoneNumber
                  });
              })
              .catch(err => {
                  console.log(err.response)
                  this.setState({ dataLoading: false })
                  let tryAgain = null
                  if (err.response) {
                      tryAgain = err.response.data.error
                  }
                  Alert.alert('Warning!', tryAgain)
              })
      }
    }

    render() {
        const { navigation } = this.props;
        const placeholder = {
            color: 'white',
            paddingTop: 10,
            paddingBottom: 15,
            paddingLeft: 15,
        };

        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0.25, y: 1.1 }}
                locations={[0.2, 1]}
                colors={['#EBA721', '#EBA721']}
                style={[styles.signup, { flex: 1, paddingTop: theme.SIZES.BASE * 4 }]}>
                <Block flex middle>
                    <Block style={{ marginTop: 40 }}>
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
                    <Block flex={1} style={{ marginTop: height * 0.05 }} space="between">
                        <Block>
                            <Block style={[styles.countryInput]}>
                                {/*<Picker*/}
                                {/*    selectedValue={this.state.selectedCountryCode}*/}
                                {/*    style={[styles.countryInput]}*/}
                                {/*    onValueChange={this.handleCountrySelect}>*/}
                                {/*    {this.renderPickerItem()}*/}
                                {/*</Picker>*/}

                                <RNPickerSelect
                                    style={pickerSelectStyles}
                                    onValueChange={this.handleCountrySelect}
                                    items={this.state.countriesList}
                                >
                                    {/*{this.state.selectedCountryCode ?*/}
                                    {/*    <Text style={placeholder}>*/}
                                    {/*        {this.state.selectedCountryCode}*/}
                                    {/*    </Text> :*/}
                                    {/*    <Text/>*/}
                                    {/*}*/}
                                </RNPickerSelect>



                            </Block>
                        </Block>
                        <Block>
                            <Input
                                // type='number-pad'
                                bgColor='transparent'
                                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                                borderless
                                color="white"
                                placeholder="Phone number"
                                autoCapitalize="none"
                                style={[styles.phoneInput]}
                                onChangeText={text => this.handleChange(text)}
                            />
                        </Block>
                        <Block left>
                            <Text style={{fontWeight: 'bold', color: materialTheme.COLORS.ERROR}}>
                                {this.getErrorMessages()}
                            </Text>
                        </Block>

                        <Block flex top style={{ marginTop: 20 }}>
                            <Button
                                disabled={this.dataLoading}
                                shadowless
                                style={{ height: 48 }}
                                color={this.dataLoading ? materialTheme.COLORS.DISABLED : materialTheme.COLORS.WHITE}
                                onPress={() => this.verifyPhone()}
                            >
                                <Text>START</Text>
                            </Button>
                            <Button color="transparent" shadowless onPress={() => navigation.navigate('SignIn')}>
                                <Text center color={theme.COLORS.WHITE} size={theme.SIZES.FONT * 0.95}>
                                    Already have an account? Sign In
                                </Text>
                            </Button>
                        </Block>
                    </Block>
                    <Block style={{ marginBottom: height * 0.03 }}>
                        <Text color='#fff' center size={theme.SIZES.FONT * 0.95}>
                            or use social networks
                        </Text>
                        <Block row center space="between" style={{ marginVertical: theme.SIZES.BASE * 1.875 }}>
                            <Block flex middle center>
                                <Button
                                    round
                                    onPress={() => logIn()}
                                    color={theme.COLORS.FACEBOOK}
                                    shadowless
                                    iconColor={theme.COLORS.WHITE}
                                    style={styles.social}
                                >
                                    <Text style={{color: 'white', fontWeight: 'bold'}}>F</Text>
                                </Button>

                            </Block>
                            <Block flex middle center>
                                <Button
                                    round
                                    onPress={() => Alert.alert('Not implemented')}
                                    color='#DB4437'
                                    shadowless
                                    iconColor={theme.COLORS.WHITE}
                                    style={styles.social}
                                >
                                    <Text style={{color: 'white', fontWeight: 'bold'}}>G</Text>
                                </Button>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </LinearGradient>
        );
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: 'white',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});


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
    countryInput: {
        width: width * 0.9,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        color: 'white'
    },
    phoneInput: {
        width: width * 0.9,
        borderRadius: 0,
        borderBottomWidth: 1,
        borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
        marginTop: 10
    },
    inputActive: {
        borderBottomColor: "white",
    },
    dropdown_6_image: {
        width: 40,
        height: 40,
    },
});
