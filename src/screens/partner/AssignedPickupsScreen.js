
import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { PickupContext } from '../../context/PickupContext';
import { AuthContext } from '../../context/AuthContext';
import PickupCard from '../../components/PickupCard';
import CustomButton from '../../components/Button';

const AssignedPickupsScreen = ({ navigation }) => {
  const { pickups, loading, fetchPickups } = useContext(PickupContext);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
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

  return (
    <View style={styles.container}>
      <CustomButton title="Logout" onPress={logout} style={{ margin: 10, backgroundColor: '#dc3545' }} />
      {loading && pickups.length === 0 ? (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={pickups}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PickupCard
              item={item}
              userRole={user.role}
              onPress={() => navigation.navigate('PickupDetails', { pickupId: item.id })}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchPickups} />
          }
          ListEmptyComponent={<Text style={styles.emptyText}>No available pickups.</Text>}
          contentContainerStyle={{ padding: 10 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#888' },
});

export default AssignedPickupsScreen;