import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Import images for left and right eye icons
import leftEyeIcon from '@/assets/images/lefteye-icon.png';
import rightEyeIcon from '@/assets/images/righteye-icon.png';

// Snellen digit chart data with number sequences, associated powers, and font sizes
const snellenDigitChart = [
  { line: "5", question: "What is the number being displayed?", size: 148.7, power: "+1.50 D", correctAnswer: "5", options: ["3", "5", "7", "1"] },
  { line: "3 8", question: "What is the first number being displayed?", size: 74.3, power: "+1.25 D", correctAnswer: "3", options: ["2", "3", "9", "6"] },
  { line: "4 2 7", question: "What is the last number being displayed?", size: 52, power: "+1.00 D", correctAnswer: "7", options: ["5", "4", "2", "7"] },
  { line: "9 1 6 5", question: "What is the number after 1 in the row displayed above?", size: 37.3, power: "+0.75 D", correctAnswer: "6", options: ["6", "3", "9", "2"] },
  { line: "2 5 8 3 4", question: "What is the number before 8 in the row displayed above?", size: 29.7, power: "+0.50 D", correctAnswer: "5", options: ["1", "5", "7", "3"] },
  { line: "6 9 1 4 7 3", question: "What is the number after 4 in the row displayed above?", size: 22.6, power: "+0.25 D", correctAnswer: "7", options: ["7", "2", "5", "6"] },
  { line: "4 7 2 5 1 9 8", question: "What is the number before 7 in the row displayed above?", size: 18.55, power: "0.00 D", correctAnswer: "4", options: ["8", "4", "6", "7"] },
  { line: "9 8 2 4 7 1 3 5", question: "What is the number between 2 and 4 in the row displayed above?", size: 14.82, power: "-0.25 D", correctAnswer: "4", options: ["3", "4", "9", "7"] }
];

const SnellenDigitChartTest = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [coveringLeftEye, setCoveringLeftEye] = useState(true);
  const [firstWrongPower, setFirstWrongPower] = useState(null);
  const [attemptedOnce, setAttemptedOnce] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [results, setResults] = useState({ leftEye: null, rightEye: null });

  // Handle answer selection
  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = snellenDigitChart[currentLine];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setAttemptedOnce(false);

      // If last line is correct, move to next eye or finish the test
      if (currentLine === snellenDigitChart.length - 1) {
        if (coveringLeftEye) {
          setResults((prev) => ({ ...prev, leftEye: currentQuestion.power }));
          setCoveringLeftEye(false);
          setCurrentLine(0);
        } else {
          setResults((prev) => ({ ...prev, rightEye: currentQuestion.power }));
          setTestComplete(true);
        }
      } else {
        setCurrentLine(currentLine + 1);
      }
    } else {
      if (!attemptedOnce) {
        setAttemptedOnce(true);
      } else {
        // Record the power for the first incorrect line
        if (!firstWrongPower) {
          setFirstWrongPower(currentQuestion.power);
        }

        if (coveringLeftEye) {
          setResults((prev) => ({ ...prev, leftEye: firstWrongPower }));
          setCoveringLeftEye(false);
          setCurrentLine(0);
        } else {
          setResults((prev) => ({ ...prev, rightEye: firstWrongPower }));
          setTestComplete(true);
        }
      }
    }
  };

  // Render the current line/question
  const renderCurrentLine = () => {
    const currentQuestion = snellenDigitChart[currentLine];

    return (
      <View style={styles.contentContainer}>
        <Image
          source={coveringLeftEye ? leftEyeIcon : rightEyeIcon}
          style={styles.eyeIcon}
          resizeMode="contain"
        />
        <Text style={[styles.snellenLine, { fontSize: currentQuestion.size }]}>
          {currentQuestion.line}
        </Text>
        <Text style={styles.question}>{currentQuestion.question}</Text>
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleAnswer(option)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // Render the test results
  const renderResults = () => {
    return (
      <ScrollView contentContainerStyle={styles.resultsContainer}>
        <Text style={styles.resultHeader}>Your Eye Test Results</Text>
        <View style={styles.eyeResultContainer}>
          <Text style={styles.eyeTitle}>Left Eye:</Text>
          <Text style={styles.resultText}>Power: {results.leftEye}</Text>
        </View>
        <View style={styles.eyeResultContainer}>
          <Text style={styles.eyeTitle}>Right Eye:</Text>
          <Text style={styles.resultText}>Power: {results.rightEye}</Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {testComplete ? renderResults() : renderCurrentLine()}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 20,
    },
    eyeIcon: {
      width: 150,
      height: 150,
      marginVertical: 20,
    },
    contentContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    snellenLine: {
      fontSize: 60,
      textAlign: 'center',
      marginBottom: 10,
    },
    question: {
      fontSize: 16,
      color: '#0057B7',
      textAlign: 'center',
      marginBottom: 20,
    },
    optionsContainer: {
      width: '100%',
    },
    optionButton: {
      backgroundColor: '#0057B7',
      paddingVertical: 10,
      paddingHorizontal: 30,
      marginVertical: 5,
      borderRadius: 25,
    },
    optionText: {
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
    },
    resultsContainer: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    resultHeader: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#0057B7',
      marginBottom: 20,
    },
    eyeResultContainer: {
      marginBottom: 20,
    },
    eyeTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#0057B7',
    },
    resultText: {
      fontSize: 16,
      color: '#333',
    },
  });
  
  export default SnellenDigitChartTest;
  
