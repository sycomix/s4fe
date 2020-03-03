import React from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
    Dimensions
} from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import { materialTheme, products, Images, tabs } from '../../constants/';
import { Select, Icon, Header, Product, Switch, Tabs } from '../../components/';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - (theme.SIZES.BASE * 2);
const categories = [
    {
        title: 'Flower',
        description: 'Using plant materials and flowers to create a pleasing composition.',
        image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?fit=crop&w=840&q=80'
    },
    {
        title: 'Shower',
        description: 'Put personal touch on your bathroom with stylish shower accessories.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?fit=crop&w=840&q=80'
    },
    {
        title: 'Candle',
        description: 'Decorative candleholders, shaped as a pedestal, are called candlesticks.',
        image: 'https://images.unsplash.com/photo-1536942338469-91c7022e55a7?fit=crop&w=840&q=80'
    },
];

export default class AddItem extends React.Component {
    state = {
        'switch-1': true,
        'switch-2': false,
    };

    toggleSwitch = switchId => this.setState({ [switchId]: !this.state[switchId] });

    renderInputs = () => {
        return (
            <Block flex style={styles.group}>
                <Text bold size={16} style={styles.title}>Inputs</Text>
                <Block>
                    <Input
                        borderless
                        color={materialTheme.COLORS.ERROR}
                        placeholder="test"
                        bgColor="transparent"
                        style={[styles.input, styles.inputDefault]}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                    />



                    <Input
                        borderless
                        placeholder="danger"
                        bgColor="transparent"
                        color={materialTheme.COLORS.ERROR}
                        style={[styles.input, styles.inputDanger]}
                        placeholderTextColor={materialTheme.COLORS.ERROR}
                    />

                    <Input
                        password
                        viewPass
                        borderless
                        bgColor="transparent"
                        placeholder="password"
                        style={[styles.input, styles.inputDefault]}
                    />

                    <Input
                        right
                        placeholder="icon right"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        iconContent={<Icon size={16} color={theme.COLORS.ICON} name="camera-18" family="GalioExtra" />}
                    />

                    <Input
                        borderless
                        placeholder="borderless"
                        style={{ borderRadius: 3 }}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                    />

                </Block>
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

const styles = StyleSheet.create({
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
