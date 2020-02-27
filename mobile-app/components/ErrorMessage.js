import React  from 'react';
import {Text} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import {Block} from "galio-framework";
import {materialTheme} from "../constants";

export default class FormTest extends ValidationComponent {
render() {
    return (
        <Block left>
            <Text style={{fontWeight: 'bold', color: materialTheme.COLORS.ERROR}}>
                {this.getErrorMessages()}
            </Text>
        </Block>
    )
}
}