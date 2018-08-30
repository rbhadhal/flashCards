import React from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {createDeck} from '../utils/storageAPI';
import {connect} from 'react-redux';
import {addDeck} from '../actions/index';
import { black, white } from '../utils/colours'

class AddDeck extends React.Component {

  state = {
    text: ''
  }
    componentWillMount() {
        this.setState({
            text: ''
        })
    }

    addNewDeck = () => {
        const entry = this.state;
        const {decks} = this.props;

        if (!entry.text) {
            Alert.alert(
                'Deck name cannot be empty'
            );
        } else {
            if (decks[entry.text]) {
                Alert.alert(
                    'Deck already exists'
                );
            } else {
                const newDeck = {[entry.text]: {title: entry.text, questions: []}};

                this.props.dispatch(addDeck(newDeck));
                createDeck(newDeck);
                console.log('after create new deck in api');

                Alert.alert('Done',  'Deck Added',
                    [
                        {text: 'OK', onPress: () => this.props.navigation.navigate('IndividualDeck', {
                            title: entry.text,
                            questions : []
                        })},
                    ],
                );

                this.setState({text: ''});
            }
        }
    };

    render() {
        return (
            <View style={style.container}>
                <Text style={{fontSize: 28}}>What is the title of your new deck ?</Text>

                <TextInput
                    value={this.state.text}
                    style={style.input}
                    onChangeText={text => this.setState({text})}/>

                <TouchableOpacity
                    onPress={this.addNewDeck}
                    style={style.submitButton}>
                    <Text style={style.submitText}>Submit</Text>

                </TouchableOpacity>

            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    input: {
        width: 300,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: white,
        backgroundColor: white,
        margin: 24,
    },
    submitButton: {
        backgroundColor: black,
        padding: 10,
        height: 44,
    },
    submitText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
});

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(AddDeck);
