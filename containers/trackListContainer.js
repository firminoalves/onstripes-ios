/**
 * @flow
 */

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import config from '../helpers/config';
import THEME from '../styles/variables'
import SoundCloudApi from '../modules/SoundcloudApi';
import TrackList from '../components/trackList';
import ToggleFavoriteTrackContainer from './toggleFavoriteTrackContainer';
// import PlaylistContainer from './playlistContainer';
import {
  pushNotification,
} from '../redux/actions/notificationActions';
import {
  setPlaylist,
  changeCurrentPlayIndex,
} from '../redux/actions/currentPlaylistActions';
import {
  formatDurationExtended,
  formatNumberPrefix,
} from '../helpers/formatters';

const { SC_CLIENT_ID } = config;

class TrackListContainer extends Component {
  constructor(props) {
    super(props);
    console.log(
      'TrackListContainer mounted with props', this.props.side,
    );
    this.scApi = new SoundCloudApi({ clientId: SC_CLIENT_ID });
    this.onTrackActionRender = this.onTrackActionRender.bind(this);
    this.onTrackSelected = this.onTrackSelected.bind(this);
    console.log('TrackListContainer onEndThreshold', props.onEndThreshold);
  }

  hasFavoriteTrack(track) {
    return this.props.favoritePlaylist.tracks.find(t => t.id == track.id);
  }

  onTrackActionRender(track) {
    if (typeof this.props.onTrackActionRender === 'function') {
      return this.props.onTrackActionRender(track, this.hasFavoriteTrack(track));
    } 
    return <ToggleFavoriteTrackContainer 
      inlineLayout 
      side={this.props.side}
      track={track}
    /> 
  }

  onTrackSelected(...args) {
    if (args[0].type === 'playlist') {
      if (this.props.onPlaylistSelected) {
        return this.props.onPlaylistSelected(...args);
      }
      return this.onPlaylistSelected(...args);
    }
    return this.props.onTrackSelected(...args);
  }

  onPlaylistSelected(playlist) {
    // this.props.navigator.push({
    //   title: `PlaylistContainer - playlist.name - ${  this.props.side}`,
    //   name: `PlaylistContainer${  this.props.side}`,
    //   component: PlaylistContainer,
    //   passProps: {
    //     playlist,
    //     side: this.props.side,
    //     onClose: () => this.props.navigator.pop(),
    //   },
    // });
  }

  onTrackDescRender(rowData) {
    const duration = rowData.duration ? 
      formatDurationExtended(rowData.duration, { milli: true }) : '';    
    const playCount = rowData.playbackCount ? 
      formatNumberPrefix(rowData.playbackCount) : '';
    const username = `by ${rowData.username}`;

    return [duration, playCount, username].filter(e => e.length).join(' • ');
  }

  render() {
    return (
      <View style={styles.container}>
        <TrackList
          onHeaderRender={this.props.onHeaderRender}
          tracksData={this.props.trackList}
          onTrackDescRender={this.onTrackDescRender}
          onTrackActionRender={this.onTrackActionRender}
          currentTrack={this.props.currentPlayingTrack}
          onTrackSelected={this.onTrackSelected}
          isLoading={this.props.isLoading}
          onEndReached={this.props.onEndReached}
          onEndThreshold={this.props.onEndThreshold}
          resetToTop={this.props.resetToTop}
          scrollToCurrentTrack={this.props.scrollToCurrentTrack}
          emptyLabel={this.props.emptyLabel}
        ></TrackList>
      </View>
    );
  }
}
TrackListContainer.defaultProps = {
  resetToTop: false,
};
TrackListContainer.propTypes = {
  side: PropTypes.string.isRequired,
  trackList: PropTypes.array.isRequired,
  currentPlayingTrack: PropTypes.object.isRequired,
  resetToTop: PropTypes.bool,
  onTrackActionRender: PropTypes.func,
  onTrackSelected: PropTypes.func.isRequired,
  onPlaylistSelected: PropTypes.func,
  onHeaderRender: PropTypes.func,
  isLoading: PropTypes.bool,
  scrollToCurrentTrack: PropTypes.bool,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.mainBgColor,
  },
});
const mapStateToProps = (state, props) => {
  const playlist = state.playlist.find(playlist => playlist.side === props.side);
  const playlistStore = state.playlistStore.find(
    playlistStore => playlistStore.id == playlist.currentPlaylistId
);
  const favoritePlaylist = state.playlistStore.find(
    playlistStore => playlistStore.id == `default_${  props.side}`
);
  const queue = playlistStore.tracks;
  return {
    playlist,
    favoritePlaylist,
    playlistStore,
    currentPlayingTrack: queue[playlistStore.currentTrackIndex] || {},
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  pushNotification: notification => dispatch(pushNotification(notification)),
  onTrackSelected: (track, trackList) => {
    console.log('tracklist connect onTrackSelected');
    dispatch(setPlaylist(props.side, trackList, `playbackQueue_${props.side}`));
    dispatch(changeCurrentPlayIndex(props.side, track, `playbackQueue_${props.side}`));
  },
});
const mergeProps = 
  (propsFromState, propsFromDispatch, ownProps) => ({ ...propsFromDispatch, ...ownProps, ...propsFromState });
const ConnectedTrackListContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TrackListContainer);

export default ConnectedTrackListContainer;
