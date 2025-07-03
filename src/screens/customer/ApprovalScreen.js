
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { PickupContext } from '../../context/PickupContext';
import CustomButton from '../../components/Button';

const ApprovalScreen = ({ route, navigation }) => {
  const { pickupId } = route.params;
  const [pickup, setPickup] = useState(null);
  const { fetchPickupById, completePickup, loading } = useContext(PickupContext);

  useEffect(() => {
    const loadPickup = async () => {
      const data = await fetchPickupById(pickupId);
      setPickup(data);
    };
    loadPickup();
  }, [pickupId]);

  const handleApprove = async () => {
    await completePickup(pickupId);
    Alert.alert("Success", "Pickup has been marked as completed!");
    navigation.goBack();
  };

  if (loading || !pickup) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pickup Details for Approval</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Item List</Text>
        {pickup.items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name} ({item.quantity} kg)</Text>
            <Text style={styles.itemPrice}>₹ {item.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalAmount}>₹ {pickup.totalAmount.toFixed(2)}</Text>
      </View>

      <CustomButton title="Approve & Complete" onPress={handleApprove} style={{ marginTop: 30 }}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5, marginBottom: 10 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  itemName: { fontSize: 16 },
  itemPrice: { fontSize: 16, fontWeight: 'bold' },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingTop: 20, borderTopWidth: 2, borderTopColor: '#333' },
  totalLabel: { fontSize: 20, fontWeight: 'bold' },
  totalAmount: { fontSize: 20, fontWeight: 'bold', color: '#28a745' },
});

export default ApprovalScreen;