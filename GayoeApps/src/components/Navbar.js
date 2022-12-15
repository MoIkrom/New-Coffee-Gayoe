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

import {useNavigation} from '@react-navigation/native';
import Profile from '../screens/profile/Index';

// import { useDispatch, useSelector } from 'react-redux';
// import userAction from '../redux/actions/user';
// import authAction from '../redux/actions/auth';

function Navbar({children}) {
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);

  const toProfile = () => {
    navigation.navigate('Profile');
  };
  const toHistory = () => {
    navigation.navigate('History');
  };
  const renderDrawer = () => {
    return (
      <View>
        <View style={styles.continerSwipe}>
          {/* <Image source={{uri: user.image}} style={styles.imageDrawer} /> */}
          <Text style={styles.username}>username</Text>
          {/* <Text style={styles.username}>{user.username}</Text> */}
          <Text style={styles.email}>email.com</Text>
          {/* <Text style={styles.email}>{user.email}</Text> */}
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
            <Pressable
              style={styles.containerBottom}
              onPress={() => navigation.navigate('Profile')}>
              {/* <Pressable style={styles.containerBottom} onPress={toProfile}> */}
              {/* <Image source={IconUser} style={styles.imageBottom}/> */}
              <Icons
                name={'user-circle'}
                size={20}
                style={styles.imageBottom}
              />
              <Text style={styles.textBottom}>Edit Profile</Text>
            </Pressable>
            <Divider style={{width: '90%', margin: 3}} />
            <Pressable style={styles.containerBottom} onPress={toHistory}>
              {/* <Image source={IconUser} style={styles.imageBottom}/> */}
              <IconComunity
                name={'cart-arrow-down'}
                size={20}
                style={styles.imageBottom}
              />
              <Text style={styles.textBottom}>Orders</Text>
            </Pressable>
            <Divider style={{width: '90%', margin: 3}} />
            <View style={styles.containerBottom}>
              {/* <Image source={IconMenus} style={styles.imageBottom}/> */}
              <IconComunity
                name={'food-outline'}
                size={20}
                style={styles.imageBottom}
              />
              <Text style={styles.textBottom}>All menu</Text>
            </View>
            <Divider style={{width: '90%', margin: 3}} />
            <View style={styles.containerBottom}>
              <Icons
                name={'sticky-note'}
                size={20}
                style={styles.imageBottom}
              />
              <Text style={styles.textBottom}>Privacy policy</Text>
            </View>
            <Divider style={{width: '90%', margin: 3}} />
            <View style={styles.containerBottom}>
              {/* <Image source={IconUser} style={styles.imageBottom}/> */}
              <IconComunity
                name={'shield-half-full'}
                size={20}
                style={styles.imageBottom}
              />
              <Text style={styles.textBottom}>Security</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.containerLogout}
            onPress={() => setModalVisible(true)}>
            {/* <Image source={IconUser} style={styles.imageBottom}/> */}
            <IconFW
              name={'long-arrow-right'}
              size={20}
              style={styles.imageBottom}
            />
            <Text style={styles.textBottom}>Sign-out</Text>
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
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Pressable style={[styles.button, styles.buttonClose]}>
                  {/* <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={logoutHandler}> */}

                  <Text style={styles.textStyle}>YES</Text>

                  {/* {auth.isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.textStyle}>YES</Text>
                  )} */}
                </Pressable>
                <Pressable style={[styles.button, styles.buttonClose]}>
                  {/* onPress={() => setModalVisible(!modalVisible)}> */}
                  <Text style={styles.textStyle}>NO</Text>
                </Pressable>
              </View>
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
          <View onPress={() => DrawerLayout.current.openDrawer()}>
            <Image source={Icon} />
            <IconComunity
              name={'gesture-swipe-right'}
              style={{fontSize: 40, color: 'black'}}
            />
          </View>
          <View style={styles.left}>
            <Image source={Chat} style={styles.icon} />
            <Image source={Search} style={styles.icon} />
            <Icons
              name={'comment'}
              style={{
                transform: [{rotateY: '180deg'}],
                fontSize: 25,
                marginHorizontal: 7,
                color: 'grey',
              }}
            />
            <IconIon name={'search-outline'} style={styles.Icons} />
            <IconIon name={'cart-outline'} style={styles.Icons} />
            <Image source={Chart} style={styles.icon} />
            <Icons name={'search'} size={20} style={styles.icon} />
            <Icons name={'shopping-cart'} size={20} style={styles.icon} />
          </View>
        </View>
        {children}
      </DrawerLayout>
    </>
  );
}

export default Navbar;
