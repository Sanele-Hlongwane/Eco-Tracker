import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useTheme } from './ThemeContext';
import { challengesData } from './ChallengesData'; // Make sure to import challengesData from your data file

const TIME_LIMIT = 5000; // 5 seconds in milliseconds

function QuizScreen({ route, navigation }) {
  const { theme } = useTheme();
  

  const challenge = challengesData[challengeIndex];
  const { title, questions } = challenge;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(-1)); // -1 represents no answer
  const [userScore, setUserScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (selectedOptionIndex) => {
    if (userAnswers[currentQuestionIndex] === -1) {
      setUserAnswers((prevAnswers) => {
        prevAnswers[currentQuestionIndex] = selectedOptionIndex;
        return [...prevAnswers];
      });
    }

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions have been answered
      const isAllCorrect = userAnswers.every(
        (answer, index) => answer === questions[index].correctAnswer
      );

      if (isAllCorrect) {
        // Navigate back to ChallengesScreen and give points
        navigation.navigate('Challenges', { challengeIndex, score: challenge.score });
      } else {
        // Handle if not all answers are correct
        // For example, show a message or allow the user to retry
      }
    }
  };

  useEffect(() => {
    // Set a timeout to automatically move to the next question after 5 seconds
    const timeout = setTimeout(() => {
      handleAnswerClick(-1); // Pass an invalid index to move to the next question
    }, TIME_LIMIT);

    return () => clearTimeout(timeout);
  }, [currentQuestionIndex]);

  return (
    <View style={{ backgroundColor: theme.backgroundColor }}>
      <Text>{title}</Text>
      <Text>Question {currentQuestionIndex + 1} of {questions.length}</Text>
      <Text>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option, index) => (
        <Button
          key={index}
          title={option}
          onPress={() => handleAnswerClick(index)}
          disabled={userAnswers[currentQuestionIndex] !== -1}
        />
      ))}
      <Text>Score: {userScore}</Text>
    </View>
  );
}

export default QuizScreen;
