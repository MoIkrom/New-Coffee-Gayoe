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
import axios from 'axios';

import React, {useState} from 'react';
import bg from '../../assets/images/bgSignup.png';
import google from '../../assets/images/google.png';
import styles from '../../styles/Signup';
import Input from '../../components/Input';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import authAction from '../../redux/actions/auth';
import IconIon from 'react-native-vector-icons/Ionicons';

const Signup = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const navigation = useNavigation();
  const [isPwdShown, setIsPwdShown] = useState(true);
  const [form, setForm] = useState({
    email: '',
    password: '',
    phone_number: '',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const tooglePassword = () => {
    setIsPwdShown(!isPwdShown);
  };

  const onChangeHandler = (text, type) => {
    setForm(form => ({...form, [type]: text}));
  };

  const valueEmail = e => {
    setEmail(e);
  };
  const valuePassword = e => {
    setPassword(e);
  };
  const valuePhone = e => {
    setPhone_number(e);
  };
  // .post(`https://coffee-gayoe.vercel.app/api/v1/users`, {

  const handleRegister = e => {
    const data = {
      email,
      password,
      phone_number,
    };
    // console.log('data beforre send : ', data);
    setIsloading(true);
    axios
      .post(`https://coffee-gayoe.vercel.app/api/v1/users`, data)
      .then(res => {
        console.log(res);
        setIsloading(false);
        ToastAndroid.showWithGravity(
          'Register Success',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        navigation.navigate('Login');
      })
      .catch(err => {
        console.log(err);
        ToastAndroid.showWithGravity(
          err.response.data.msg,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
  };

  // const handleRegister = async e => {
  //   e.preventDefault();
  //   try {
  //     await axios.post(`https://coffee-gayoe.vercel.app/api/v1/users`, {
  //       email: email,
  //       passwords: password,
  //       phone_number: phone,
  //     });
  //     ToastAndroid.showWithGravity(
  //       'Register Success',
  //       ToastAndroid.LONG,
  //       ToastAndroid.TOP,
  //     );
  //     navigation.navigate('Login');
  //   } catch (err) {
  //     ToastAndroid.showWithGravity(
  //       err.response.data.msg,
  //       ToastAndroid.LONG,
  //       ToastAndroid.TOP,
  //     );
  //   }
  // };

  // const handleSubmit = e => {
  //   e.preventDefault();

  //   const registSuccess = () => {
  //     ToastAndroid.showWithGravity(
  //       `Congrats, register successfully!`,
  //       ToastAndroid.SHORT,
  //       ToastAndroid.TOP,
  //     );
  //     navigation.navigate('Login');
  //   };

  //   const registError = error => {
  //     ToastAndroid.showWithGravity(
  //       `${error}`,
  //       ToastAndroid.SHORT,
  //       ToastAndroid.TOP,
  //     );
  //   };

  //   dispatch(authAction.registerThunk(form, registSuccess, registError));
  // };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
          <View style={styles.content}>
            <Text style={styles.title}>Sign Up</Text>
            {/* <Input
              value={form.email}
              placeholder="Enter your email address"
              isPassword={false}
              type="email-address"
              handler={onChangeHandler}
              text={'email'}
            /> */}
            {/* <Input value={form.password_user} placeholder='Enter your password' isPassword={true} type='none' handler={onChangeHandler} text={'password'} /> */}
            {/* <View style={styles.wrapperPwd}>
              <TextInput
                secureTextEntry={isPwdShown}
                style={styles.inputPwd}
                value={form.password}
                placeholder="Enter your password"
                placeholderTextColor="white"
                onChangeText={text => onChangeHandler(text, 'password')}
              />
              <IconIon
                name={isPwdShown ? 'eye' : 'eye-off'}
                style={styles.iconPwd}
                onPress={tooglePassword}
              />
            </View> */}
            <TextInput
              style={styles.inputs}
              placeholder="Enter your email "
              onChangeText={valueEmail}
              keyboardType="email-address"
              placeholderTextColor="#ffffff"
            />
            <TextInput
              style={styles.inputs}
              // style={styles.input1}
              placeholder="Enter your password "
              onChangeText={valuePassword}
              secureTextEntry
              keyboardType="password"
              placeholderTextColor="#ffffff"
            />
            <TextInput
              style={styles.input1}
              // style={styles.input1}
              placeholder="Enter your phone number"
              onChangeText={valuePhone}
              keyboardType="phone-pad"
              placeholderTextColor="#ffffff"
            />

            {/* <Input
              value={form.phone_number}
              placeholder="Enter your phone number"
              isPassword={false}
              type="phone-pad"
              handler={onChangeHandler}
              text={'phone'}
            /> */}
            <TouchableOpacity style={styles.createBtn} onPress={handleRegister}>
              {isLoading ? (
                <View style={styles.btnLoading}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              ) : (
                <Text style={styles.textCreate}>Create Account</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleBtn}>
              <View style={styles.googleContainer}>
                <Image source={google} />
                <Text style={styles.textGoogle}>Create with Google</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default Signup;
