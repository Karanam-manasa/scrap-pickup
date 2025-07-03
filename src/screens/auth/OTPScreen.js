
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CustomInput from '../../components/Input';
import CustomButton from '../../components/Button';
import { AuthContext } from '../../context/AuthContext';
import { MOCKED_OTP } from '../../utils/constants';

const OTPScreen = ({ route }) => {
  const { phone } = route.params;
  const [otp, setOtp] = useState('');
  const { login } = useContext(AuthContext);

  const handleVerify = async () => {
    if (otp === MOCKED_OTP) {
      try {
        await login(phone);
        // Navigation will be handled automatically by AppNavigator
      } catch (error) {
        Alert.alert('Login Failed', 'User with this phone number not found.');
      }
    } else {
      Alert.alert('Invalid OTP', 'The OTP you entered is incorrect.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter the 6-digit OTP sent to {phone}</Text>
      <Text style={styles.mockInfo}>(Hint: The OTP is {MOCKED_OTP})</Text>
      <CustomInput
        value={otp}
        onChangeText={setOtp}
        placeholder="6-digit OTP"
        keyboardType="number-pad"
        maxLength={6}
      />
      <CustomButton title="Verify & Login" onPress={handleVerify} />
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
    marginBottom: 10,
  },
  mockInfo: {
    fontSize: 14,
    textAlign: 'center',
    color: 'orange',
    marginBottom: 20,
  },
});

export default OTPScreen;