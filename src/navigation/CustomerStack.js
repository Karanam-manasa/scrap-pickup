import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/customer/DashboardScreen';
import SchedulePickupScreen from '../screens/customer/SchedulePickupScreen';
import OrderHistoryScreen from '../screens/customer/OrderHistoryScreen';
import ApprovalScreen from '../screens/customer/ApprovalScreen';

const Stack = createStackNavigator();

const CustomerStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'My Dashboard' }} />
    <Stack.Screen name="SchedulePickup" component={SchedulePickupScreen} options={{ title: 'Schedule a Pickup' }} />
    <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: 'My Order History' }} />
    <Stack.Screen name="ApprovalScreen" component={ApprovalScreen} options={{ title: 'Approve Pickup' }} />
  </Stack.Navigator>
);

export default CustomerStack;