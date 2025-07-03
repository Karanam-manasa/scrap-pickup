
import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { PickupContext } from '../../context/PickupContext';
import { AuthContext } from '../../context/AuthContext';
import PickupCard from '../../components/PickupCard';

const OrderHistoryScreen = ({ navigation }) => {
  const { pickups, loading, fetchPickups } = useContext(PickupContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch pickups when the screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPickups();
    });
    
  
    const interval = setInterval(() => {
        fetchPickups();
    }, 15000); 

    return () => {
        unsubscribe();
        clearInterval(interval);
    }
  }, [navigation]);

  if (loading && pickups.length === 0) {
      return <ActivityIndicator size="large" style={{flex: 1}} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pickups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PickupCard
            item={item}
            userRole={user.role}
            onPress={() => {
              if (item.status === 'Pending for Approval') {
                navigation.navigate('ApprovalScreen', { pickupId: item.id });
              }
            }}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchPickups} />
        }
        ListEmptyComponent={<Text style={styles.emptyText}>No pickup requests found.</Text>}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});

export default OrderHistoryScreen;