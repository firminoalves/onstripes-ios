import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Slider,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import THEME from '../styles/variables';
import {
  audioPlayerStates,
  playbackModeTypes 
} from '../helpers/constants';

import Button from "./button";
import AppText from "./appText";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { formatDurationExtended } from '../helpers/formatters';
import ToggleFavoriteTrackContainer from '../containers/toggleFavoriteTrackContainer';

const isBufferingLabel = 'Buffering - ';

class AudioPlayer extends Component {

  componentWillUnmount() {
    console.log('component will unmount! destory player instance');
    if (this.playerAObj) {
      this.playerAObj.stop();
      this.playerAObj.destroy();
    }
  }

  _getCurrentTrackIndex() {
    return this.props.playbackIndex;
  }

  _hasCurrentTrackObj() {
    return this.props.queue[this.props.playbackIndex];
  }

  _getCurrentTrackObj() {
    return this.props.queue[this.props.playbackIndex] || {};
  }

  _getCurrentTrackId() {
    return this._getCurrentTrackObj().id;
  }

  _getCurrentTrackUrl() {
    return this._getCurrentTrackObj().streamUrl;
  }

  _getCurrentTrackTitle() {
    return this._getCurrentTrackObj().label;
  }

  _getCurrentTrackDescription() {
    return this._getCurrentTrackObj().username;
  }

  _getCurrentTrackArtwork() {
    const scArtwork = this._getCurrentTrackObj().artwork
      ? this._getCurrentTrackObj().artwork.replace('-large', '-t500x500') : null;
    return scArtwork || false;
  }

  _getFallbackTrackArtwork() {
    return require('../assets/empty_album_alt.png');
  }

  _isPlayerBuffering() {
    return this.props.status === audioPlayerStates.BUFFERING;
  }

  _isPlayerPlaying() {
    return this.props.status === audioPlayerStates.PLAYING;
  }

  _isPlayerPaused() {
    return this.props.status === audioPlayerStates.PAUSED;
  }

  _isPlayerStopped() {
    return this.props.status === audioPlayerStates.STOPPED;
  }

  renderInFullscreen(children) {
    return this.props.isFullscreen ? children : null;
  }

  renderInSplitMode(children) {
    return this.props.isFullscreen ? null : children;
  }

