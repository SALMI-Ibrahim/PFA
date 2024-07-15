import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ActivityIndicator, Button } from 'react-native';
import { Firebase_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '../../types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated,{ FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';

const Login = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = Firebase_AUTH;
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Login successful');
    } catch (error: any) {
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
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
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Login" onPress={signIn} />
          <Button title="Create Account" onPress={() => navigation.navigate('SignUp')} />
        </>
      )}
    </View>
  );
};

export default Login;

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
