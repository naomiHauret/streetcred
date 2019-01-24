



import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import NativeTachyons from "react-native-style-tachyons";

export default NativeTachyons.wrap(
  class FirstTime extends React.Component {
    render() {
      const { i18n } = this.props
      return (
        <View style={styles.container}>
          <Text cls="fs-lg">Explore screen</Text>
          <Text style={{ fontSize: 20 }}>Explore screen</Text>
          <Text style={{ fontSize: 20 }}>{i18n.t('foo')}</Text>

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
