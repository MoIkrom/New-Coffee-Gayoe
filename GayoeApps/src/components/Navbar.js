import React, {useEffect, useState} from 'react';

import {DrawerLayout} from 'react-native-gesture-handler';
import IconFW from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider} from '@rneui/themed';

import styles from '../styles/Navbar';
import User from '../assets/drawer/profile.png';
import Chart from '../assets/images/Chart.png';
import Icon from '../assets/images/Icon.png';
import Chat from '../assets/images/Chat.png';
import Search from '../assets/images/Search.png';
import hamburger from '../assets/images/hamburger.png';
import Cart from '../assets/drawer/cart.png';
import Carts from '../assets/images/Chart.png';
import allmenu from '../assets/drawer/allmenu.png';
import privacy from '../assets/drawer/privacy.png';
import security from '../assets/drawer/security.png';
import logouts from '../assets/drawer/logouts.png';
import menu from '../assets/drawer/menu.png';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Image,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import DefaultImg from '../assets/images/default-img.png';
import {useNavigation} from '@react-navigation/native';
import Profile from '../screens/profile/Index';

// import userAction from '../redux/actions/user';
// import authAction from '../redux/actions/auth';

import authAction from '../redux/actions/auth';
import axios from 'axios';

function Navbar({children}) {
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const [loadingModal, setLoadingModal] = useState(false);
  // const profile = useSelector(state => state.auth.profile);
  const [profile, setProfile] = useState('');
  const [roles, setRoles] = useState('');
  const [tokens, setTokens] = useState('');
  const toProfile = () => {
    navigation.replace('Profile');
  };
  const toHistory = () => {
    navigation.navigate('History');
  };
  const Logout = async () => {
    setLoadingModal(true);
    const deletetoken = await AsyncStorage.removeItem('token');
    try {
      deletetoken;
      ToastAndroid.showWithGravity(
        'Logout Success',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      ),
        navigation.replace('Login');
      setModalVisible(false);
      setLoadingModal(false);
    } catch (error) {
      console.log(error);

      setLoadingModal(false);
    }
  };
  const getProfileUser = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`https://coffee-gayoe.vercel.app/api/v1/users/profile`, {
        headers: {'x-access-token': token},
      })
      .then(res => {
        setProfile(res.data.result.result[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    const role = await AsyncStorage.getItem('role');
    setRoles(role);
    setTokens(token);
  };

  useEffect(() => {
    getProfileUser();
    getToken();
  }, []);
  const renderDrawer = () => {
    // navigation = useNavigation();

    return (
      <View>
        <View
          style={roles === 'admin' ? {display: 'none'} : styles.continerSwipe}>
          <TouchableOpacity onPress={toProfile}>
            <Image
              source={
                profile.image === null ? DefaultImg : {uri: profile.image}
              }
              style={styles.imageDrawer}
            />
            {/* <Text style={styles.username}>username</Text> */}
            <Text style={styles.username}>{profile.display_name}</Text>
            {/* <Text style={styles.email}>email.com</Text> */}
            <Text style={styles.email}>{profile.email}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingLeft: 35,
            paddingRight: 35,
            paddingTop: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View>
            {/* <DrawerItem>
                    <Icons name={"user-circle"} size={20} style={styles.imageBottom} label="Close drawer"
                    onPress={() => props.navigation.closeDrawer()}/>
                </DrawerItem> */}

            <TouchableOpacity
              style={styles.div}
              onPress={() => navigation.navigate('Profile')}>
              <Image source={Icon} size={60} style={styles.imageBottom} />
              <Text style={styles.textBottom}>Edit Profile</Text>
            </TouchableOpacity>

            <Divider style={{width: '90%', margin: 3}} />
            <TouchableOpacity
              style={styles.containerBottom}
              onPress={toHistory}>
              {/* <Image source={IconUser} style={styles.imageBottom}/> */}
              <Image source={Cart} size={20} style={styles.imageBottom} />
              <Text style={styles.textBottom}>Orders</Text>
            </TouchableOpacity>
            <Divider style={{width: '90%', margin: 3}} />
            <View style={styles.containerBottom}>
              {/* <Image source={IconMenus} style={styles.imageBottom}/> */}
              <Image source={allmenu} size={20} style={styles.imageBottom} />
              <Text style={styles.textBottom}>All menu</Text>
            </View>
            <Divider style={{width: '90%', margin: 3}} />
            <View style={styles.containerBottom}>
              <Image source={privacy} size={20} style={styles.imageBottom} />
              <Text style={styles.textBottom}>Privacy policy</Text>
            </View>
            <Divider style={{width: '90%', margin: 3}} />
            <View style={styles.containerBottom}>
              {/* <Image source={IconUser} style={styles.imageBottom}/> */}
              <Image source={security} size={20} style={styles.imageBottom} />
              <Text style={styles.textBottom}>Security</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.containerLogout}
            onPress={() => setModalVisible(true)}>
            {/* <Image source={IconUser} style={styles.imageBottom}/> */}
            <Image source={logouts} size={20} style={styles.imageBottom} />
            <Text style={styles.textBottoms}>Sign-out</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you sure want to logout?</Text>
              {loadingModal ? (
                <View>
                  <ActivityIndicator />
                  <Text style={{marginTop: 10}}>Please Wait Loading . . .</Text>
                </View>
              ) : (
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={Logout}>
                    <Text style={styles.textStyle}>YES</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>NO</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  return (
    <>
      <DrawerLayout
        drawerWidth={300}
        drawerPosition={DrawerLayout.positions.Left}
        drawerType="front"
        drawerBackgroundColor="#F2F2F2"
        overlayColor="rgba(255, 255, 255, 0.8)"
        drawerContainerStyle={{borderTopRightRadius: 30}}
        renderNavigationView={renderDrawer}>
        <View style={styles.sectionContainer}>
          <View>
            <Image
              source={menu}
              style={{width: 20, height: 20, display: 'none'}}
              onPress={() => DrawerLayout.current.openDrawer()}
            />
          </View>
          <View style={styles.left}>
            <Image source={Chat} style={styles.icon} />
            <Image source={Carts} style={styles.icon} />

            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                source={
                  profile.image === null ? DefaultImg : {uri: profile.image}
                }
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 100,
                  marginLeft: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {children}
      </DrawerLayout>
    </>
  );
}

export default Navbar;
