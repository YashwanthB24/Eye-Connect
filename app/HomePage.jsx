import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

// Importing icons
import eyeIcon from '@/assets/images/eye-icon.png';
import shieldIcon from '@/assets/images/shield-icon.png';
import calendarIcon from '@/assets/images/calendar-icon.png';
import doctorAdviceImage from '@/assets/images/doctor-advice.png';

export default function HomePage() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Welcome to EyeConnect Box */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Welcome to <Text style={{ fontWeight: 'bold' }}>EyeConnect</Text>
        </Text>
        <Text style={styles.headerSubtitle}>Your vision care companion</Text>
      </View>

      {/* Start Your Free Eye Test Box */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Start Your Free Eye Test</Text>
        <Text style={styles.cardSubtitle}>Take a quick test to assess your vision health</Text>
        <TouchableOpacity style={styles.beginTestButton} onPress={() => router.push('/Introduction')}>
          <Text style={styles.buttonText}>Begin Test</Text>
        </TouchableOpacity>
      </View>

      {/* Vision Acuity Test Benefits Box */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Vision Acuity Test Benefits</Text>
        <View style={styles.benefitItem}>
          <Image source={eyeIcon} style={styles.icon} />
          <Text style={styles.benefitText}>Analyze eye symptoms</Text>
        </View>
        <View style={styles.benefitItem}>
          <Image source={shieldIcon} style={styles.icon} />
          <Text style={styles.benefitText}>Preliminary Eye acuity test score</Text>
        </View>
        <View style={styles.benefitItem}>
          <Image source={calendarIcon} style={styles.icon} />
          <Text style={styles.benefitText}>Guide when to visit a doctor</Text>
        </View>
      </View>

      {/* Doctor's Advice Box */}
      <View style={styles.card}>
        <Text style={styles.doctorAdviceTitle}>Doctor's Advice</Text>
        <Image source={doctorAdviceImage} style={styles.adviceImage} />
        <Text style={styles.adviceText}>Early detection can save your eyes.</Text>
      </View>
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
    marginTop: 0, // Touches the top of the screen
    marginBottom: 20,
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
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  beginTestButton: {
    backgroundColor: '#0057B7',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  benefitText: {
    fontSize: 14,
    color: '#555',
  },
  doctorAdviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  adviceImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  adviceText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});
