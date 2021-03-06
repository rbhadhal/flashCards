import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { clearLocalNotification } from '../utils/notificationsAPI'

export default class Quiz extends React.Component {

    state = {
        questionIndex: 0,
        correctAnswers: 0,
        shouldShowAnswer: false,
    };

    onCorrect = () => {
        const {questionIndex, correctAnswers} = this.state;
        this.setState({questionIndex: questionIndex + 1, correctAnswers: correctAnswers + 1, shouldShowAnswer: false});
    };

    startQuiz = () => {
        this.setState({questionIndex: 0, correctAnswers: 0, shouldShowAnswer: false});
    };

    backToDeck = () => {
        clearLocalNotification();
        this.props.navigation.goBack();

    }

    onIncorrect = () => {
        this.setState({questionIndex: this.state.questionIndex + 1});
    };

    showAnswer = () => {
        this.setState({shouldShowAnswer: !this.state.shouldShowAnswer});
    };

    render() {
        const {questionIndex, correctAnswers, shouldShowAnswer} = this.state;
        const {questions} = this.props.navigation.state.params;
        const isQuestionAvailable = questionIndex < questions.length;
        const questionLeft = questions.length - questionIndex;

        return (
            <View style={{flex: 1}}>
                {isQuestionAvailable ? (
                    <View style={styles.container}>

                        <View style={[styles.group, {justifyContent: 'flex-start', flex: 1}]}>
                            <View>
                                <Text>{questionLeft} / {questions.length}</Text>
                            </View>
                        </View>

                        <View style={[styles.group, {flex: 4}]}>
                            <View>
                                {shouldShowAnswer ? (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize: 36}}>{questions[questionIndex].answer}</Text>

                                        <TouchableOpacity onPress={this.showAnswer}>
                                            <Text style={{fontSize: 18, color: '#70dd2f'}}>Question</Text>
                                        </TouchableOpacity>

                                    </View>) : (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize: 36}}>{questions[questionIndex].question}</Text>

                                        <TouchableOpacity onPress={this.showAnswer}>
                                            <Text style={{fontSize: 18, color: '#ff463f'}}>Answer</Text>
                                        </TouchableOpacity>

                                    </View>
                                )}
                            </View>
                        </View>


                          <View style={{flex:4}}>

                                <TouchableOpacity onPress={this.onCorrect} style= {styles.correct}>
                                    <Text style={styles.correctText}> Correct </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onIncorrect} style={styles.inCorrect}>
                                    <Text style={styles.inCorrectText}>Incorrect</Text>
                                </TouchableOpacity>

                          </View>



                    </View>

                ) : (
                    <View style={styles.container}>
                        <Text>Score: {correctAnswers}</Text>

                        <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 4}}>
                            <View style={styles.container}>

                                <TouchableOpacity onPress={this.startQuiz} style= {styles.correct}>
                                    <Text style={styles.correctText}>Start Quiz</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.backToDeck} style= {styles.inCorrect}>
                                    <Text style={styles.inCorrectText}>Back to Deck</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    correct: {
        backgroundColor: '#fff',
        margin: 24,
        padding: 10,
        borderRadius: 7,
        height: 45,
    },
    inCorrect: {
        backgroundColor: '#ff463f',
        margin: 24,
        padding: 10,
        borderRadius: 7,
        height: 45,
      },
      correctText: {
          color: '#000',
          fontSize: 22,
          textAlign: 'center',
      },
      inCorrectText: {
          color: '#fff',
          fontSize: 22,
          textAlign: 'center',
      }
});
