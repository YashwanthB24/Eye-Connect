import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SnellenTestScreen = () => {
  const navigation = useNavigation();
  const snellenLines = [
    { line: '2', questions: [
      { question: 'What is the number being displayed?', options: ['2', '9', '8', '0'], answer: '2' },
    ], size: 148.7, score: '20/200' },
    { line: '5 0', questions: [
      { question: 'What is the first number being displayed?', options: ['5', '8', '3', '6'], answer: '5' },
      { question: 'What is the last number being displayed?', options: ['0', '5', '3', '6'], answer: '0' },
    ], size: 74.3, score: '20/100' },
    { line: '3 6 4', questions: [
      { question: 'What is the last number being displayed?', options: ['7', '1', '4', '2'], answer: '4' },
      { question: 'What is the first number being displayed?', options: ['8', '3', '6', '9'], answer: '3' },
    ], size: 52, score: '20/70' },
    { line: '4 9 5 2', questions: [
      { question: 'What is the number after 9 in the row displayed above?', options: ['6', '2', '3', '5'], answer: '5' },
      { question: 'What is the number before 5 in the row displayed above?', options: ['6', '9', '0', '3'], answer: '9' },
    ], size: 37.3, score: '20/50' },
    { line: '6 0 4 9 3', questions: [
      { question: 'What is the number between 0 and 9 in the row displayed above?', options: ['1', '7', '5', '4'], answer: '4' },
      { question: 'What is the number between 6 and 4 in the row displayed above?', options: ['2', '0', '6', '9'], answer: '0' },
    ], size: 29.7, score: '20/40' },
    { line: '5 9 3 2 0 6', questions: [
      { question: 'What is the third number in the row displayed above?', options: ['3', '8', '2', '6'], answer: '3' },
      { question: 'What is the number after 3 in the row displayed above?', options: ['3', '9', '5', '2'], answer: '2' },
   
    ], size: 22.6, score: '20/30' },
    { line: '0 4 6 9 5 3 6', questions: [
      { question: 'What is the number between 5 and 6 in the row displayed above?', options: ['8', '3', '9', '6'], answer: '3' },
      { question: 'What is the last number in the row displayed above?', options: ['9', '6', '0', '3'], answer: '6' },
    ], size: 18.55, score: '20/25' },
    { line: '4 2 9 7 5 3 8 2', questions: [
      { question: 'What is the number between 9 and 5 in the row displayed above?', options: ['7', '1', '4', '0'], answer: '7' },
      { question: 'What is the last number in the row displayed above?', options: ['3', '6', '9', '2'], answer: '2' },
    ], size: 14.82, score: '20/20' },
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [consecutiveMistakes, setConsecutiveMistakes] = useState(0);
  const [eye, setEye] = useState('left');
  const [scores, setScores] = useState({ left: null, right: null });
  const [showResult, setShowResult] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [eyeClosedInstruction, setEyeClosedInstruction] = useState(null);

  const handleStartTest = () => {
    setTestStarted(true);
    setShowInstructions(false);
    setEyeClosedInstruction("Close your right eye");
  };

  const handleAnswer = (option) => {
    const correctAnswer = snellenLines[currentLine].questions[currentQuestion].answer;
    if (option === correctAnswer) {
      setConsecutiveMistakes(0);
      if (currentLine === snellenLines.length - 1) {
        endTest();
      } else {
        setCurrentLine((prev) => prev + 1);
        setCurrentQuestion(0);
      }
    } else {
      setConsecutiveMistakes((prev) => prev + 1);
      if (consecutiveMistakes + 1 >= 2) {
        endTest();
      } else {
        const nextQuestionIndex = (currentQuestion + 1) % snellenLines[currentLine].questions.length;
        setCurrentQuestion(nextQuestionIndex);
      }
    }
  };

  const endTest = () => {
    const score = snellenLines[currentLine].score;
    setScores((prevScores) => ({ ...prevScores, [eye]: score }));

    if (eye === 'left') {
      setEye('right');
      setEyeClosedInstruction("Close your left eye");
      setCurrentLine(0);
      setCurrentQuestion(0);
      setConsecutiveMistakes(0);
    } else {
      setShowResult(true);
    }
  };

  const resetTest = () => {
    setScores({ left: null, right: null });
    setCurrentLine(0);
    setCurrentQuestion(0);
    setConsecutiveMistakes(0);
    setEye('left');
    setShowResult(false);
    setTestStarted(false);
    setShowInstructions(true);
  };

  const handleGoHome = () => {
    resetTest();
    navigation.navigate('HomePage');
  };

  // Main screen content
  if (showInstructions) {
    return (
      <View style={styles.container}>
        <Text style={styles.instructionText}>Stand 20 feet (6 meters) away from your device</Text>
        <Text style={styles.instructionText}>Ensure you're in a well-lit room</Text>
        <Text style={styles.instructionText}>Make sure the device is at eye level</Text>
        
        <TouchableOpacity style={styles.startButton} onPress={handleStartTest}>
          <Text style={styles.buttonText}>Start Test</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showResult) {
    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>Test Results</Text>
        <Text style={styles.resultText}>Left Eye Score: {scores.left}</Text>
        <Text style={styles.resultText}>Right Eye Score: {scores.right}</Text>
        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <Text style={styles.homeButtonText}>Go to Homepage</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {eyeClosedInstruction && (
        <View style={styles.instructionContainer}>
          <Icon name="eye-slash" size={24} color="black" />
          <Text style={styles.instructionText}>{eyeClosedInstruction}</Text>
        </View>
      )}
      
      <Text style={[styles.text, { fontSize: snellenLines[currentLine].size }]}>
        {snellenLines[currentLine].line}
      </Text>
      
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{snellenLines[currentLine].questions[currentQuestion].question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {snellenLines[currentLine].questions[currentQuestion].options.map((option, index) => (
          <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleAnswer(option)}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  instructionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    marginLeft: 10,
  },
  startButton: {
    backgroundColor: '#6200EE',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  text: {
    fontSize: 48,
    textAlign: 'center',
    marginTop: 30,
  },
  questionContainer: {
    marginTop: 20,
  },
  question: {
    fontSize: 18,
    textAlign: 'center',
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: 200,
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 22,
    marginBottom: 20,
  },
  homeButton: {
    backgroundColor: '#6200EE',
    padding: 12,
    borderRadius: 8,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SnellenTestScreen;