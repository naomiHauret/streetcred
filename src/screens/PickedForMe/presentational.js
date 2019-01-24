
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationEvents } from 'react-navigation';

export default class PickedForMe extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Picked for me screen</Text>
        <Button
          onPress={
            () => this.props.navigation.navigate('Article')
          }
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})