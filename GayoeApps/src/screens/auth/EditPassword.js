import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import axios from 'axios';
import styles from '../../styles/EditProfile';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authActions from '../../redux/actions/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ButtonOpacity from '../../components/ButtonOpacity';
import {onBackPress} from '../../utils/backpress';
import {editProfile} from '../../utils/api';
import {useNavigation} from '@react-navigation/native';
import eye from '../../assets/images/eye2.png';
import eyeoff from '../../assets/images/eyeslash2.png';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const back = require('../../assets/images/iconBack.png');
  const [loading, setLoading] = useState(false);
  const [isPwdShown, setIsPwdShown] = useState(true);
  const [isPwdShown2, setIsPwdShown2] = useState(true);
  const [old_password, SetOld_Password] = useState('');
  const [new_password, SetNew_Password] = useState('');

  const handleBackPress = () => {
    navigation.navigate('Profile');
    return true;
  };
  const tooglePassword = () => {
    setIsPwdShown(!isPwdShown);
  };
  const tooglePassword2 = () => {
    setIsPwdShown2(!isPwdShown2);
  };
  useEffect(() => {
    onBackPress(handleBackPress);
  }, []);

  const saveHandles = async () => {
    try {
      setLoading(true);
      const getToken = await AsyncStorage.getItem('token');
      const formData = new FormData();
      if (firstName) formData.append('firstname', firstName);
      if (lastName) formData.append('lastname', lastName);
      if (displayName) formData.append('display_name', displayName);
      if (address) formData.append('addres', address);

      await editProfile(getToken, formData);
      ToastAndroid.showWithGravity(
        'Success Edit Profile',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );

      navigation.push('Profile');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
      ToastAndroid.showWithGravity(
        error.response,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      setLoading(false);
    }
  };

  const handleNewPwd = text => {
    SetNew_Password(text);
  };
  const handleOldPwd = text => {
    SetOld_Password(text);
  };
  const saveHandle = async () => {
    try {
      setLoading(true);
      const getToken = await AsyncStorage.getItem('token');
      axios.patch(
        `https://coffee-gayoe.vercel.app/api/v1/users/editpassword`,
        {
          old_password,
          new_password,
        },
        {headers: {'x-access-token': getToken}},
      );
      ToastAndroid.showWithGravity(
        'Success Edit Password',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      navigation.replace('Profile');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
      ToastAndroid.showWithGravity(
        error.response,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      setLoading(false);
    }
  };

  return (
    // <NativeBaseProvider>
    <ScrollView>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image source={back} size={20} style={styles.icons} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              paddingLeft: 22,
              position: 'relative',
              top: 9,
              left: 20,
            }}>
            Back
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container2}>
        <Text
          style={{
            fontSize: 25,
            marginBottom: 20,
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            fontFamily: 'Poppins',
            color: 'black',
          }}>
          EDIT PASSWORD
        </Text>
        {/* form input */}
        <View style={styles.form2}>
          <View style={styles.input_bar}>
            <Text style={styles.label2}>Old Password :</Text>
            <View style={styles.wrapperPwd}>
              <TextInput
                style={styles.inputPwd}
                placeholder="Enter your old Password "
                placeholderTextColor="#9F9F9F"
                keyboardType="password"
                onChangeText={handleOldPwd}
                secureTextEntry={isPwdShown}
              />
              <Pressable onPress={tooglePassword}>
                <Image
                  source={isPwdShown ? eye : eyeoff}
                  style={styles.iconPwd}
                />
              </Pressable>
            </View>
            <Text style={styles.label2}>New Password :</Text>
            <View style={styles.wrapperPwd}>
              <TextInput
                style={styles.inputPwd}
                secureTextEntry={isPwdShown2}
                placeholder="Enter New Password"
                placeholderTextColor="#9F9F9F"
                keyboardType="password"
                onChangeText={handleNewPwd}
              />
              <Pressable onPress={tooglePassword2}>
                <Image
                  source={isPwdShown2 ? eye : eyeoff}
                  style={styles.iconPwd}
                />
              </Pressable>
            </View>
            {/* <Text style={styles.label}>Confirm New Password :</Text> */}

            {/* <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              placeholderTextColor="#9F9F9F"
              // value={displayName}
              onChangeText={handleOldPwd}
            /> */}
          </View>
        </View>

        <ButtonOpacity
          color={'#6a4029'}
          text={
            loading ? (
              <View style={{marginTop: 35, marginBottom: 50}}>
                <ActivityIndicator size="large" color="#FFBA33" />
              </View>
            ) : (
              'Save Change'
            )
          }
          radius={20}
          colorText="white"
          height={60}
          width={`80%`}
          marginBottom={10}
          marginTop={20}
          onPressHandler={{
            onPress: () => {
              saveHandle();
            },
          }}
        />
      </View>
    </ScrollView>
    // </NativeBaseProvider>
  );
};

export default EditProfile;
