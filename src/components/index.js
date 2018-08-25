import React from 'react';
import {View} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {StackNavigator, TabNavigator} from 'react-navigation';


const Tabs = TabNavigator({
        DeckList: {
            screen: DeckList,
            navigationOptions: {
                tabBarLabel: 'All Decks'
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
