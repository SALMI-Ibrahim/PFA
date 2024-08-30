import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Alert, ScrollView } from 'react-native';
import { ref, remove, onValue } from 'firebase/database';
import { db } from '../../FirebaseConfig';
import { Picker } from '@react-native-picker/picker';

export default function DeleteUser() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  useEffect(() => {
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
    });
  }, []);
  function deleteUser() {
    if (!selectedUser) {
      Alert.alert('Please select a user to delete');
      return;
    }
    const userRef = ref(db, 'users/' + selectedUser);
    remove(userRef)
      .then(() => {
        Alert.alert('User deleted successfully');
        setSelectedUser('');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Delete User</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedUser}
          onValueChange={(itemValue) => setSelectedUser(itemValue)}
          style={styles.picker}
          mode="dropdown"
        >
          <Picker.Item label="Select a user" value="" />
          {users.map((user) => (
            <Picker.Item key={user.id} label={`${user.Nom} ${user.Prenom}`} value={user.id} />
          ))}
        </Picker>
      </View>
      <Button title="Delete" onPress={deleteUser} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
