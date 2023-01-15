import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {onBackPress} from '../../utils/backpress';
import authActions from '../../redux/actions/auth';
import axios from 'axios';
import styles from '../../styles/Profile';
import DefaultImg from '../../assets/images/default-img.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
const back = require('../../assets/images/iconBack.png');
const next = require('../../assets/images/arrowRight.png');

const Profile = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  //   const dispatch = useDispatch();
  //   const profile = useSelector(state => state.profile.profile);
  // const auth = useSelector(state => state.auth.userData);
  const [profile, setProfile] = useState('');
  // const profile = useSelector(state => state.auth.profile);

  const toOerderHistory = () => {
    navigation.replace('History');
  };
  const toEditPassword = () => {
    navigation.replace('ResetPwd');
  };
  const toEditProfile = () => {
    navigation.replace('Editprofile');
  };

  const getProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    setLoading(true);
    axios
      .get(`https://coffee-gayoe.vercel.app/api/v1/users/profile`, {
        headers: {'x-access-token': token},
      })
      .then(res => {
        setProfile(res.data.result.result[0]);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleBackPress = () => {
    navigation.replace('HomePage');
    return true;
  };
  useEffect(() => {
    getProfile();
    onBackPress(handleBackPress);
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   setLoading(false);
  // }, []);
  //   useEffect(() => {
  //     dispatch(userAction.getUserThunk(auth.token));
  //   }, [dispatch, auth.token]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => navigation.goBack('HomePage')}>
          <Image source={back} />
        </TouchableOpacity> */}
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('HomePage');
            }}>
            <Image source={back} size={20} style={styles.icons} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                paddingLeft: 22,
                position: 'relative',
                top: -16,
                left: -20,
              }}>
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.containerContent}>
        <Text style={styles.titleContent}>My profile</Text>
        <View style={styles.subTitle}>
          <Text style={styles.textInfo}>Your Information</Text>
          <TouchableOpacity onPress={toEditProfile}>
            <Text style={styles.btnEdit}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperProfile}>
          <View style={styles.contentImage}>
            <View style={{width: 100, height: 100, borderRadius: 10}}>
              {loading ? (
                <ActivityIndicator
                  style={{
                    position: 'relative',
                    top: 30,
                    left: 10,
                  }}
                />
              ) : (
                <Image
                  source={
                    profile.image === null ? DefaultImg : {uri: profile.image}
                  }
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    position: 'relative',
                    top: 0,
                    left: 0,
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.contname}>
            <Text style={loading ? {display: 'none'} : styles.textName}>
              {profile.display_name === null
                ? 'Username'
                : profile.display_name}
            </Text>
            <View>
              <Text style={loading ? {display: 'none'} : styles.textEmail}>
                {profile.email}
              </Text>
            </View>
            <View>
              <Text style={loading ? {display: 'none'} : styles.textPhone}>
                {`${profile.phone_number}`}
              </Text>
            </View>

            <Text style={loading ? {display: 'none'} : styles.address}>
              {profile.addres === null
                ? 'Please set your address  '
                : profile.addres}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 25}}>
          <TouchableOpacity style={styles.btn} onPress={toOerderHistory}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontWeight: 'bold',
                fontSize: 18,
                color: '#000',
              }}>
              Order History
            </Text>
            <Image source={next} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={toEditPassword}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontWeight: 'bold',
                fontSize: 18,
                color: '#000',
              }}>
              Edit password
            </Text>
            <Image source={next} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontWeight: 'bold',
                fontSize: 18,
                color: '#000',
              }}>
              FAQ
            </Text>
            <Image source={next} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontWeight: 'bold',
                fontSize: 18,
                color: '#000',
              }}>
              Help
            </Text>
            <Image source={next} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.btnSave}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 18,
                color: '#fff',
              }}>
              Save Change
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
