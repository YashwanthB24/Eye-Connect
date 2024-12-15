import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {
  const navigation = useNavigation();

  const handleBeginTest = () => {
    // Optionally reset the navigation stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'TestSelectionScreen' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Welcome to <Text style={{ fontWeight: 'bold' }}>EyeConnect</Text>
        </Text>
        <Text style={styles.headerSubtitle}>Your vision care companion</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Start Your Free Eye Test</Text>
        <Text style={styles.cardSubtitle}>Take a quick test to assess your vision health</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleBeginTest}  // Use the new function to reset navigation
        >
          <Text style={styles.buttonText}>Begin Test</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    backgroundColor: '#0057B7',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3D4ED1',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
