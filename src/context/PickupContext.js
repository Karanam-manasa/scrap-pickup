
import React, { createContext, useState, useContext } from 'react';
import { getPickups as apiGetPickups, getPickupById as apiGetPickupById, createPickup as apiCreatePickup, updatePickup as apiUpdatePickup } from '../api/apiService';
import { AuthContext } from './AuthContext';

export const PickupContext = createContext();

export const PickupProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleError = (error, context) => {
    console.error(`Error in ${context}:`, error);
    setLoading(false);
  };

  const fetchPickups = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await apiGetPickups();
      if (user.role === 'customer') {
        setPickups(response.data.filter(p => p.customerId === user.id));
      } else if (user.role === 'partner') {
        setPickups(response.data.filter(p => p.status === 'Pending' || p.partnerId === user.id));
      }
    } catch (error) {
      handleError(error, 'fetchPickups');
    } finally {
      setLoading(false);
    }
  };

  const fetchPickupById = async (id) => {
    setLoading(true);
    try {
      const response = await apiGetPickupById(id);
      return response.data;
    } catch (error) {
      handleError(error, 'fetchPickupById');
    } finally {
      setLoading(false);
    }
  };
  
  const schedulePickup = async (details) => {
    setLoading(true);
    const newPickup = {
      ...details,
      customerId: user.id,
      customerName: user.name,
      customerPhone: user.phone,
      status: 'Pending',
      partnerId: null,
      pickupCode: null,
      items: [],
      totalAmount: 0,
    };
    try {
      await apiCreatePickup(newPickup);
      await fetchPickups(); // Refresh list
    } catch (error) {
      handleError(error, 'schedulePickup');
    }
  };

  const acceptPickup = async (pickupId) => {
    const pickupCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    try {
      await apiUpdatePickup(pickupId, { 
        status: 'Accepted', 
        partnerId: user.id,
        pickupCode: pickupCode,
      });
      await fetchPickups();
    } catch (error) {
      handleError(error, 'acceptPickup');
    }
  };

  const startPickup = async (pickupId) => {
    try {
      await apiUpdatePickup(pickupId, { status: 'In-Process' });
    } catch (error) {
      handleError(error, 'startPickup');
    }
  };

  const submitForApproval = async (pickupId, items, totalAmount) => {
    try {
      await apiUpdatePickup(pickupId, {
        status: 'Pending for Approval',
        items: items,
        totalAmount: totalAmount,
      });
    } catch (error) {
      handleError(error, 'submitForApproval');
    }
  };
  
  const completePickup = async (pickupId) => {
    try {
      await apiUpdatePickup(pickupId, { status: 'Completed' });
      await fetchPickups();
    } catch (error) {
      handleError(error, 'completePickup');
    }
  };

  return (
    <PickupContext.Provider value={{ pickups, loading, fetchPickups, fetchPickupById, schedulePickup, acceptPickup, startPickup, submitForApproval, completePickup }}>
      {children}
    </PickupContext.Provider>
  );
};