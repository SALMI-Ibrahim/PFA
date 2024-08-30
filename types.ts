import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  creat:undefined;
  index:undefined;
  ff:undefined;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
export type homeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'index'>;
