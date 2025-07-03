import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return '#ffc107';
    case 'Accepted': return '#17a2b8';
    case 'In-Process': return '#007bff';
    case 'Pending for Approval': return '#fd7e14';
    case 'Completed': return '#28a745';
    default: return '#6c757d';
  }
};

const PickupCard = ({ item, onPress, userRole }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.date}>{item.pickupDate} at {item.timeSlot}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.replace(/_/g, ' ')}</Text>
        </View>
      </View>
      <Text style={styles.address}>{item.address}</Text>
      {userRole === 'partner' && (
        <Text style={styles.customerInfo}>Customer: {item.customerName} ({item.customerPhone})</Text>
      )}
      {item.pickupCode && userRole === 'customer' && (
        <Text style={styles.pickupCode}>Pickup Code: {item.pickupCode}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  customerInfo: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
    marginTop: 5,
  },
  pickupCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#e7f3ff',
    padding: 8,
    borderRadius: 6,
  },
});

export default PickupCard;