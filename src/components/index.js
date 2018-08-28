import React from 'react';
import {View} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import DeckList from './deckList'
import NewDeck from './newDeck'
import IndividualDeck from './IndividualDeck'
import reducer from '../reducers'
import { FontAwesome, Ionicons } from '@expo/vector-icons'





const TabNavigatorConfig = {
      navigationOptions: {
        header: null
          },
      tabBarOptions: {
        activeTintColor: 'white',
        style: {
          height: 56,
          backgroundColor: 'white',
          shadowColor: "rgba(0, 0, 0, 0.24)",
          shadowOffset: {
            width: 0,
            height: 3
            },
        shadowRadius: 6,
        shadowOpacity: 1
        }
        }
        };

const RouteConfigs = {
      DeckList: {
        screen: DeckList,
        navigationOptions: {
          tabBarLabel: "All Decks",
          tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />}},
      NewDeck: {
        screen: NewDeck,
        navigationOptions: {
          tabBarLabel: "Add Entry",
          tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />}},


  };

export const Tabs = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)

const AppNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
IndividualDeck: {
  screen: IndividualDeck,
  navigationOptions: {
      headerTintColor: '#000',
  },
},

})


export default class Index extends React.Component {

    render() {
        return <Provider store={createStore(reducer)}>
            <View style={{flex: 1}}>
                <AppNavigator />
            </View>
        </Provider>
    }
}
