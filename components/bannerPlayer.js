/**
 * @flow
 */
/* global __DEV__ */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import AppText from './appText';
import Button from './button';
import THEME from '../styles/variables';


class BannerPlayer extends Component {
  render() {
    const { currentTrack, onBannerPress } = this.props;
    return (
      <View style={styles.container} >
        <TouchableOpacity style={styles.touchableContainer} onPress={onBannerPress} >
          <Button style={[styles.iconButton]} 
                  size={'small'}
                  image={require('../assets/flat_up_arrow.png')}
                  onPressed={onBannerPress}/>
          <AppText style={styles.trackName} bold={true} numberOfLines={1} ellipsizeMode={'tail'} >
            {currentTrack ? currentTrack.label : 'testing song name'}
          </AppText>
          <AppText style={styles.trackDesc} bold={true} numberOfLines={1} ellipsizeMode={'tail'} >
            {currentTrack ? currentTrack.username : 'test artist' }
          </AppText>
        </TouchableOpacity>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: THEME.mainBgColor,
    borderBottomColor: THEME.tabBarBorderColor,
    borderBottomWidth: 1,
    borderTopColor: THEME.tabBarBorderColor,
    borderTopWidth: 1,
  },
  touchableContainer:{
    flex:1
  },
  trackName: {
    flex: 1,
    fontSize: 16,
    lineHeight: 30,
    textAlign: 'center',
    paddingHorizontal: 55,
    color: THEME.mainHighlightColor,
  },
  trackDesc: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: 55,
    textAlign: 'center',
    color: THEME.mainColor,
  },
  iconButton:{
    position:'absolute',
    top:10,
    left:15,
    opacity:0.6
  },
});

export default BannerPlayer;
