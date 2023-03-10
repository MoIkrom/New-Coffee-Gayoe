import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import bg from '../../assets/images/bgHome.png';
import styles from '../../styles/Home';
import {useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();
  const getTokens = async () => {
    try {
      const getToken = await AsyncStorage.getItem('token');
      if (getToken === null) navigation.replace('Login');
    } catch (error) {
      console.log(error);
      // navigation.navigate('WelcomePage');
    }
  };
  // useEffect(() => {
  //   getTokens();
  // }, []);
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.text}>
            Get a cup of coffee for free every sunday morning
          </Text>
          <TouchableOpacity
            style={styles.startBtn}
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text style={styles.textStart}>Create New Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.textLogin}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;
