import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { ref, set, push } from 'firebase/database';
import { db } from '../../FirebaseConfig';
import { Picker } from '@react-native-picker/picker';

// Liste des équipes participant à la CAN 2025
const equipesCan2025 = [
  "Algérie", "Angola", "Bénin", "Botswana", "Burkina Faso", "Burundi", "Cameroun",
  "Cap-Vert", "République centrafricaine", "Comores", "Congo", "République démocratique du Congo",
  "Djibouti", "Égypte", "Guinée équatoriale", "Érythrée", "Eswatini", "Éthiopie", "Gabon",
  "Gambie", "Ghana", "Guinée", "Guinée-Bissau", "Côte d'Ivoire", "Kenya", "Lesotho",
  "Libéria", "Libye", "Madagascar", "Malawi", "Mali", "Mauritanie", "Maurice", "Maroc",
  "Mozambique", "Namibie", "Niger", "Nigeria", "Rwanda", "Sao Tomé-et-Principe", "Sénégal",
  "Seychelles", "Sierra Leone", "Somalie", "Afrique du Sud", "Soudan", "Soudan du Sud",
  "Tanzanie", "Togo", "Tunisie", "Ouganda", "Zambie", "Zimbabwe"
];

// Liste des nationalités
const nationalities = [
  "Afghan", "Albanais", "Algérien", "Américain", "Andorran", "Angolais", "Antiguais", "Argentin", 
  "Arménien", "Australien", "Autrichien", "Azerbaïdjanais", "Bahamien", "Bahreïni", "Bangladais", 
  "Barbadien", "Bélizien", "Béninois", "Bhoutanais", "Biélorusse", "Bissau-Guinéen", "Bolivien", 
  "Bosnien", "Botswanais", "Brésilien", "Brunéien", "Bulgare", "Burkinabé", "Burundais", 
  "Cambodgien", "Camerounais", "Canadien", "Cap-verdien", "Centrafricain", "Chilien", "Chinois", 
  "Colombien", "Comorien", "Congolais", "Costaricien", "Croate", "Cubaine", "Danois", "Djiboutien", 
  "Dominicain", "Égyptien", "Équatorien", "Érythréen", "Espagnol", "Estonien", "Fidjien", 
  "Filipino", "Gabonais", "Gambien", "Ghanéen", "Grec", "Grenadien", "Guatémaltèque", "Guinée-Bissau", 
  "Guinéen", "Haïtien", "Hondurien", "Hongrois", "Ivoirien", "Israélien", "Italien", "Jamaïcain", 
  "Japonais", "Jordanien", "Kazakh", "Kényan", "Kirghiz", "Koweïtien", "Laotien", "Letton", 
  "Libanais", "Libérien", "Libyen", "Lituanien", "Luxembourgeois", "Madérien", "Malaisien", "Malawite", 
  "Malien", "Maltais", "Marocain", "Mauricien", "Mauritanien", "Mexicain", "Monégasque", 
  "Mongol", "Mozambicain", "Namibien", "Nauruan", "Népali", "Nigerien", "Nigérian", "Nippon", 
  "Norvégien", "Omanien", "Pakistanais", "Palestinien", "Panaméen", "Papouan", "Paraguayen", 
  "Péruvien", "Polonais", "Portugais", "Qatarien", "Roumain", "Russe", "Rwandais", "Saint-Lucien", 
  "Saint-Marinais", "Saint-Toméen", "Salvadorien", "Samoan", "Sénégalais", "Serbe", "Seychellois", 
  "Singapourien", "Soudanais", "Sri-Lankais", "Soudanais", "Sud-Coréen", "Suédois", "Suisse", 
  "Syrien", "Tadjik", "Tanzanien", "Thaïlandais", "Togolais", "Tunisien", "Turc", "Ukrainien", 
  "Uruguayen", "Vénézuélien", "Vietnamien", "Yéménite", "Zambien", "Zimbabwéen"
];

export default function Create() {
  const [ID, setID] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [age, setAge] = useState('');
  const [equipe, setEquipe] = useState('');
  const [nationalite, setNationalite] = useState('');
  const [showEquipePicker, setShowEquipePicker] = useState(false);
  const [showNationalitePicker, setShowNationalitePicker] = useState(false);

  function create() {
    // Générer une clé unique pour l'utilisateur
    const userRef = ref(db, 'users');
    const newUserRef = push(userRef);

    set(newUserRef, {
      ID:ID,
      Nom: nom,
      Prenom: prenom,
      Age: age,
      Nationalité: nationalite,
      Equipe: equipe,
    })
      .then(() => {
        Alert.alert('Data created successfully');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create User</Text>
      <TextInput
        style={styles.input}
        value={ID}
        onChangeText={setID}
        placeholder="ID user"
      />
      <TextInput
        style={styles.input}
        value={nom}
        onChangeText={setNom}
        placeholder="Nom"
      />
      <TextInput
        style={styles.input}
        value={prenom}
        onChangeText={setPrenom}
        placeholder="Prenom"
      />
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Age"
        keyboardType="numeric"
      />
      <TouchableOpacity 
        style={styles.pickerButton} 
        onPress={() => setShowNationalitePicker(!showNationalitePicker)}
      >
        <Text style={styles.pickerButtonText}>{nationalite || "Sélectionner une nationalité"}</Text>
      </TouchableOpacity>
      {showNationalitePicker && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={nationalite}
            onValueChange={(itemValue) => {
              setNationalite(itemValue);
              setShowNationalitePicker(false);
            }}
            style={styles.picker}
            mode="dropdown"
          >
            <Picker.Item label="Sélectionner une nationalité" value="" />
            {nationalities.map((nation, index) => (
              <Picker.Item key={index} label={nation} value={nation} />
            ))}
          </Picker>
        </View>
      )}
      <TouchableOpacity 
        style={styles.pickerButton} 
        onPress={() => setShowEquipePicker(!showEquipePicker)}
      >
        <Text style={styles.pickerButtonText}>{equipe || "Sélectionner une équipe"}</Text>
      </TouchableOpacity>
      {showEquipePicker && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={equipe}
            onValueChange={(itemValue) => {
              setEquipe(itemValue);
              setShowEquipePicker(false);
            }}
            style={styles.picker}
            mode="dropdown"
          >
            <Picker.Item label="Sélectionner une équipe" value="" />
            {equipesCan2025.map((equipe, index) => (
              <Picker.Item key={index} label={equipe} value={equipe} />
            ))}
          </Picker>
        </View>
      )}
      <Button title="Create" onPress={create} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  pickerButton: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  pickerButtonText: {
    lineHeight: 40,
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 150,
    width: '100%',
  },
});
