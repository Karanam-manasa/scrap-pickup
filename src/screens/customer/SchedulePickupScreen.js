
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomInput from '../../components/Input';
import CustomButton from '../../components/Button';
import { PickupContext } from '../../context/PickupContext';

const SchedulePickupScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const [address, setAddress] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { schedulePickup } = useContext(PickupContext);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showPicker = () => {
    setShowDatePicker(true);
  };

  const getFormattedDate = (dateObj) => {
    return dateObj.toISOString().split('T')[0];
  };

  const handleSubmit = async () => {
    const trimmedTimeSlot = timeSlot.trim();
    const trimmedAddress = address.trim();

    if (!trimmedTimeSlot) {
      Alert.alert('Invalid Input', 'Time slot cannot be empty.');
      return;
    }
  
    const timeRegex = /^\d{1,2}(-\d{1,2})?\s?(AM|PM)$/i;
    if (!timeRegex.test(trimmedTimeSlot)) {
        Alert.alert(
            'Invalid Time Slot',
            'Please use a valid format, for example: "10-11 AM" or "2 PM".'
        );
        return;
    }

    if (trimmedAddress.length < 10) {
      Alert.alert(
        'Invalid Address',
        'Please enter a more detailed address (at least 10 characters).'
      );
      return;
    }

    const pickupDetails = {
      pickupDate: getFormattedDate(date),
      timeSlot: trimmedTimeSlot,
      address: trimmedAddress,
    };

    await schedulePickup(pickupDetails);
    Alert.alert('Success', 'Your pickup has been scheduled!');
    navigation.goBack();
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pickup Date</Text>
      <TouchableOpacity onPress={showPicker} style={styles.dateInput}>
        <Text style={styles.dateText}>{getFormattedDate(date)}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}

      <Text style={styles.label}>Time Slot</Text>
      <CustomInput
        placeholder="e.g., 10-11 AM or 2 PM"
        value={timeSlot}
        onChangeText={setTimeSlot}
      />
      
      <Text style={styles.label}>Full Address</Text>
      <CustomInput
        placeholder="Your street, city, postal code"
        value={address}
        onChangeText={setAddress}
        multiline
        style={{ height: 100 }}
      />
      
      <CustomButton title="Confirm Schedule" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  dateInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9'
  },
  dateText: {
    fontSize: 16,
  }
});

export default SchedulePickupScreen;