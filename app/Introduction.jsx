import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router'; // Import the router

// Icons for the upload box
import uploadIcon from '@/assets/images/upload-icon.png';
import cameraIcon from '@/assets/images/camera-icon.png';

export default function Introduction() {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter(); // Initialize the router

  // Function to handle image selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* First Box - Visual Acuity Test */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Visual Acuity Test</Text>
        <Text style={styles.headerSubtitle}>Assess your vision from home</Text>
      </View>

      {/* Spacer */}
      <View style={styles.spacer} />

      {/* Welcome to the Test Box */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome to the Test</Text>
        <Text style={styles.cardText}>
          This visual acuity test will help you assess your vision health. You’ll be shown a series of letters in different sizes, similar to what you’d see at an eye doctor’s office.
        </Text>
        <Text style={styles.warningText}>
          Remember, this test is not a substitute for a professional eye exam.
        </Text>
      </View>

      {/* Before We Begin Box */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Before We Begin</Text>
        <Text style={styles.cardText}>👣 Stand 20 feet (6 meters) away from your device</Text>
        <Text style={styles.cardText}>💡 Ensure you’re in a well-lit room</Text>
        <Text style={styles.cardText}>📱 Hold your device at eye level</Text>
      </View>

      {/* Image Upload Placeholder */}
      <TouchableOpacity style={styles.imageUploadContainer} onPress={pickImage}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
        ) : (
          <View style={styles.uploadPlaceholder}>
            <Image source={uploadIcon} style={styles.uploadIcon} />
            <Text style={styles.imagePlaceholderText}>Tap to upload an image</Text>
            <Image source={cameraIcon} style={styles.cameraIcon} />
          </View>
        )}
      </TouchableOpacity>

      {/* Start Test Button */}
      <TouchableOpacity style={styles.startTestButton} onPress={() => router.push('/TestSelection')}>
        <Text style={styles.buttonText}>Start Test</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#0057B7',
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    marginTop: 0,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  spacer: {
    height: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
    marginHorizontal: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  warningText: {
    fontSize: 14,
    color: '#d9534f',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageUploadContainer: {
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    elevation: 2,
  },
  uploadPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  cameraIcon: {
    width: 40,
    height: 40,
    marginTop: 10,
  },
  imagePlaceholderText: {
    color: '#555',
    fontSize: 16,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  startTestButton: {
    backgroundColor: '#0057B7',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
