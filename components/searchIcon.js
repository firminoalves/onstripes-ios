/**
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

function SearchIcon(props){
  let iconStyle = props.style ? [styles.iconStyle,props.style]: [styles.iconStyle];
  return <Image style={iconStyle} source={require('../assets/flat_search.png')} resizeMode={'cover'}/>;
}

const styles = StyleSheet.create({
  iconStyle: {
    width:30,
    height:30
  }
});
export default SearchIcon;
