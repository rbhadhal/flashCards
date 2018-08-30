import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { black, white } from '../utils/colours'

class IndividualDeck extends React.Component {

    render() {
        let {title} = this.props.navigation.state.params;
        const questions = this.props.decks[title] && this.props.decks[title].questions;

        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.deckTitle}>{title}</Text>
                    <Text style={styles.questionLength}>{questions.length} cards
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Question', {
                            title,
                            questions,
                        });
                    }}
                    style={styles.addCard}>
                    <Text style={styles.addCardTitle}>Add Card</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Quiz', {
                            title,
                            questions,
                        });
                    }}
                    style={styles.startQuiz}>
                    <Text style={styles.startQuizTitle}>Start Quiz</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    addCard: {
        backgroundColor: white,
        margin: 24,
        padding: 10,
        borderRadius: 7,
        height: 45,
    },
    startQuiz: {
        backgroundColor: black,
        margin: 24,
        padding: 10,
        height: 45,
        borderRadius: 2,
    },
    addCardTitle: {
        color: black,
        fontSize: 22,
        textAlign: 'center',
    },
    startQuizTitle: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    infoContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    deckTitle: {
      fontSize: 36,
      color: black,
    },
    questionLength: {
      fontSize: 22,
      marginTop: 12,
      color: black,
    },
});

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(IndividualDeck);
