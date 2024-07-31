import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { db } from '../../FirebaseConfig';

const Profile = ({ route }: any) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [age, setAge] = useState('');
  const [equipe, setEquipe] = useState('');
  const [nationalite, setNationalite] = useState('');

  const userId = route.params.ID; // Assuming  is passed in route params

  useEffect(() => {
    const userRef = ref(db, 'users/' + userId);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setNom(data.Nom);
        setPrenom(data.Prenom);
        setAge(data.Age);
        setNationalite(data.Nationalité);
        setEquipe(data.Equipe);
      }
    });
  }, [userId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nom:</Text>
        <Text style={styles.info}>{nom}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Prénom:</Text>
        <Text style={styles.info}>{prenom}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Âge:</Text>
        <Text style={styles.info}>{age}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nationalité:</Text>
        <Text style={styles.info}>{nationalite}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Équipe préférée:</Text>
        <Text style={styles.info}>{equipe}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    color: '#555',
  },
});

export default Profile;
