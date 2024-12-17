import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Import images for left and right eye icons
import leftEyeIcon from '@/assets/images/lefteye-icon.png';
import rightEyeIcon from '@/assets/images/righteye-icon.png';

// Snellen chart data with letter sequences, associated powers, and font sizes
const snellenChart = [
  { line: "E", question: "What is the letter being displayed?", size: 148.7, power: "+1.50 D", correctAnswer: "E", options: ["F", "B", "E", "C"] },
  { line: "F P", question: "What is the first letter being displayed?", size: 74.3, power: "+1.25 D", correctAnswer: "F", options: ["F", "B", "P", "C"] },
  { line: "T O Z", question: "What is the last letter being displayed?", size: 52, power: "+1.00 D", correctAnswer: "Z", options: ["O", "C", "T", "Z"] },
  { line: "L P E D", question: "What is the letter after E in the row displayed above?", size: 37.3, power: "+0.75 D", correctAnswer: "D", options: ["P", "C", "D", "F"] },
  { line: "P E C F D", question: "What is the letter before E in the row displayed above?", size: 29.7, power: "+0.50 D", correctAnswer: "P", options: ["P", "C", "D", "F"] },
  { line: "E D F C Z P", question: "What is the letter after C in the row displayed above?", size: 22.6, power: "+0.25 D", correctAnswer: "Z", options: ["Z", "E", "P", "F"] },
  { line: "F E L O P Z D", question: "What is the letter before E in the row displayed above?", size: 18.55, power: "0.00 D", correctAnswer: "F", options: ["D", "O", "L", "F"] },
  { line: "D E F P O T E C", question: "What is the letter between E and P in the row displayed above?", size: 14.82, power: "-0.25 D", correctAnswer: "F", options: ["F", "D", "T", "P"] }
];

const SnellenChartTest = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [coveringLeftEye, setCoveringLeftEye] = useState(true);
  const [firstWrongPower, setFirstWrongPower] = useState(null);
  const [attemptedOnce, setAttemptedOnce] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [results, setResults] = useState({ leftEye: null, rightEye: null });

  // Handle answer selection
  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = snellenChart[currentLine];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setAttemptedOnce(false);

      // If last line is correct, move to next eye or finish the test
      if (currentLine === snellenChart.length - 1) {
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
    const currentQuestion = snellenChart[currentLine];

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

export default SnellenChartTest;
