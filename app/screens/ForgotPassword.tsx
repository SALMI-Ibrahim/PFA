import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Firebase_AUTH } from '../../FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const auth = Firebase_AUTH;

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Email de réinitialisation envoyé !', 'Veuillez vérifier votre email pour réinitialiser votre mot de passe.');
    } catch (error: any) {
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Réinitialiser le mot de passe" onPress={handlePasswordReset} />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
});
