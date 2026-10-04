/**
 * @flow
 */
/* global __DEV__ */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import THEME from '../styles/variables';
import PlayerScreenContainer from './playerScreenContainer';
import BannerPlayerContainer from './bannerPlayerContainer';
import { getCurrentPlayingTrack } from '../redux/selectors/playlistSelector';
import { getPlayerExpandedMode } from '../redux/selectors/playerSelector';

class ModalScreenContainer extends Component {
  render() {
    const { isExpanded, isHidden } = this.props;
    const containerStyle = isExpanded
      ? [styles.container] : [styles.bannerMode];
    if (isHidden) containerStyle.push(styles.bannerHidden);
    return (
      <View style={[containerStyle]}>
        <PlayerScreenContainer {...this.props} />
        {!isExpanded && <BannerPlayerContainer {...this.props} />}
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bannerMode: {
    position: 'absolute',
    paddingTop: 0,
    paddingBottom: 0,
    bottom: 49,
    height: 50,
    overflow: 'hidden',
    left: 0,
    right: 0,
  },
  bannerHidden: {
    height: 0,
  },
});
const mapStateToProps = state => ({
  isExpanded: getPlayerExpandedMode(state),
  isHidden: !getCurrentPlayingTrack(state),
 });
const ConnectedModalScreenContainer = connect(mapStateToProps)(ModalScreenContainer);
export default ConnectedModalScreenContainer;
