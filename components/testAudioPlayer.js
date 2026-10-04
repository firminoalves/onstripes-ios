import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View , TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { ReactNativeStreamingPlayer } from 'react-native-audio-streaming';
import { incrementPositiveAction } from '../redux/actions/storeReviewAction';

class TestAudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.instId = parseInt(Math.random() * 1000, 10);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  componentDidMount() {
    console.log('mounted comp instance ', this.instId)
    this.player = new ReactNativeStreamingPlayer();
    const url = 'http://api.soundcloud.com/tracks/266850344/stream?client_id=54921f38ed5d570772c094534b9f50b5';
    this.player.setSoundUrl(url);
  }

  play() {
    this.player.play();
    this.props.incrementPositiveAction();
  }

  pause() {
    this.player.pause();
  }

  componentWillUnmount() {
    console.log('destroy comp instance ', this.instId);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Onstripes for iOS</Text>
        <TouchableHighlight onPress={this.play}>
          <Text style={styles.instructions}>Play</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.pause}>
          <Text style={styles.instructions}>Pause</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Home')}>
          <Text style={styles.instructions}>Close music player</Text>
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
    backgroundColor: '#d5d9d9',
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
export default connect(undefined, (dispatch, props) => ({
   incrementPositiveAction: () => dispatch(incrementPositiveAction())
 }))(TestAudioPlayer);