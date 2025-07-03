
import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CustomerStack from './CustomerStack';
import PartnerStack from './PartnerStack';
import AuthStack from './AuthStack';

const AppNavigator = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <AuthStack />;
  }
  
  if (user.role === 'customer') {
    return <CustomerStack />;
  }

  if (user.role === 'partner') {
    return <PartnerStack />;
  }

  // Fallback to auth stack if role is not defined
  return <AuthStack />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;