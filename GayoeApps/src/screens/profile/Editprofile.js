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
// import ButtonOpacity from '../components/ButtonOpacity';
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
  const profile = useSelector(state => state.auth.profile);

  const [firstName, setFirstName] = useState(profile.firstname);
  const [lastName, setLastName] = useState(profile.lastname);
  const [displayName, setDisplayName] = useState(profile.display_name);
  const [gender, setGender] = useState(profile.gender);
  const [filePath, setFilePath] = useState(profile.image);
  const [image, setImage] = useState('');
  const [editPhoto, setEditPhoto] = useState(false);
  const [birthday, setBirthday] = useState(profile.birthday);
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState(profile.addres);
  const [edit, setEdit] = useState(false);
  const [deps, setDeps] = useState('');
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
    try {
      // const removeToken = await AsyncStorage.removeItem('token');
      const getToken = await AsyncStorage.getItem('token');
      return dispatch(authActions.userIDThunk(getToken));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
  }, [deps]);

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
      quality: 1,
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
        console.log(res.assets[0]);
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
      if (gender) formData.append('gender', gender);
      if (birthday) formData.append('birthday', birthday);
      if (address) formData.append('addres', address);
      if (image)
        formData.append('image', {
          name: image[0].fileName,
          type: image[0]?.type,
          uri: image[0].uri,
          // name: 'test.' + image[0]?.type?.substr(6),
          // uri:
          //   Platform.OS !== 'android'
          //     ? 'file://' + image[0]?.uri
          //     : image[0]?.uri,
        });

      await editProfile(getToken, formData);
      ToastAndroid.showWithGravity(
        'Success Edit Profile',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      console.log(filePath);
      dispatch(authActions.userIDThunk(getToken, formData));
      setDeps(Math.floor(Math.random() * 100000));
      navigation.push('Profile');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
      ToastAndroid.showWithGravity(
        error.response.data.msg,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      setLoading(false);
    }
  };
  return (
    // <NativeBaseProvider>
    <ScrollView>
      {/* {show && (
        <DateTimePicker
          value={new Date()}
          mode={'date'}
          display="default"
          onChange={dateHandle}
        />
      )} */}
      <View style={styles.container}>
        <View style={styles.img_bar}>
          {filePath === null ? (
            <Image source={DefaultImg} style={styles.img} />
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
                  {/* <Image
                    source={bg}
                    style={{position: 'relative', top: -20, right: -10}}
                  /> */}
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
          <TouchableOpacity
            onPress={() => setEdit(true)}
            activeOpacity={0.5}
            style={{
              backgroundColor: '#6a4029',
              height: 40,
              width: 180,
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
          </TouchableOpacity>
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
                onChangeText={e => {
                  setFirstName(e);
                }}
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
                onChangeText={e => {
                  setLastName(e);
                }}
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
                onChangeText={e => {
                  setDisplayName(e);
                }}
              />
            )}
          </View>
          {/* {!edit ? (
            <Text style={styles.gender}>
              {gender !== null
                ? `your gender : ${gender}`
                : `you havent input gender`}
            </Text>
          ) : (
            <View style={styles.radio_bar}>
              <Radio.Group
                name="Gender"
                value={gender}
                onChange={gender => {
                  setGender(gender);
                  console.log(gender);
                }}
                accessibilityLabel="Gender">
                <Stack
                  direction={{
                    base: 'row',
                    sm: 'row',
                  }}
                  alignItems={{
                    base: 'flex-start',
                    sm: 'center',
                  }}
                  space={4}
                  w="75%"
                  maxW="300px">
                  <Radio value="female" colorScheme="amber" size="sm" my={1}>
                    Female
                  </Radio>
                  <Radio
                    value="male"
                    colorScheme="amber"
                    size="sm"
                    my={1}
                    ml={3}>
                    Male
                  </Radio>
                </Stack>
              </Radio.Group>
            </View>
          )} */}
          <View>
            <Text style={styles.label}>Email Adress :</Text>
            <Text style={styles.Text_input}>{profile.email}</Text>
          </View>
          <View>
            <Text style={styles.label}>Phone Number :</Text>
            <Text style={styles.Text_input}>{profile.phone_number}</Text>
          </View>
          {/* <View>
            <Text style={styles.label}>Date of Birth :</Text>
            {!edit ? (
              <Text style={styles.Text_input}>
                {birthday !== null
                  ? birthday.slice(0, 10)
                  : `you haven't input display name`}
              </Text>
            ) : (
              <Text style={styles.Text_input} onPress={() => showMode()}>
                {' '}
                {birthday !== null
                  ? birthday.slice(0, 10)
                  : `you haven't input display name`}{' '}
              </Text>
            )}
          </View> */}
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
                style={styles.input}
                placeholder="input your delivery address"
                placeholderTextColor="#9F9F9F"
                value={address}
                onChangeText={e => {
                  setAddress(e);
                }}
              />
            )}
          </View>
        </View>
        {loading ? (
          <View style={{marginTop: 20}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <ButtonOpacity
            color={'#6a4029'}
            text="Save"
            radius={20}
            colorText="white"
            height={60}
            width={`80%`}
            marginBottom={10}
            marginTop={20}
            onPressHandler={{
              onPress: () => {
                saveHandle(), setEdit(false);
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
