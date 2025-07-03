import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AssignedPickupsScreen from '../screens/partner/AssignedPickupsScreen';
import PickupDetailsScreen from '../screens/partner/PickupDetailsScreen';

const Stack = createStackNavigator();

const PartnerStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AssignedPickups" component={AssignedPickupsScreen} options={{ title: 'Available Pickups' }} />
    <Stack.Screen name="PickupDetails" component={PickupDetailsScreen} options={{ title: 'Pickup Details' }} />
  </Stack.Navigator>
);

export default PartnerStack;