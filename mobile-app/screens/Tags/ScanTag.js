import React from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
    Dimensions,
    ActivityIndicator,
    TextInput, AsyncStorage
} from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { materialTheme } from '../../constants/';
import RNPickerSelect from "react-native-picker-select";
import {Axios} from '../../utils/axios'
import {API} from "../../utils/api";
import ValidationComponent from 'react-native-form-validator';

const hash = require('object-hash');


const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('window');
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - (theme.SIZES.BASE * 2);


export default class ScanTag extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            categories: [],
            selectedCategory: '',
            dataLoading: false,
            userId: ''
        };
        this.state.userId = this.props.navigation.getParam('userId')
    }



    fetchCategories() {
        Axios.get(API.CATEGORIES)
            .then(res => {
                const result = []
                res.data.forEach(category => {
                    result.push({
                        value: category.id,
                        label: category.title
                    })
                })
                this.setState({
                    categories: result
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    handleCategoriesSelect = (value) => {
        this.setState({
            selectedCategory: value
        })
    }
    handleTitle = (value)  => {
        this.setState({title: value})
    }

    handleDescription = (value)  => {
        this.setState({description: value})
    }

    saveItem() {
        const isValid =  this.validate({
            title: {required: true},
            selectedCategory: {required: true},
        });

        if (isValid) {
            this.setState({dataLoading: true})
            const formData = {
                title: this.state.title,
                category: this.state.selectedCategory,
                desc: this.state.description,
                user: this.state.userId,
                key: hash(Math.round(Math.random()*10000000000))
            }
            console.log('forma ', formData)
            Axios.post(API.ITEMS, formData)
                .then(() => {
                    this.setState({dataLoading: false})
                    this.props.navigation.navigate('UserProfile')
                })
                .catch(e => {
                    this.setState({dataLoading: false})
                    console.log(e)
                    console.log(e.response.data)
                    if (e.response.data) {
                        const errors = {
                            titleError: `Title: ${e.response.data.title[0]}`,
                            categoryError: `Category: ${e.response.data.category[0]}`
                        }

                        Alert.alert('Error!', JSON.stringify(errors))
                    }
                })
        }

    }

    componentDidMount() {
        this.fetchCategories()
    }

    renderInputs = () => {
        const placeholder = {
            label: 'Categories',
            value: null,
            color: '#cacaca'
        };
        return (
            <Block flex style={styles.group}>

                <Text muted size={16} style={styles.title}>
                    Scan the tag feature is not yet implemented
                </Text>
            </Block>
        )
    }

    render() {
        return (
            <Block flex>
                <ScrollView
                    style={styles.components}
                    showsVerticalScrollIndicator={false}>
                    {this.renderInputs()}
                </ScrollView>
            </Block>
        );
    }
}


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: materialTheme.COLORS.CAPTION,
    },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 8,
        color: materialTheme.COLORS.CAPTION,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

const styles = StyleSheet.create({
    categoriesInput: {
        paddingRight: 6,
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        borderBottomColor: materialTheme.COLORS.GREY,
        borderBottomWidth: 1,
        color: 'white'
    },
    components: {
        paddingTop: theme.SIZES.BASE * 3,
    },
    title: {
        paddingVertical: theme.SIZES.BASE,
        paddingHorizontal: theme.SIZES.BASE * 2,
    },
    group: {
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.2,
        elevation: 2,
    },
    button: {
        marginBottom: theme.SIZES.BASE,
        width: width - (theme.SIZES.BASE * 2),
    },
    options: {
        paddingHorizontal: theme.SIZES.BASE / 2,
    },
    optionsText: {
        fontSize: theme.SIZES.BASE * 0.75,
        color: '#4a4a4a',
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.29,
    },
    optionsButton: {
        width: 'auto',
        height: 34,
        paddingHorizontal: theme.SIZES.BASE,
        paddingVertical: 10,
    },
    input: {
        borderBottomWidth: 1,
        fontSize: 16,
    },
    textInput: {
        borderBottomWidth: 1,
        fontSize: 14,
        marginLeft: 10,
        marginRight: 10
    },
    inputDefault: {
        borderBottomColor: materialTheme.COLORS.GREY,
    },
    inputTheme: {
        borderBottomColor: materialTheme.COLORS.PRIMARY,
    },
    inputInfo: {
        borderBottomColor: materialTheme.COLORS.INFO,
    },
    inputSuccess: {
        borderBottomColor: materialTheme.COLORS.SUCCESS,
    },
    inputWarning: {
        borderBottomColor: materialTheme.COLORS.WARNING,
    },
    inputDanger: {
        borderBottomColor: materialTheme.COLORS.ERROR,
    },
    imageBlock: {
        overflow: 'hidden',
        borderRadius: 4,
    },
    rows: {
        height: theme.SIZES.BASE * 2,
    },
    social: {
        width: theme.SIZES.BASE * 3.5,
        height: theme.SIZES.BASE * 3.5,
        borderRadius: theme.SIZES.BASE * 1.75,
        justifyContent: 'center',
    },
    category: {
        backgroundColor: theme.COLORS.WHITE,
        marginVertical: theme.SIZES.BASE / 2,
        borderWidth: 0,
    },
    categoryTitle: {
        height: '100%',
        paddingHorizontal: theme.SIZES.BASE,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productItem: {
        width: cardWidth - theme.SIZES.BASE * 2,
        marginHorizontal: theme.SIZES.BASE,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 7 },
        shadowRadius: 10,
        shadowOpacity: 0.2,
    },
    productImage: {
        width: cardWidth - theme.SIZES.BASE,
        height: cardWidth - theme.SIZES.BASE,
        borderRadius: 3,
    },
    productPrice: {
        paddingTop: theme.SIZES.BASE,
        paddingBottom: theme.SIZES.BASE / 2,
    },
    productDescription: {
        paddingTop: theme.SIZES.BASE,
        // paddingBottom: theme.SIZES.BASE * 2,
    },
    albumThumb: {
        borderRadius: 4,
        marginVertical: 4,
        alignSelf: 'center',
        width: thumbMeasure,
        height: thumbMeasure
    },
});
