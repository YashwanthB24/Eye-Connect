import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the arrow icon

const TestSelectionScreen = () => {
  const navigation = useNavigation();

  // Set up the back button in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Ionicons name="arrow-back" size={24} color="#4CAF50" style={styles.backButton} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Test</Text>
      <Text style={styles.subtitle}>Select the chart type that suits you best</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Physical Snellen Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Physical Snellen Chart</Text>
          <Text style={styles.cardSubtitle}>For Latin letter readers</Text>
          <Text style={styles.cardDescription}>
            The Snellen chart uses letters of the Latin alphabet in decreasing size. Note that this test requires a physical chart.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('PhysicalSnellenTest')}
          >
            <Text style={styles.buttonText}>Select Snellen Chart</Text>
          </TouchableOpacity>
        </View>

        {/* Digital Snellen Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Snellen Chart</Text>
          <Text style={styles.cardSubtitle}>For Latin letter readers</Text>
          <Text style={styles.cardDescription}>
            The Snellen chart uses letters of the Latin alphabet in decreasing size.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('DigitalSnellenTest')}
          >
            <Text style={styles.buttonText}>Select Snellen Chart</Text>
          </TouchableOpacity>
        </View>

        {/* Snellen Digit Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Snellen Digit Chart</Text>
          <Text style={styles.cardSubtitle}>For numeric readers</Text>
          <Text style={styles.cardDescription}>
            The Snellen digit chart uses numbers in decreasing size for testing visual acuity.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SnellenDigitTest')}
          >
            <Text style={styles.buttonText}>Select Digit Chart</Text>
          </TouchableOpacity>
        </View>

        {/* Tumbling E Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tumbling E Chart</Text>
          <Text style={styles.cardSubtitle}>For non-alphabet readers</Text>
          <Text style={styles.cardDescription}>
            The Tumbling E chart uses the letter 'E' in different orientations to assess visual acuity.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('TumblingETest')}
          >
            <Text style={styles.buttonText}>Select Tumbling E Chart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 12,
    color: '#777',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6200EE',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TestSelectionScreen;
