import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { styles } from './styles';

function Header() {
  const navigation = useNavigation()
 
  function handleOnPress() {
    navigation.navigate('Home');
  }

  return (
    <TouchableWithoutFeedback onPress={handleOnPress}>
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.text}>HeudFOOD</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Header;