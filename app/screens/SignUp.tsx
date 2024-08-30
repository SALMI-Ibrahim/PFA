import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { Firebase_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '../../types';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = Firebase_AUTH;
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigation.navigate('create');
      alert('Check your email');
    } catch (error: any) {
      alert('Sign up failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.aff}>
        <View style={styles.container}>
          <Image 
            source={require('../../assets/login2.png')}
            style={styles.photo}
          /> 
          <Text style={styles.Titre}>Sign Up</Text>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="example@gmail.com"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Enter Your Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#0F3510" />
          ) : (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={signUp}
              >
                <Text style={styles.buttonText}>SIGN UP</Text>
              </TouchableOpacity>
              <Text style={styles.text}>Already have an account? <Text style={styles.text2} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
  },
  button: {
    backgroundColor: '#0F3510',
    borderRadius: 10,
    width: '100%',
    marginVertical: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  photo: {
    marginLeft: 80,
    marginTop: 80,
    height: 200,
    width: 200,
    bottom: 0,
    left: 0,
    marginBottom: 20,
  },
  aff: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Titre: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 60,
  },
  container: {
    marginHorizontal: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    marginVertical: 10,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: '30%',
  },
  text2: {
    color: '#0F3510',
    fontSize: 18,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
