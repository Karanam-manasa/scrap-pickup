
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../../components/Button';
import { AuthContext } from '../../context/AuthContext';

const DashboardScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user?.name || user?.phone}!</Text>
      <Text style={styles.infoText}>Ready to schedule your next scrap pickup?</Text>
      <CustomButton
        title="Schedule Pickup"
        onPress={() => navigation.navigate('SchedulePickup')}
      />
      <CustomButton
        title="View Order History"
        onPress={() => navigation.navigate('OrderHistory')}
        style={{ backgroundColor: '#6c757d' }}
      />
      <View style={styles.logoutButtonContainer}>
        <CustomButton
          title="Logout"
          onPress={logout}
          style={{ backgroundColor: '#dc3545' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  logoutButtonContainer: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
  }
});

export default DashboardScreen;