import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SnellenTestScreen = () => {
  const navigation = useNavigation();
  const snellenLines = [
    { line: 'E', questions: [
      { question: 'What is the letter being displayed?', options: ['F', 'B', 'E', 'C'], answer: 'E' },
    ], size: 148.7, score: '20/200' },
    { line: 'F P', questions: [
      { question: 'What is the first letter being displayed?', options: ['F', 'B', 'P', 'C'], answer: 'F' },
      { question: 'What is the last letter being displayed?', options: ['F', 'B', 'P', 'C'], answer: 'P' },
    ], size: 74.3, score: '20/100' },
    { line: 'T O Z', questions: [
      { question: 'What is the last letter being displayed?', options: ['O', 'C', 'T', 'Z'], answer: 'Z' },
      { question: 'What is the first letter being displayed?', options: ['T', 'O', 'Z', 'P'], answer: 'T' },
      { question: 'What is the middle letter being displayed?', options: ['C', 'O', 'P', 'Z'], answer: 'O' },
    ], size: 52, score: '20/70' },
    { line: 'L P E D', questions: [
      { question: 'What is the letter after E in the row displayed above?', options: ['P', 'C', 'D', 'F'], answer: 'D' },
      { question: 'What is the letter before E in the row displayed above?', options: ['P', 'C', 'D', 'F'], answer: 'P' },
    ], size: 37.3, score: '20/50' },
    { line: 'P E C F D', questions: [
      { question: 'What is the letter before E in the row displayed above?', options: ['P', 'C', 'D', 'F'], answer: 'P' },
      { question: 'What is the letter between E and F in the row displayed above?', options: ['P', 'C', 'D', 'F'], answer: 'C' },
    ], size: 29.7, score: '20/40' },
    { line: 'E D F C Z P', questions: [
      { question: 'What is the letter after C in the row displayed above?', options: ['Z', 'E', 'P', 'F'], answer: 'Z' },
      { question: 'What is the third letter in the row displayed above?', options: ['Z', 'E', 'P', 'F'], answer: 'F' },
    ], size: 22.6, score: '20/30' },
    { line: 'F E L O P Z D', questions: [
      { question: 'What is the letter between P and D in the row displayed above?', options: ['D', 'Z', 'L', 'F'], answer: 'Z' },
      { question: 'What is the letter after E in the row displayed above?', options: ['T', 'I', 'L', 'F'], answer: 'L' },
    ], size: 18.55, score: '20/25' },
    { line: 'D E F P O T E C', questions: [
      { question: 'What is the letter between E and P in the row displayed above?', options: ['F', 'D', 'T', 'P'], answer: 'F' },
      { question: 'What is the 4th letter in the row displayed above?', options: ['F', 'B', 'T', 'P'], answer: 'P' },
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