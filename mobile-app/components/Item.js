import React from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import {Select} from "./index";
import {materialTheme} from "../constants";

const { width } = Dimensions.get('screen');

class Item extends React.Component {
  render() {
    const { navigation, product, horizontal} = this.props;

    return (
      <Block row={horizontal} card flex style={[styles.product]}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('ItemDetails', { product: product })}>
          <Block flex space="between" style={styles.productDescription}>
            <Text size={16} style={styles.productTitle}>{product.title}</Text>
            <Text size={12} muted style={{paddingBottom: 10}}>{product.desc}</Text>

            {/*<Block flex row space="between" style={styles.options}>*/}
            {/*  <Button*/}
            {/*      center*/}
            {/*      shadowless*/}
            {/*      color={materialTheme.COLORS.INPUT}*/}
            {/*      textStyle={styles.optionsButtonText}*/}
            {/*      style={styles.optionsButton}*/}
            {/*      onPress={() => this.handleDelete(item.id)}*/}
            {/*  >*/}
            {/*    DELETE*/}
            {/*  </Button>*/}
            {/*  <Button*/}
            {/*      center*/}
            {/*      shadowless*/}
            {/*      color={materialTheme.COLORS.INPUT}*/}
            {/*      textStyle={styles.optionsButtonText}*/}
            {/*      style={styles.optionsButton}*/}
            {/*      onPress={() => console.log('save for later')}*/}
            {/*  >*/}
            {/*    SAVE FOR LATER*/}
            {/*  </Button>*/}
            {/*</Block>*/}
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

export default withNavigation(Item);

const styles = StyleSheet.create({
  product: {
    // backgroundColor: '#cacaca',
    paddingLeft: 20,
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 1,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE / 1,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 200,
    width: 150,
    margin: 20
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },

  optionsButtonText: {
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
    borderRadius: 1,
  },
});
