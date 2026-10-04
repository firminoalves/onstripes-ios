/**
 * @flow
 */
/* global __DEV__ */
import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import BannerPlayer from '../components/bannerPlayer';
import { getCurrentPlayingTrack } from '../redux/selectors/playlistSelector';
import { showFullscreenPlayer } from '../redux/actions/playbackModeActions';

class BannerPlayerContainer extends Component {
  render() {
    return <BannerPlayer {...this.props} />;
  }
}

const mapStateToProps = state => ({ currentTrack: getCurrentPlayingTrack(state) });
const mapDispatchToProps = (dispatch, props) => ({
  onBannerPress() {
    console.log('banner pressed should expand player modal');
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration:100
    });
    dispatch(showFullscreenPlayer(true));
  },
});
const ConnectedBannerPlayerContainer = connect(mapStateToProps,mapDispatchToProps)(BannerPlayerContainer);
export default ConnectedBannerPlayerContainer;
