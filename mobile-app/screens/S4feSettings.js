import React from 'react';
import {StyleSheet, Switch, FlatList, Platform, TouchableOpacity, ScrollView, AsyncStorage} from "react-native";
import {Block, Text, theme, Icon, Button} from "galio-framework";

import materialTheme from '../constants/Theme';

export default class Settings extends React.Component {
  state = {};

  logout = async () => {
    console.log('logout')
    try {
      await AsyncStorage.multiRemove(['tokenData', 'userData'])
          .then(() => {
            this.props.navigation.navigate('PhoneNumber')
          });
    } catch (e) {
      // Error saving data
      console.log('logout', e)
    }
  };

  toggleSwitch = switchNumber => this.setState({ [switchNumber]: !this.state[switchNumber] });

  renderItem = ({ item }) => {
    const {navigate} = this.props.navigation;

    switch(item.type) {
      case 'switch':
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text size={14}>{item.title}</Text>
            <Switch
              onValueChange={() => this.toggleSwitch(item.id)}
              ios_backgroundColor={materialTheme.COLORS.SWITCH_OFF}
              thumbColor={Platform.OS === 'android' ? materialTheme.COLORS.SWITCH_OFF : null}
              trackColor={{ false: materialTheme.COLORS.SWITCH_OFF, true: materialTheme.COLORS.SWITCH_ON }}
              value={this.state[item.id]}
            />
          </Block>
        );
      case 'button':
        return (
          <Block style={styles.rows}>
            <TouchableOpacity onPress={() => navigate(item.id)}>
              <Block row middle space="between" style={{paddingTop:7}}>
                <Text size={14}>{item.title}</Text>
                <Icon name="angle-right" family="font-awesome" style={{ paddingRight: 5 }} />
              </Block>
            </TouchableOpacity>
          </Block>);
      default:
        break;
    }
  }

  render() {
    const privacy = [
      { title: "User Agreement", id: "Agreement", type: "button" },
      { title: "Privacy", id: "Privacy", type: "button" },
      { title: "About", id: "About", type: "button" },
    ];

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}>


        <Block center style={styles.title}>
          <Text bold size={theme.SIZES.BASE} style={{ paddingBottom: 5 }}>
            Privacy Settings
          </Text>
          <Text size={12} color={materialTheme.COLORS.CAPTION}>
            Third most important settings
          </Text>
        </Block>
        <FlatList
          data={privacy}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
        />

        <Block center style={styles.bottom}>
          <Button
              shadowless
              size='small'
              color={materialTheme.COLORS.PRIMARY}
              onPress={() => this.logout()}
          >
            <Text>SIGN OUT</Text>
          </Button>
        </Block>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 40,
  },
  settings: {
    paddingVertical: theme.SIZES.BASE / 3,
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2,
  }
});
