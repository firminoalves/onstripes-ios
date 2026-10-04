/**
 * @flow
 */
/* global __DEV__ */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { isIphoneX, ifIphoneX } from 'react-native-iphone-x-helper';
import THEME from '../styles/variables';
import AudioPlayerContainer from './audioPlayerContainer';

class PlayerScreenContainer extends Component {
  renderPlayer(player) {
    return <AudioPlayerContainer side={player.side} {...this.props} />;
  }

  render() {
    return (
      <View style={[styles.container, { paddingTop: 0 }]}>
        <View style={[styles.player, styles.expandedPlayer]}>
          {this.renderPlayer(this.props.players[0])}
        </View>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.mainBgColor,
    ...ifIphoneX({ paddingTop: 35 }, { paddingTop: 20 }),
  },
  headerText: {
    textAlign: 'center',
    fontWeight: '200',
  },
  player: {
    flex: 6,
  },
  expandedPlayer: {
    flex: 12,
  },
});
const mapStateToProps = state => ({ players: state.players });
const ConnectedPlayerScreenContainer = connect(mapStateToProps)(PlayerScreenContainer);
export default ConnectedPlayerScreenContainer;
