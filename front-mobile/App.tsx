import React from 'react';
import Routes from './src/Routes';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import FlashMessage from "react-native-flash-message";
import { useFonts, OpenSans_400Regular, OpenSans_700Bold } 
  from '@expo-google-fonts/open-sans';

export default function App() {
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular, OpenSans_700Bold
  });
  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Routes />
      <FlashMessage position="top" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