  render() {
    const sideLabel = {
      L: 'left',
      R: 'right',
    };
    const isUiPlaybackActive = this._isPlayerPlaying() || this._isPlayerBuffering();
    const playbackSource = isUiPlaybackActive
      ? require('../assets/flat_pause.png') : require('../assets/flat_play.png');
    const playPauseButtonStyle = [styles.container];
    playPauseButtonStyle.push(isUiPlaybackActive
      ? styles.pauseToggleButton : styles.playToggleButton);

    const { width } = Dimensions.get('window');
    let progressTrackLength = width - 160;
    const volumeSliderWidth = width - 160;
    const showBgArtCover = this._getCurrentTrackArtwork();
    const artworkSource = showBgArtCover
      ? { uri: this._getCurrentTrackArtwork() }
      : this._getFallbackTrackArtwork();
    const tracknameStyles = [styles.tracknameContainer];
    const tracknameTextStyles = [styles.trackname];
    const tracknameTextDescription = [styles.trackDescription];
    const playbackControlsContainer = [styles.horizontalContainer];
    const playerBgImage = [styles.artworkImage];
    if (this.props.isFullscreen) {
      tracknameStyles.push(styles.tracknameFullscreen);
      tracknameTextStyles.push(styles.tracknameTextFullscreen);
      tracknameTextDescription.push(styles.trackDescriptionTextFullscreen);
      playbackControlsContainer.push(styles.controlsBackground);
    }
    let trackDescription = '';
    let trackLabelPlaceholder = `Tap to load a track...`;
    let smallTimeText;

    if (formatDurationExtended(this.props.duration).length > 5) {
      smallTimeText = styles.playbackTimeSmall;
      progressTrackLength -= 20;
    }
    if (this._getCurrentTrackTitle()) {
      trackLabelPlaceholder = this._getCurrentTrackTitle();
      trackDescription = `by ${this._getCurrentTrackDescription()}`;
    }
    if (this._isPlayerBuffering()) {
      trackLabelPlaceholder = `${isBufferingLabel} ${trackLabelPlaceholder}`;
    }
    return (
      <View style={styles.mainContainer} >
        <View style={styles.artwork}>
            <ImageBackground
              style={playerBgImage}
              blurRadius={20}
              source={artworkSource}
              resizeMode={'cover'}>
              <View style={styles.backgroundOverlay}>
                <TouchableOpacity style={styles.minimizePlayerContainer} onPress={this.props.onMinimizePlayer}>
                  <Button style={[styles.minimizePlayer]} 
                    size={'small'}
                    image={require('../assets/flat_down_arrow.png')}
                    onPressed={this.props.onMinimizePlayer}
                  />
                </TouchableOpacity>
                <View style={tracknameStyles}>
                  <TouchableOpacity onPress={this.props.onTrackLabelPress}>
                    <AppText bold={true} style={tracknameTextStyles} numberOfLines={1} ellipsizeMode={'tail'}>
                      { trackLabelPlaceholder }
                    </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.props.onUploaderProfileOpen} numberOfLines={1} ellipsizeMode={'tail'} >
                    <AppText bold={true} style={tracknameTextDescription}>
                      { trackDescription }
                    </AppText>
                  </TouchableOpacity>
                </View>
                {this.renderInFullscreen(this.renderForegroundArtCover(artworkSource))}
                <View style={playbackControlsContainer.concat([styles.verticalCenterContainer,styles.playbackTimeContainer])} >
                  <AppText style={[styles.playbackTime, styles.playbackTimeInitial, smallTimeText]}>{
                      formatDurationExtended(this.props.elapsed)
                  }</AppText>
                  <View style={styles.playbackTrackContainer}>
                    <MultiSlider
                      values={this.props.playbackProgressValue}
                      min={0}
                      max={100}
                      onValuesChangeFinish={this.props.onSeekToTime}
                      onValuesChangeStart={this.props.onSeekToTimeStart}
                      sliderLength={progressTrackLength}
                      trackStyle={{ borderRadius: 4, height: 2 }}
                      selectedStyle={{ backgroundColor: 'rgb(255,255,255)' }}
                      unselectedStyle={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                      markerStyle={markerStyle} />
                  </View>
                  <AppText style={[styles.playbackTime, smallTimeText]}>{
                      formatDurationExtended(this.props.duration)
                    }</AppText>
                </View>
                <View style={playbackControlsContainer.concat([
                  styles.verticalCenterContainer,
                  styles.playbackMainControls])}>
                  {/* <Button style={[styles.container, styles.playlistButton]}
                      image={require('../assets/flat_select.png')}
                      size={'small'}
                      onPressed={this.props.toggleFavoritePlaylist} /> */}
                  <Button style={[styles.container, styles.startRow]}
                          image={require('../assets/flat_prev.png')}
                          onPressed={this.props.goToPrevTrack} />
                  <View style={styles.playToggleButtonContainer}>
                    <Button style={playPauseButtonStyle} image={playbackSource}
                        size={'huge'} onPressed={this.props.onPlayTogglePress} />
                  </View>
                  <Button style={[styles.container, styles.endRow]}
                          image={require('../assets/flat_next.png')}
                          onPressed={this.props.goToNextTrack} />
                  {/* <Button style={[styles.container, styles.searchButton]}
                          image={require('../assets/flat_search.png')}
                          onPressed={this.props.onPickerToggle}
                          size={'small'}/> */}
                </View>
                
                {/* <TouchableOpacity onPress={this.props.openScUploaderLink} style={[styles.scCopyContainer]}>
                  <Image
                  style={[styles.scCopyImage]}
                  source={require('../assets/powered_by_large_white.png')}
                  resizeMode={'contain'} />
                  </TouchableOpacity> */}
              </View>
            </ImageBackground>
         </View>
      </View>
    );
  }

  renderForegroundArtCover(artworkSource) {
    const { width } = Dimensions.get('window');
    const resizeStyle = {
      flex: 0,
      width: width - 60,
      height: width - 60,
    };
    return <ImageBackground style={[styles.controlsFadeImage]}
        source={require('../assets/fade_to_black.png')}
        resizeMode={'stretch'} >
          <TouchableOpacity onPress={this.props.toggleCurrentPlaylist}>
            <Image style={[styles.fgArtCoverImage, resizeStyle]}
              source={artworkSource} >
              {/*<ToggleFavoriteTrackContainer 
                side={this.props.side} 
                track={this._getCurrentTrackObj()} 
              />*/}
            </Image>
          </TouchableOpacity>
      </ImageBackground>;
  }
}

