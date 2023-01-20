import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import styles from '../../styles/Login';
// import Input from '../../components/Input';
import google from '../../assets/images/google.png';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
// import FontAwesome, { SolidIcons } from 'react-native-fontawesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import login from '../../utils/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authAction from '../../redux/actions/auth';
import {StackActions} from '@react-navigation/native';
import eye from '../../assets/images/eye4.png';
import eyeoff from '../../assets/images/eyeslash2.png';

import {onBackPress} from '../../utils/backpress';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isPwdShown, setIsPwdShown] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const valueEmail = e => {
    setEmail(e);
  };
  const valuePassword = e => {
    setPassword(e);
  };

  const tooglePassword = () => {
    setIsPwdShown(!isPwdShown);
  };

  const handleSubmit = e => {
    setIsloading(true);
    const data = {
      email,
      password,
    };
    axios
      .post(`https://coffee-gayoe.vercel.app/api/v1/auth`, data)
      .then(res => {
        AsyncStorage.setItem('token', res.data.result.data.token);
        AsyncStorage.setItem('role', res.data.result.data.role);
        setIsloading(false);
        ToastAndroid.showWithGravity(
          'Login Success',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        ),
          navigation.replace('HomePage');
      })
      .catch(err => {
        console.log(err);
        setIsloading(false);
        ToastAndroid.showWithGravity(
          'Wrong Email/Password',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
  };
  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) navigation.replace('HomePage');
  };
  // const handleBackPress = () => {
  //   navigation.goBack();
  //   return true;
  // };

  useEffect(() => {
    getToken();
    // onBackPress(handleBackPress);
  });
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/bgLogin.png')}
          resizeMode="cover"
          style={styles.bg}>
          <View style={styles.content}>
            <Text style={styles.title}>Login</Text>

            <TextInput
              style={styles.inputs}
              placeholder="Enter your email "
              onChangeText={valueEmail}
              keyboardType="email-address"
              placeholderTextColor="#ffffff"
            />
            <View style={styles.wrapperPwd}>
              <TextInput
                secureTextEntry={isPwdShown}
                style={styles.inputPwd}
                // value={form.password}
                placeholder="Enter your password"
                placeholderTextColor="white"
                // onChangeText={text => valueEmail(text, 'password')}
                onChangeText={valuePassword}
                keyboardType="password"
              />

              <Pressable onPress={tooglePassword}>
                <Image
                  source={isPwdShown ? eye : eyeoff}
                  style={styles.iconPwd}
                />
              </Pressable>
            </View>
            <Text
              style={styles.forgot}
              onPress={() => {
                navigation.navigate('Forgot');
              }}>
              Forgot Password?
            </Text>

            <TouchableOpacity style={styles.createBtn} onPress={handleSubmit}>
              {isLoading ? (
                <View style={styles.btnLoading}>
                  <ActivityIndicator size="large" color="black" />
                </View>
              ) : (
                <Text style={styles.textCreate}>Login</Text>
              )}
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.createBtn} onPress={handleSubmit}>
              <Text style={styles.textCreate}>Login</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.googleBtn}>
              <View style={styles.googleContainer}>
                <Image source={google} />
                <Text style={styles.textGoogle}>Login with Google</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default Login;
