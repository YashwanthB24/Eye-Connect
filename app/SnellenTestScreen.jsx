import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Snellen chart data for each line (with letter sequences)
const snellenChart = [
  { line: "E", question: "What is the letter being displayed?", options: ["F", "B", "E", "C"], ans: "E", size: 148.7 },
  { line: "F P", question: "What is the first letter being displayed?", options: ["F", "B", "P", "C"], ans: "F", size: 74.3 },
  { line: "T O Z", question: "What is the last letter being displayed?", options: ["O", "C", "T", "Z"], ans: "Z", size: 52 },
  { line: "L P E D", question: "What is the letter after E in the row displayed above?", options: ["P", "C", "D", "F"], ans: "D", size: 37.3 },
  { line: "P E C F D", question: "What is the letter before E in the row displayed above?", options: ["P", "C", "D", "F"], ans: "P", size: 29.7 },
  { line: "E D F C Z P", question: "What is the letter after C in the row displayed above?", options: ["Z", "E", "P", "F"], ans: "Z", size: 22.6 },
  { line: "F E L O P Z D", question: "What is the letter before E in the row displayed above?", options: ["D", "O", "L", "F"], ans: "F", size: 18.55 },
  { line: "D E F P O T E C", question: "What is the letter between E and P in the row displayed above?", options: ["F", "D", "T", "P"], ans: "F", size: 14.82 }
];

const SnellenTestScreen = () => {
  const navigation = useNavigation();
  const [currentLine, setCurrentLine] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(snellenChart[0]); // Initialize with the first question
  const [options, setOptions] = useState(currentQuestion.options); // Set the answer options
  const [userAnswer, setUserAnswer] = useState(currentQuestion.ans); // Set the correct answer

  // UseEffect to update the question and options for the current line
  useEffect(() => {
    if (currentLine < snellenChart.length) {
      const currentQ = snellenChart[currentLine];
      setCurrentQuestion(currentQ);
      setOptions(currentQ.options); // Set the answer options
      setUserAnswer(currentQ.ans); // Set the correct answer
    }
  }, [currentLine]);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.ans) {
      setScore(score + 1); // Increase score for correct answers
      setMistakes(0); // Reset mistakes on correct answer
      setCurrentLine(currentLine + 1); // Move to the next line
    } else {
      // If wrong answer, provide a new question with a different alphabet from the same line
      const newQuestion = generateNewQuestion();
      setCurrentQuestion(newQuestion);
      setMistakes(mistakes + 1);
    }
  };

  const generateNewQuestion = () => {
    const newOptions = currentQuestion.options.filter(option => option !== currentQuestion.ans);
    const newAnswer = newOptions[Math.floor(Math.random() * newOptions.length)]; // Random wrong answer from remaining options
    const newQuestion = {
      ...currentQuestion,
      question: `What is the letter being displayed instead of ${currentQuestion.ans}?`,
      ans: newAnswer,
      options: [...newOptions, currentQuestion.ans] // Include the correct answer to confuse the user
    };
    return newQuestion;
  };

  const renderCurrentLine = () => {
    if (!currentQuestion || !currentQuestion.size) return null; // Safeguard for null or undefined question

    return (
      <View style={styles.questionContainer}>
        {/* Display Snellen chart line */}
        <Text style={[styles.snellenLine, { fontSize: currentQuestion.size }]}>
          {currentQuestion.line}
        </Text>

        {/* Display question */}
        <Text style={styles.question}>
          {currentQuestion.question}
        </Text>

        {/* Display answer options */}
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Snellen Chart Test</Text>
      {currentLine < snellenChart.length ? renderCurrentLine() : (
        <Text style={styles.finalScore}>Test Complete! Your score: {score}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  snellenLine: {
    fontFamily: 'Merriweather', // Set the font to Merriweather
    fontWeight: '400', // Normal weight
    textAlign: 'center',
    marginBottom: 20,
  },
  question: {
    fontSize: 16, // Consistent question size
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#008CBA',
    paddingVertical: 10,
    paddingHorizontal: 30,
    margin: 5,
    borderRadius: 8,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  finalScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SnellenTestScreen;
