import React from 'react';
import {View} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {DeckList} from './components/deckList'
import NewDeck from './components/newDeck'


const Tabs = TabNavigator({
        DeckList: {
            screen: DeckList,
            navigationOptions: {
                tabBarLabel: 'All Decks'
            },
        NewDeck: {
           screen: NewDeck,
           navigationOptions: {
               tabBarLabel: 'New Deck',
           },
        },
});

const AppNavigator = StackNavigator({
  Home: {
      screen: Tabs,
      navigationOptions: {title: 'Home'},
    },
});


export default class Index extends React.Component {

    render() {
        return <Provider store={createStore(reducer)}>
            <View style={{flex: 1}}>
                <AppNavigator />
            </View>
        </Provider>
    }
}
