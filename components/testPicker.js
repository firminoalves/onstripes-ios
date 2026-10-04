import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight } from 'react-native';


export default class TestPicker extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Explore Songs Screen</Text>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('PlayerModal')}>
          <Text style={styles.instructions}>Show Player View modal</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Player')}>
          <Text style={styles.instructions}>go to Player</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});