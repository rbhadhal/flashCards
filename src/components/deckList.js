import React from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {getDecks} from '../actions/index';
import {fetchDecks} from '../utils/storageAPI';
import { Deck } from './deck';

class DeckList extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props;
        fetchDecks().then(decks => dispatch(getDecks(decks)))
            .then(() => this.setState(() => ({ready: true})));
    }

    renderItem = ({item}) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() =>
                this.props.navigation.navigate('IndividualDeck', item)}>
                <Deck
                    title={item.title}
                    questions={item.questions}/>
            </TouchableOpacity>
        </View>
    );

    render() {
        return (
            <View style={styles.deck}>
                <FlatList
                    data={Object.values(this.props.decks).sort((a, b) => a.title > b.title)}
                    renderItem={this.renderItem}
                    //keyExtractor = {(item, Object.keys(this.props.decks)) => index}/>
                    keyExtractor={(item, index) => `list-item-${index}`}/>

            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'row',
        height: Dimensions.get('window').height
    },
});

export default connect(mapStateToProps)(DeckList);
