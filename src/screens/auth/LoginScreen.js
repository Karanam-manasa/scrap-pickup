// src/screens/auth/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CustomInput from '../../components/Input';
import CustomButton from '../../components/Button';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');

  const handleLogin = () => {
    if (phone.length === 10) {
      // Navigate to OTP screen, passing the phone number
      navigation.navigate('OTP', { phone });
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid 10-digit phone number.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Enter your phone number to continue</Text>
      <CustomInput
        value={phone}
        onChangeText={setPhone}
        placeholder="10-digit phone number"
        keyboardType="phone-pad"
        maxLength={10}
      />
      <CustomButton title="Get OTP" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
});

export default LoginScreen;