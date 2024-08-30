import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const home = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Index Screen!</Text>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
