/**
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import TrackListContainer from "./trackListContainer";

class PlaylistContainer extends Component {
  constructor(props) {
    super(props);
    console.log('PlaylistContainer props.playlist', this.props.playlist);
  }

  render() {
    const tracks = this.props.playlist ? this.props.playlist.tracks : [];
    const playlistFilteredList = tracks.filter(
      track => ('isVisible' in track ? track.isVisible : true),
    );
    return (
      <View style={styles.container}>
        {/* <View style={styles.filterContainerView}>
          <FilterInput
            placeholder={'Filter songs...'}
            value={this.props.playlist.filterTracks}
            onChangeText={this.onFilterTextChange}
            onClearFilter={this.onClearFilter}
            />
        </View> */}
        <TrackListContainer
            {...this.props}
            trackList={playlistFilteredList}
            side={this.props.side}
            trackActionStyles={[{ fontSize: 45 }]}
            />
      </View>
    );
  }
}
PlaylistContainer.defaultProps = {
  side: 'L',
};
PlaylistContainer.propTypes = {
  side: PropTypes.string.isRequired,
  playlist: PropTypes.object.isRequired,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('PlaylistContainer', () => PlaylistContainer);

export default PlaylistContainer;
