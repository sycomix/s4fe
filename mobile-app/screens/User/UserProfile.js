import React from 'react';
import {StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, Animated, AsyncStorage} from 'react-native';
import {Block, Button, Text, theme} from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import {Icon, Item} from '../../components';
import { Images, materialTheme } from '../../constants';
import { HeaderHeight } from "../../constants/utils";
import {API} from "../../utils/api";
import {Axios} from '../../utils/axios'

const { height, width } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            items: []
        }
        // this.state.userData = this.props.navigation.getParam('userData')
    }

    animatedValue = new Animated.Value(0);

    componentDidMount() {
        this.getUserData()
        console.log('user profile mounted')
        this.fetchItems()
    }

    getUserData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            console.log('USER DATA', value)
            if (value !== null) {
                // value previously stored
                this.setState({userData: JSON.parse(value)})
                console.log('USER DATA', this.state.userData)
            }
        } catch (e) {
            // error reading value
        }
    };

    fetchItems() {
        Axios.get(API.ITEMS)
            .then(res => {
                this.setState({items: res.data})
            })
            .catch(e => {
                console.log(e)
            })
    }

    renderResult = (result) => {
        const opacity = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
            extrapolate: 'clamp',
        });

        console.log('result', result)
        return (
            <Animated.View style={{ width: width - theme.SIZES.BASE * 2, opacity }}>
                <Item product={result} horizontal />
            </Animated.View>
        )
    }

    renderResults = () => {
        const { items } = this.state;
        return (
            <Block style={{paddingTop: theme.SIZES.BASE * 0.2}}>
                {items.map(item => this.renderResult(item))}
            </Block>
        )
    }

    logout = async () => {
        console.log('logout')
        try {
            await AsyncStorage.removeItem('tokenData')
                .then(() => {
                    this.props.navigation.navigate('PhoneNumber')
                });
        } catch (e) {
            // Error saving data
            console.log('logout', e)
        }
    };

    render() {
        const { navigation } = this.props;
        console.log('state', this.state.userData)
        return (
            <Block flex style={styles.profile}>
                <ImageBackground
                    source={{ uri: Images.Profile }}
                    style={styles.profileContainer}
                    imageStyle={styles.profileImage}>
                    <Block flex style={styles.profileDetails}>
                        <Block style={styles.profileTexts}>
                            <Text color="white" size={28} style={{ paddingBottom: 8 }}>
                                {this.state.userData.first_name} {this.state.userData.last_name}
                            </Text>
                            <Block  space="between">
                                <Block>
                                    <Text color="white" size={16} muted style={styles.seller}>
                                        <Icon name="envelope" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                                        {/*{this.state.userDataa.email}*/}
                                    </Text>
                                    {/*<Text size={16} color={materialTheme.COLORS.WARNING}>*/}
                                    {/*    4.8 <Icon name="shape-star" family="GalioExtra" size={14} />*/}
                                    {/*</Text>*/}
                                </Block>
                                <Block>
                                    <Text color={theme.COLORS.MUTED} size={16}>
                                        <Icon name="phone" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                                        {this.state.userData.phone_number}
                                    </Text>
                                </Block>
                            </Block>
                        </Block>
                        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
                    </Block>
                </ImageBackground>

                <Block flex={1}>
                    <Block style={styles.options}>
                        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
                            <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
                                <Block middle>
                                    <Text bold size={12} style={{marginBottom: 8}}>
                                        {this.state.items.length || 0}
                                    </Text>
                                    <Text muted size={12}>Total Items</Text>
                                </Block>
                                <Block middle>
                                    <Text bold size={12} style={{marginBottom: 8}}>0</Text>
                                    <Text muted size={12}>Lost Items</Text>
                                </Block>
                                <Block middle>
                                    <Text bold size={12} style={{marginBottom: 8}}>0</Text>
                                    <Text muted size={12}>Stolen Items</Text>
                                </Block>
                            </Block>
                            <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
                                <Text size={16}>Items</Text>
                                <Text size={12} color={materialTheme.COLORS.PRIMARY} onPress={() => this.props.navigation.navigate('AddItem')}>Add Item</Text>
                            </Block>
                            <Block flex center style={styles.searchContainer}>
                                {this.renderResults()}
                            </Block>
                        </ScrollView>
                    </Block>
                    {/* Singout */}
                    <Block center style={styles.bottom}>
                        <Button
                            shadowless
                            size='small'
                            style={styles.button}
                            color={materialTheme.COLORS.PRIMARY}
                            onPress={() => this.logout()}
                        >
                            <Text>SIGN OUT</Text>
                        </Button>
                    </Block>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    profile: {
        marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    },
    profileImage: {
        width: width * 1.1,
        height: 'auto',
    },
    profileContainer: {
        width: width,
        height: 'auto',
        flex: 1,
    },
    profileDetails: {
        paddingTop: theme.SIZES.BASE * 4,
        justifyContent: 'flex-end',
        position: 'relative',
    },
    profileTexts: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE * 2,
        zIndex: 2
    },
    pro: {
        backgroundColor: materialTheme.COLORS.LABEL,
        paddingHorizontal: 6,
        marginRight: theme.SIZES.BASE / 2,
        borderRadius: 4,
        height: 19,
        width: 38,
    },
    seller: {
        marginRight: theme.SIZES.BASE / 2,
    },
    options: {
        position: 'relative',
        paddingHorizontal: theme.SIZES.BASE,
        paddingVertical: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
        marginTop: -theme.SIZES.BASE,
        marginBottom: 0,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2,
    },
    thumb: {
        borderRadius: 4,
        marginVertical: 4,
        alignSelf: 'center',
        width: thumbMeasure,
        height: thumbMeasure
    },
    gradient: {
        zIndex: 1,
        left: 0,
        right: 0,
        bottom: 0,
        height: '30%',
        position: 'absolute',
    },
    button: {
        position: 'absolute',
        bottom: 0
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    searchContainer: {
        width: width,
        paddingHorizontal: theme.SIZES.BASE,
    },

});
