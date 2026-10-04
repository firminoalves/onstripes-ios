/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
/* global __DEV__ */


import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import ModalPlayerContainer from './containers/modalPlayerContainer';
import DiscoverProviderContainer from './containers/discoverProviderContainer';
import THEME from './styles/variables';
import { store } from './redux/store/configure';

if (!__DEV__) {
  /* avoid any logging to prevent performance drops in prod mode */
  console.log = () => false; // eslint-disable-line no-console
  console.info = () => false;// eslint-disable-line no-console
  console.warn = () => false;// eslint-disable-line no-console
}
const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: DiscoverProviderContainer,
    navigationOptions: () => ({
      title: 'Recents Sounds',
      headerStyle: {
        backgroundColor: THEME.mainBgColor,
        borderBottomColor: THEME.tabBarBorderColor,
        borderBottomWidth: 0,
      },
      headerTintColor: THEME.mainHighlightColor,
    }),
  },
});
// const PlayerNavigator = createStackNavigator({
//   Player: {
//     screen: PlayerScreenContainer,
//     navigationOptions: () => ({
//       header: null,
//     }),
//   },
// });
const MainNavStack = createBottomTabNavigator({
  Home: HomeStackNavigator,
  //Player: PlayerNavigator,
}, {
  initialRouteName: 'Home',
  animationEnabled: true,
  lazy: true,
  tabBarOptions: {
    inactiveBackgroundColor: THEME.mainBgColor,
    activeBackgroundColor: THEME.mainBgColor,
    inactiveTintColor: THEME.mainColor,
    activeTintColor: THEME.mainActiveColor,
    style: {
      borderTopWidth: 0,
      borderTopColor: THEME.tabBarBorderColor,
    },
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setStylesGlobalOvverides();
  }
  setStylesGlobalOvverides() {
   // Text.defaultProps.allowFontScaling = false;
  }

  render() {
    return <Provider store={store}>
      <View style={{flex:1}}>
        <MainNavStack/>
        <ModalPlayerContainer/>
      </View>
    </Provider>;
  }
}
