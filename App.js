import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import SignUp from './app/screens/SignUp';
import create from './app/screens/create';
import DeleteUser from './app/screens/DeleteUser';
import test from './app/screens/test';
import live from './app/screens/LiveMatches';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="create">
        <Stack.Screen name="create" component={create} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="DeleteUser" component={DeleteUser} options={{ headerShown: false }} />
        <Stack.Screen name="test" component={test} options={{ headerShown: false }} />
        <Stack.Screen name="live" component={live} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
