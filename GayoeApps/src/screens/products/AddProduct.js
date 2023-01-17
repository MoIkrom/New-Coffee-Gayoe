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
import DefaultImg from '../../assets/images/foto.png';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ButtonOpacity from '../../components/ButtonOpacity';
import {onBackPress} from '../../utils/backpress';
import {editProfile} from '../../utils/api';
import {useNavigation} from '@react-navigation/native';
import pencil from '../../assets/images/pencil.png';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const back = require('../../assets/images/iconBack.png');

  const [filePath, setFilePath] = useState('');
  const [editPhoto, setEditPhoto] = useState(false);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [product_name, setProduct_name] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    onBackPress(handleBackPress);
  }, []);

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

      if (product_name) formData.append('product_name', product_name);
      if (price) formData.append('price', price);
      if (category) formData.append('category', category);
      if (description) formData.append('description', description);
      if (image)
        formData.append('image', {
          name: image[0].fileName,
          type: image[0].type,
          uri: image[0].uri,
        });

      axios.post(`https://coffee-gayoe.vercel.app/api/v1/product`, formData, {
        headers: {'x-access-token': getToken},
      });
      ToastAndroid.showWithGravity(
        'Success Add Product',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      navigation.push('HomePage');
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
          {filePath === '' ? (
            <Image
              source={DefaultImg}
              style={{marginTop: 30, width: 150, height: 150}}
            />
          ) : (
            <Image source={{uri: filePath}} style={styles.img} />
          )}

          <View style={styles.pencil_bar}>
            {!editPhoto ? (
              <View>
                <TouchableOpacity onPress={() => setEditPhoto(true)}>
                  <Image
                    source={pencil}
                    style={{position: 'relative', top: 0, right: 0}}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity>
                  <Text
                    onPress={() => {
                      setEditPhoto(false);
                      //   setFilePath('');
                    }}
                    style={{color: '#ffffff'}}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        {!editPhoto ? (
          <View style={styles.contbtnedit}></View>
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
            <Text style={styles.label}>Product Name :</Text>

            <TextInput
              style={styles.input}
              placeholder="Input Product Name"
              placeholderTextColor="#9F9F9F"
              value={product_name}
              onChangeText={text => setProduct_name(text)}
            />

            <Text style={styles.label}>Category :</Text>

            <TextInput
              style={styles.input}
              placeholder="Input Category"
              placeholderTextColor="#9F9F9F"
              value={category}
              onChangeText={text => setCategory(text)}
            />

            <Text style={styles.label}> Price :</Text>

            <TextInput
              style={styles.input}
              placeholder="Input Price"
              placeholderTextColor="#9F9F9F"
              value={price}
              onChangeText={text => setPrice(text)}
            />
          </View>
          <View>
            <Text style={styles.label}>Description:</Text>

            <TextInput
              style={[styles.input, styles.contaddres]}
              placeholder="Input Description Product"
              placeholderTextColor="#9F9F9F"
              value={description}
              onChangeText={text => setDescription(text)}
            />
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
  );
};

export default AddProduct;
