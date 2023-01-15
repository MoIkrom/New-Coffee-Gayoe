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
// import img_product from '../../assets/images/product.png';
import DefaultImg from '../../assets/images/default-img.png';
// import {NativeBaseProvider, Radio, Stack} from 'native-base';
import Pencil from 'react-native-vector-icons/Octicons';
// import Close from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authActions from '../../redux/actions/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ButtonOpacity from '../../components/ButtonOpacity';
// import DateTimePicker from '@react-native-community/datetimepicker';
import {editProfile} from '../../utils/api';
import {useNavigation} from '@react-navigation/native';
import bg from '../../assets/images/brown.png';
import pencil from '../../assets/images/pencil.png';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const back = require('../../assets/images/iconBack.png');
  // const [birthday, setBirthday] = useState(profile.birthday);
  // const [gender, setGender] = useState(profile.gender);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [address, setAddress] = useState('');
  const [editPhoto, setEditPhoto] = useState(false);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState('');
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState('');

  const getProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    setLoading(true);
    axios
      .get(`https://coffee-gayoe.vercel.app/api/v1/users/profile`, {
        headers: {'x-access-token': token},
      })
      .then(res => {
        setProfile(res.data.result.result[0]);
        setFilePath(res.data.result.result[0].image);
        setFirstName(res.data.result.result[0].firstname);
        setLastName(res.data.result.result[0].lastname);
        setDisplayName(res.data.result.result[0].display_name);
        setAddress(res.data.result.result[0].addres);

        setLoading(false);
        console.log(profile);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProfile();
  }, []);

  const dateHandle = (event, value) => {
    setBirthday(
      value.getFullYear() + '/' + value.getMonth() + '/' + value.getDate(),
    );
    setShow(false);
  };

  const showMode = () => {
    setShow(true);
  };

  const camera = () => {
    const option = {
      mediaType: 'photo',
      quality: 0.7,
    };

    launchCamera(option, res => {
      if (res.didCancel) {
        ToastAndroid.showWithGravity(
          'Cancel Gallery',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      } else if (res.errorCode) {
        ToastAndroid.showWithGravity(
          'Allow Permission',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      } else {
        const data = res.assets[0];
        // console.log(res.assets[0]);
        setFilePath(data.uri);
        setImage(res.assets);
        setEditPhoto(false);
      }
    });
  };

  const handlelaunchImageLibrary = () => {
    const option = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(option, res => {
      if (res.didCancel) {
        ToastAndroid.showWithGravity(
          'Cancel Gallery',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      } else if (res.errorCode) {
        ToastAndroid.showWithGravity(
          'Allow Permission',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      } else {
        const data = res.assets[0];
        setFilePath(data.uri);
        setImage(res.assets);
        setEditPhoto(false);
      }
    });
  };

  const saveHandle = async () => {
    try {
      setLoading(true);
      const getToken = await AsyncStorage.getItem('token');
      const formData = new FormData();
      if (firstName) formData.append('firstname', firstName);
      if (lastName) formData.append('lastname', lastName);
      if (displayName) formData.append('display_name', displayName);
      // if (gender) formData.append('gender', gender);
      // if (birthday) formData.append('birthday', birthday);
      if (address) formData.append('addres', address);
      if (image)
        formData.append('image', {
          name: image[0].fileName,
          type: image[0].type,
          uri: image[0].uri,
        });

      await editProfile(getToken, formData);
      ToastAndroid.showWithGravity(
        'Success Edit Profile',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      // console.log(filePath);
      // dispatch(authActions.userIDThunk(getToken, formData));
      // setDeps(Math.floor(Math.random() * 100000));
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
  return (
    // <NativeBaseProvider>
    <ScrollView>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
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

      {/* ======================================= */}

      <View style={styles.container}>
        <View style={styles.img_bar}>
          {filePath === null ? (
            <Image
              source={profile.image !== null ? profile.image : DefaultImg}
              style={styles.img}
            />
          ) : (
            <Image source={{uri: filePath}} style={styles.img} />
          )}

          <View style={styles.pencil_bar}>
            {!editPhoto ? (
              // <Pencil
              //   style={styles.pencil}
              //   color="#fff"
              //   brand={'Octicons'}
              //   name="pencil"
              //   onPress={() => setEditPhoto(true)}
              //   size={25}
              //   type="material"
              // />

              <View>
                <Pressable onPress={() => setEditPhoto(true)}>
                  <Image
                    source={pencil}
                    style={{position: 'relative', top: 0, right: 0}}
                  />
                </Pressable>
              </View>
            ) : (
              <View>
                <Pressable>
                  <Text
                    onPress={() => {
                      setEditPhoto(false), setFilePath(profile.image);
                    }}
                    style={{color: '#ffffff'}}>
                    Close
                  </Text>
                </Pressable>
              </View>
              // <Close
              //   style={styles.pencil}
              //   color="#fff"
              //   brand={'AntDesign'}
              //   name="close"
              //   onPress={() => {
              //     setEditPhoto(false), setFilePath(profile.image);
              //   }}
              //   size={25}
              //   type="material"
              // />
            )}
          </View>
        </View>
        {!editPhoto ? (
          <View style={styles.contbtnedit}>
            <TouchableOpacity
              onPress={() => setEdit(!edit)}
              activeOpacity={0.5}
              style={
                edit === false
                  ? {
                      backgroundColor: '#f5c361',
                      height: 40,
                      width: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      marginBottom: 10,
                      marginTop: 20,
                    }
                  : {
                      backgroundColor: '#6A4029',
                      height: 40,
                      width: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      marginBottom: 10,
                      marginTop: 20,
                    }
              }>
              <Text
                style={
                  edit === false
                    ? {
                        color: '#6a4029',
                        fontFamily: 'Poppins',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }
                    : {
                        color: 'white',
                        fontFamily: 'Poppins',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }
                }>
                {!edit ? 'Edit Data' : 'Save Edit'}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => setEdit(false)}
              activeOpacity={0.5}
              style={{
                backgroundColor: '#6a4029',
                height: 40,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginBottom: 10,
                marginTop: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                edit profile
              </Text>
            </TouchableOpacity> */}
          </View>
        ) : (
          <View style={styles.two_btn}>
            <TouchableOpacity
              onPress={() => handlelaunchImageLibrary()}
              activeOpacity={0.5}
              style={{
                backgroundColor: '#6a4029',
                height: 40,
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginBottom: 10,
                marginTop: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                open library
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => camera()}
              activeOpacity={0.5}
              style={{
                backgroundColor: '#6a4029',
                height: 40,
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginBottom: 10,
                marginTop: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                open camera
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ============================================ */}

        {/* form input */}
        <View style={styles.form}>
          <View style={styles.input_bar}>
            <Text style={styles.label}>First Name :</Text>
            {!edit ? (
              <Text style={styles.Text_input}>
                {firstName !== null ? `${firstName}` : `First Name`}
              </Text>
            ) : (
              <TextInput
                style={styles.input}
                placeholder="Input First Name"
                placeholderTextColor="#9F9F9F"
                value={firstName}
                onChangeText={text => setFirstName(text)}
              />
            )}
            <Text style={styles.label}>Last Name :</Text>
            {!edit ? (
              <Text style={styles.Text_input}>
                {lastName !== null ? `${lastName}` : `Last Name`}
              </Text>
            ) : (
              <TextInput
                style={styles.input}
                placeholder="Input Last Name"
                placeholderTextColor="#9F9F9F"
                value={lastName}
                onChangeText={text => setLastName(text)}
              />
            )}
            <Text style={styles.label}>Display Name :</Text>
            {!edit ? (
              <Text style={styles.Text_input}>
                {displayName !== null ? `${displayName}` : `Display Name`}
              </Text>
            ) : (
              <TextInput
                style={styles.input}
                placeholder="input display name"
                placeholderTextColor="#9F9F9F"
                value={displayName}
                onChangeText={text => setDisplayName(text)}
              />
            )}
          </View>
          <View>
            <Text style={styles.label}>Email Adress :</Text>
            <Text style={styles.Text_input}>{profile.email}</Text>
          </View>
          <View>
            <Text style={styles.label}>Phone Number :</Text>
            <Text style={styles.Text_input}>{profile.phone_number}</Text>
          </View>

          <View>
            <Text style={styles.label}>Delivery Address :</Text>
            {!edit ? (
              <Text style={styles.Text_input}>
                {address !== null
                  ? `${address}`
                  : `you havent input your address`}
              </Text>
            ) : (
              <TextInput
                style={[styles.input, styles.contaddres]}
                placeholder="input your delivery address"
                placeholderTextColor="#9F9F9F"
                value={address}
                onChangeText={text => setAddress(text)}
              />
            )}
          </View>
        </View>
        {edit === true ? (
          ''
        ) : loading ? (
          <View style={{marginTop: 35, marginBottom: 50}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <ButtonOpacity
            color={'#6a4029'}
            text="Save Change"
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
        )}
      </View>
    </ScrollView>
    // </NativeBaseProvider>
  );
};

export default EditProfile;
