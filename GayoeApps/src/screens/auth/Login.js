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
} from 'react-native';
import React, {useState} from 'react';

import styles from '../../styles/Login';
// import Input from '../../components/Input';
import google from '../../assets/images/google.png';
import {useDispatch, useSelector} from 'react-redux';
import authAction from '../../redux/actions/auth';
import {useNavigation} from '@react-navigation/native';
// import FontAwesome, { SolidIcons } from 'react-native-fontawesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import login from '../utils/auth';
// import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const auth = useSelector(state => state.auth);
  // console.log(auth.userData)
  const [isPwdShown, setIsPwdShown] = useState(true);
  // const [form, setForm] = useState({
  //   email: '',
  //   password: '',
  // });
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

  // const onChangeHandler = (text, type) => {
  //   setForm(form => ({...form, [type]: text}));
  // };

  const handleSubmit = e => {
    const data = {
      email,
      password,
    };
    login(data)
      // axios
      //   .post(`https://coffee-gayoe.vercel.app/api/v1/auth`, data)
      .then(res => {
        AsyncStorage.setItem('token', res.data.result.data.token);
        AsyncStorage.setItem('role', res.data.result.data.role);
        console.log(res.data.result.data.role);
        // console.log(res);

        dispatch(
          authAction.userIDThunk(res.data.result.data.token, () => {
            ToastAndroid.showWithGravity(
              'Login Success',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            ),
              navigate.push('Home');
          }),
        );
      })
      .catch(err => {
        console.log(err);
        ToastAndroid.showWithGravity(
          err.response.data.msg.msg,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
  };
  // const handleSubmit = e => {
  //   e.preventDefault();

  //   const loginSuccess = () => {
  //     ToastAndroid.showWithGravity(
  //       `Welcome ${form.email}, login successfully`,
  //       ToastAndroid.SHORT,
  //       ToastAndroid.TOP,
  //     );
  //     navigation.navigate('HomePage');
  //   };
  //   const loginError = error => {
  //     ToastAndroid.showWithGravity(
  //       `${error}`,
  //       ToastAndroid.SHORT,
  //       ToastAndroid.TOP,
  //     );
  //   };
  //   dispatch(authAction.loginThunk(form, loginSuccess, loginError));
  // };
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
              <IconIon
                name={isPwdShown ? 'eye' : 'eye-off'}
                style={styles.iconPwd}
                onPress={tooglePassword}
              />
            </View>
            <Text
              style={styles.forgot}
              onPress={() => {
                navigation.navigate('Forgot');
              }}>
              Forgot Password?
            </Text>

            <TouchableOpacity style={styles.createBtn} onPress={handleSubmit}>
              {auth.isLoading ? (
                <View style={styles.btnLoading}>
                  <ActivityIndicator size="large" color="black" />
                </View>
              ) : (
                <Text style={styles.textCreate}>Login</Text>
              )}
            </TouchableOpacity>
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
