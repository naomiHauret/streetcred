



import React from 'react';
import { StyleSheet, Text, View, Button, Picker } from 'react-native';
import NativeTachyons from "react-native-style-tachyons";
import { t } from './../../utils/translation'

export default NativeTachyons.wrap(
  class FirstTime extends React.Component {
    render() {
      const { i18n } = this.props
      return (
        <View style={styles.container}>
          <Text cls="fs-lg">Explore screen</Text>
          <Text style={{ fontSize: 20 }}>Explore screen</Text>
          <Text style={{ fontSize: 20 }}>{t('foo', i18n)}</Text>
          <Picker
            selectedValue={i18n.locale}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          <Button
            onPress={
              () => this.props.navigation.navigate('Feed')
            }
            title="Change page"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />

          <Button
            onPress={
              () => this.props.changeLocale('en')
            }
            title="Change locale"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />

          <Button
            onPress={
              () => this.props.switchTheme()
            }
            title="Change theme"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      );
    }
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
