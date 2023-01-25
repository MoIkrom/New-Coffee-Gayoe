import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import bg from '../../assets/images/bgWelcome.png';
import gayoe from '../../assets/images/gayoe.jpg';
import styles from '../../styles/Wlcm';
import {useNavigation} from '@react-navigation/native';
import authActions from '../../redux/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch, useSelector} from 'react-redux';

const App = () => {
  const navigation = useNavigation();
  const getToken = AsyncStorage.getItem('token');
  const dispatch = useDispatch();

  const deletToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.log(error);
      // navigation.navigate('WelcomePage');
    }
  };
  const getProfile = async () => {
    try {
      const getToken = await AsyncStorage.getItem('token');
      getToken !== null
        ? navigation.replace('HomePage')
        : navigation.replace('Home');
    } catch (error) {
      console.log(error);
      // navigation.navigate('WelcomePage');
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={getToken ? gayoe : bg}
        resizeMode="cover"
        style={styles.bg}>
        <View style={styles.content}>
          <Text style={styles.title} onPress={() => deletToken}>
            {getToken !== null ? 'Coffe Gayoe' : 'Coffee for Everyone'}
          </Text>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text style={styles.text}>Get Started</Text>
          </TouchableOpacity> */}

          {getToken !== null ? (
            // navigation.navigate('HomePage')
            ''
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.replace('Home');
              }}>
              <Text style={styles.text}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default App;