AudioPlayer.propTypes = {
  side: PropTypes.string,
  playbackIndex: PropTypes.number,
  queue: PropTypes.array,
  status: PropTypes.string,
  elapsed: PropTypes.number,
  duration: PropTypes.number,
  pan: PropTypes.number,
  muted: PropTypes.number,
  isFullscreen: PropTypes.bool,
  playbackProgressValue: PropTypes.array,
  volumeSliderValue: PropTypes.number,
  onPickerToggle: PropTypes.func,
  onUploaderProfileOpen: PropTypes.func,
  onSeekToTimeStart: PropTypes.func,
  onSeekToTime: PropTypes.func,
  toggleCurrentPlaylist: PropTypes.func,
  onMultiSliderValuesChange: PropTypes.func,
  goToPrevTrack: PropTypes.func,
  onPlayTogglePress: PropTypes.func,
  goToNextTrack: PropTypes.func,
  onVolumeValueChange: PropTypes.func,
  openScUploaderLink: PropTypes.func,
};

const volumeMarginSide = 80;
const playbackHorizontalMargin = 10;
const mainFgColor = '#FFFFFF';
const overImageShadowColor = 'rgb(0,0,0)';
const overImageShadowOffset = { width: 1, height: 1 };
const overImageShadowRadious = 8;
const textShadowStyle = {
  textShadowColor: overImageShadowColor,
  textShadowOffset: overImageShadowOffset,
  textShadowRadius: overImageShadowRadious,
};
const lightTextShadowStyle = {
  textShadowColor: '#555',
  textShadowOffset: { width: 0, height: 0 },
  textShadowRadius: 0,
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  startRow: {
    alignItems: 'flex-end',
  },
  endRow: {
    alignItems: 'flex-start',
  },
  backgroundOverlay: {
    flex: 1,
    backgroundColor: THEME.textOverlayBgColor,
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  playbackTimeContainer: {
    alignItems: 'center',
    flex: 0,
    height:30,
    paddingTop:10
  },
  playbackMainControls: {
    flex: 2,
  },
  verticalCenterContainer: {
    alignItems: 'center',
  },
  tracknameContainer: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tracknameFullscreen: {
    flex: 0,
    height: 80,
    paddingBottom: 20,
  },
  progressSlider: {
    flex: 1,
  },
  playbackTime: {
    textAlign: 'center',
    color: THEME.playerTracknameColor,
    height: 30,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
    width: 50,
  },
  playbackTimeSmall: {
    fontSize: 14,
    width: 60,
  },
  playbackTimeInitial: {
    marginLeft: 20,
  },
  playbackTrackContainer: {
    marginHorizontal: playbackHorizontalMargin,
    position:'relative',
    top:-2
  },
  volumePad: {
    flex: 2,
  },
  volumeSlider: {
    flex: 3,
    justifyContent: 'center',
  },
  welcome: Object.assign({
    fontSize: 20,
    textAlign: 'center',
    color: mainFgColor,
    margin: 10,
    height: 30,
  }, textShadowStyle),
  playToggleButtonContainer: {
    borderWidth: 0,
    borderRadius: 50,
    height: 55,
    width: 75,
    paddingHorizontal:10,
    borderColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 10,
  },
  playToggleButton: {
    top: 5,
    left: 4,
  },
  pauseToggleButton: {
    top: 5,
    left: -1,
  },
  searchButton: {
  },
  minimizePlayerContainer: {
    flex:0,
    height:50,
    ...ifIphoneX(
      { paddingTop: 55 },
      { paddingTop: 30 },
    ),
    paddingBottom:40,
    alignItems: 'center',
  },
  minimizePlayer: {
    opacity: 0.8,
    zIndex: 10,
  },
  scCopyImage: {
    width: 45,
    height: 45,
  },
  playlistButton: {
  },
  trackInfoContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  trackRowContainer: {
    height: 25,
  },
  trackname: {
    fontSize: 16,
    color: THEME.playerTracknameColor,
    backgroundColor: 'transparent',
    paddingRight: 20,
  },
  trackDescription: {
    fontSize: 14,
    color: THEME.playerDescColor,
  },
  tracknameTextFullscreen: {
    fontSize: 19,
    lineHeight: 30,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    height: 30,
  },
  trackDescriptionTextFullscreen: {
    fontSize: 16,
    textAlign: 'center',
    height: 30,
  },
  artwork: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  artworkImage: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#121314',
  },
  controlsFadeImage: {
    flex: 5,
    marginBottom: -2,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsBackground: {
    backgroundColor: THEME.playerControlsBgColor,
  },
  fgArtCoverImage: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 8,
  },
  miniArtCoverImage: {
    justifyContent: 'center',
  },
  miniFgArtworkContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
const sliderTrackStyles = {
  max: 'rgba(255,255,255,0.3)',
  min: mainFgColor,
};
const markerStyle = {
  height: 12,
  width: 12,
  borderRadius: 6,
  backgroundColor: THEME.mainHighlightColor,
  borderWidth: 0,
  shadowColor: 'black',
  shadowRadius: 0,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0,
};
export default AudioPlayer;
