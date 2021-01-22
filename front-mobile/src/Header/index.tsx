import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

function Header() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} />
      <Text style={styles.text}>HeudFOOD</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DA5C5C',
    height: 90,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  text: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'OpenSans_700Bold',
    lineHeight: 25,
    letterSpacing: -0.24,
    color: '#FFF',
    marginLeft: 15
  }
});

export default Header;