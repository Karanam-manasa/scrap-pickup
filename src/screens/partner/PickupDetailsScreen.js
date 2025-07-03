
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { PickupContext } from '../../context/PickupContext';
import CustomButton from '../../components/Button';
import CustomInput from '../../components/Input';

const PickupDetailsScreen = ({ route, navigation }) => {
  const { pickupId } = route.params;
  const [pickup, setPickup] = useState(null);
  const { fetchPickupById, acceptPickup, startPickup, submitForApproval, loading } = useContext(PickupContext);

  const [pickupCodeInput, setPickupCodeInput] = useState('');
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQty, setItemQty] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const loadData = async () => {
    const data = await fetchPickupById(pickupId);
    setPickup(data);
    if(data.items.length > 0) {
        setItems(data.items)
    }
  };

  useEffect(() => {
    loadData();
  }, [pickupId]);

  const handleAccept = async () => {
    await acceptPickup(pickupId);
    loadData(); 
  };
  
  const handleStart = async () => {
      if (pickupCodeInput.toUpperCase() === pickup.pickupCode.toUpperCase()) {
          await startPickup(pickupId);
          loadData();
      } else {
          Alert.alert("Error", "Pickup code is incorrect.");
      }
  }

  const handleAddItem = () => {
      if(itemName && itemQty && itemPrice) {
          setItems([...items, {name: itemName, quantity: parseFloat(itemQty), price: parseFloat(itemPrice)}]);
          setItemName('');
          setItemQty('');
          setItemPrice('');
      } else {
          Alert.alert("Error", "Please fill all item fields.")
      }
  }

  const handleSubmitForApproval = async () => {
      const totalAmount = items.reduce((sum, item) => sum + item.price, 0);
      await submitForApproval(pickupId, items, totalAmount);
      Alert.alert("Success", "Submitted to customer for approval.");
      navigation.goBack();
  }

  if (loading && !pickup) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!pickup) {
    return <Text>No pickup data found.</Text>;
  }

  // --- Render different UI based on status ---
  const renderContent = () => {
    switch(pickup.status) {
        case 'Pending':
            return <CustomButton title="Accept Pickup" onPress={handleAccept} />;

        case 'Accepted':
            return (
                <View>
                    <Text style={styles.label}>Enter Pickup Code from Customer:</Text>
                    <CustomInput value={pickupCodeInput} onChangeText={setPickupCodeInput} placeholder="e.g., A5B2C7" autoCapitalize="characters" />
                    <CustomButton title="Start Pickup" onPress={handleStart} />
                </View>
            );

        case 'In-Process':
            const total = items.reduce((sum, item) => sum + item.price, 0);
            return (
                <View>
                    <Text style={styles.sectionTitle}>Add Scrap Items</Text>
                    <CustomInput value={itemName} onChangeText={setItemName} placeholder="Item Name (e.g., Newspaper)" />
                    <CustomInput value={itemQty} onChangeText={setItemQty} placeholder="Quantity (e.g., 5.5 kg)" keyboardType="numeric" />
                    <CustomInput value={itemPrice} onChangeText={setItemPrice} placeholder="Price (e.g., 50)" keyboardType="numeric" />
                    <CustomButton title="Add Item" onPress={handleAddItem} style={{backgroundColor: '#17a2b8'}} />
                    
                    <Text style={styles.sectionTitle}>Items Added</Text>
                    {items.map((item, i) => <Text key={i}>{item.name} ({item.quantity} kg) - ₹{item.price}</Text>)}
                    <Text style={styles.totalText}>Total: ₹{total.toFixed(2)}</Text>
                    
                    <CustomButton title="Submit for Approval" onPress={handleSubmitForApproval} style={{marginTop: 20}} />
                </View>
            );
        
        case 'Pending for Approval':
        case 'Completed':
            return <Text style={styles.infoText}>This pickup is now in '{pickup.status}' status. No further actions are needed from you.</Text>

        default:
            return <Text>Unknown status</Text>
    }
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pickup for {pickup.customerName}</Text>
        <Text style={styles.status}>Status: {pickup.status}</Text>
      </View>
      <View style={styles.details}>
          <Text>{pickup.address}</Text>
          <Text>{pickup.pickupDate} @ {pickup.timeSlot}</Text>
      </View>
      <View style={styles.workflowContainer}>
        {renderContent()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
    title: { fontSize: 22, fontWeight: 'bold' },
    status: { fontSize: 16, color: '#666', marginTop: 5 },
    details: { padding: 20, backgroundColor: '#f9f9f9' },
    workflowContainer: { padding: 20 },
    label: { fontSize: 16, marginBottom: 10 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 15 },
    totalText: { fontSize: 18, fontWeight: 'bold', alignSelf: 'flex-end', marginTop: 10},
    infoText: {fontSize: 16, color: 'gray', fontStyle: 'italic', textAlign: 'center'}
});

export default PickupDetailsScreen;