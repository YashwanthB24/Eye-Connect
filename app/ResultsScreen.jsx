import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultsScreen = ({ route }) => {
  const { scores } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Results</Text>
      <Text style={styles.result}>Left Eye Score: {scores.left}</Text>
      <Text style={styles.result}>Right Eye Score: {scores.right}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  result: {
    fontSize: 18,
    marginVertical: 8,
  },
});

export default ResultsScreen;
