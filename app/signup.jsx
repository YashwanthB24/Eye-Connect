import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import healthykids from '@/assets/images/Healthykidicon.png';
import googleIcon from '@/assets/images/google-icon.png'; // Ensure the path is correct
import appleIcon from '@/assets/images/apple-icon.png';   // Ensure the path is correct

export default function SignInSignUp() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [focusedField, setFocusedField] = useState(null);
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/HomePage');
  };

  const renderInput = (placeholder, isPassword = false) => (
    <View style={[styles.inputContainer, focusedField === placeholder && styles.focusedInput]}>
      <Text style={styles.inputLabel}>{placeholder}</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        secureTextEntry={isPassword}
        onFocus={() => setFocusedField(placeholder)}
        onBlur={() => setFocusedField(null)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={healthykids} style={styles.logoImage} resizeMode="contain" />
        <Text style={styles.visionText}>Vision <Text style={styles.gradientText}>Acuity Test</Text></Text>
      </View>

      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={() => setIsSignIn(true)}>
          <Text style={[styles.toggleText, isSignIn && styles.activeTab]}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsSignIn(false)}>
          <Text style={[styles.toggleText, !isSignIn && styles.activeTab]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        {isSignIn ? (
          <View>
            {renderInput('Email')}
            {renderInput('Password', true)}
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {renderInput('Email')}
            {renderInput('Password', true)}
            {renderInput('Confirm Password', true)}
            <TouchableOpacity style={styles.button} onPress={() => setIsSignIn(true)}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.orText}>Or sign up with</Text>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={googleIcon} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={appleIcon} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff', // Set container background to white
      padding: 20,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 30,
    },
    logoImage: {
      width: 100,
      height: 100,
    },
    visionText: {
      fontSize: 27,
      marginTop: 10,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#0057B7', // Default to orange as React Native does not support gradient text natively
    },
    gradientText: {
      fontWeight: 'bold',
      color: '#0057B7', // Placeholder for gradient color effect (orange, blue, and green)
    },
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    toggleText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginHorizontal: 20,
      color: 'gray',
    },
    activeTab: {
      color: '#0057B7',
      textDecorationLine: 'underline',
      textDecorationColor: '#0057B7',
      textDecorationThickness: 4,
    },
    formContainer: {
      backgroundColor: '#fff', // White background for the container
      borderRadius: 20,
      padding: 20,
      width: '100%',
      elevation: 2,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 15,
      marginBottom: 12,
      backgroundColor: '#fff',
    },
    focusedInput: {
      borderColor: '#0057B7',
    },
    inputLabel: {
      position: 'absolute',
      top: -10,
      left: 20,
      backgroundColor: '#fff',
      zIndex: 1,
      paddingHorizontal: 5,
      color: '#555',
      fontSize: 14,
    },
    input: {
      fontSize: 14,
      color: '#333',
    },
    button: {
      backgroundColor: '#0057B7',
      paddingVertical: 15,
      borderRadius: 25,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    forgotPassword: {
      color: '#0057B7',
      textDecorationLine: 'underline',
      textAlign: 'center',
      marginTop: 15,
      fontSize: 16,
    },
    orText: {
      textAlign: 'center',
      marginVertical: 20,
      fontSize: 16,
      color: '#555',
    },
    socialButtonsContainer: {
      marginTop: 10,
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingVertical: 12,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: '#ddd',
      marginBottom: 15,
      justifyContent: 'center',
    },
    socialIcon: {
      width: 24,
      height: 24,
      marginRight: 10,
    },
    socialButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#555',
    },
  });
  
  