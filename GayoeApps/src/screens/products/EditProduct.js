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
import {editProduct} from '../../utils/api';
import {useNavigation} from '@react-navigation/native';
import bg from '../../assets/images/brown.png';
import pencil from '../../assets/images/pencil.png';

const EditProfile = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const back = require('../../assets/images/iconBack.png');
  // const [birthday, setBirthday] = useState(profile.birthday);
  // const [gender, setGender] = useState(profile.gender);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [address, setAddress] = useState('');
  const [editPhoto, setEditPhoto] = useState(false);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState('');
  const [product, setProduct] = useState({});
  const [productName, setProductName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const {id_product} = route.params;

  const getProductByid = () => {
    axios
      .get(`https://coffee-gayoe.vercel.app/api/v1/product/${id_product}`)
      .then(res => {
        setProduct(res.data.result.data[0]);
        setProductName(res.data.result.data[0].product_name);
        setImage(res.data.result.result[0].image);
        setPrice(res.data.result.result[0].price);
        setDescription(res.data.result.result[0].description);
        setCategory(res.data.result.result[0].category);
        setLoading(false);
        console.log(res.data.result.data[0].category);
      })

      .catch(err => {
        console.log(err);
        // console.log(res.data.result.data[0].category);
      });
  };
  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    onBackPress(handleBackPress);
    getProductByid();
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
      const {id_product} = route.params;
      const getToken = await AsyncStorage.getItem('token');
      const formData = new FormData();

      if (productName) formData.append('product_name', productName);
      // if (price) formData.append('price', price);
      // if (description) formData.append('description', description);
      if (category) formData.append('category', category);
      if (image)
        formData.append('image', {
          name: image[0].fileName,
          type: image[0].type,
          uri: image[0].uri,
        });

      axios.patch(
        `https://coffee-gayoe.vercel.app/api/v1/product/${id_product}`,
        formData,
        {headers: {'x-access-token': getToken}},
      );
      ToastAndroid.showWithGravity(
        'Success Edit Product',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      console.log(formData);
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
          {/* {filePath === null ? (
            <Image
              source={image !== null ? image : DefaultImg}
              style={styles.img}
            />
          ) : (
            <Image source={{uri: filePath}} style={styles.img} />
          )} */}

          <Image source={image} style={styles.img} />

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
                      setEditPhoto(false);
                      // setFilePath(image);
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
                {!edit ? 'Edit Data' : 'Save Data'}
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
            <Text style={styles.label}>Product Name :</Text>
            {!edit ? (
              <Text style={styles.Text_input}>
                {productName !== null ? `${productName}` : `Input Product Name`}
              </Text>
            ) : (
              <TextInput
                style={styles.input}
                placeholder="Input First Name"
                placeholderTextColor="#9F9F9F"
                value={productName}
                onChangeText={text => setProductName(text)}
              />
            )}
            {/* <Text style={styles.label}>Category :</Text>
            {!edit ? (
              <Text style={styles.Text_input}>
                {category !== null ? `${category}` : `Set Category`}
              </Text>
            ) : (
              <TextInput
                style={styles.input}
                placeholder="Input Category Product"
                placeholderTextColor="#9F9F9F"
                value={category}
                onChangeText={text => setCategory(text)}
              />
            )} */}
            {/* <Text style={styles.label}>Price :</Text>
            {!edit ? (
              <Text style={styles.Text_input}>
                {price !== null ? `${price}` : `Input Price`}
              </Text>
            ) : (
              <TextInput
                style={styles.input}
                placeholder="input display name"
                placeholderTextColor="#9F9F9F"
                value={price}
                onChangeText={text => setPrice(text)}
              />
            )} */}
          </View>
          <View style={styles.input_bar}>
            <Text style={styles.label}>Category :</Text>
            {!edit ? (
              <Text style={styles.Text_input}>{category}</Text>
            ) : (
              <TextInput
                style={styles.input}
                placeholder="Input Category"
                placeholderTextColor="#9F9F9F"
                value={category}
                onChangeText={text => setCategory(text)}
              />
            )}
            {/* <Text style={styles.label}>Category :</Text>
            {!edit ? (
              <Text style={styles.Text_input}>
                {category !== null ? `${category}` : `Set Category`}
              </Text>
            ) : (
              <TextInput
                style={styles.input}
                placeholder="Input Category Product"
                placeholderTextColor="#9F9F9F"
                value={category}
                onChangeText={text => setCategory(text)}
              />
            )} */}
            {/* <Text style={styles.label}>Price :</Text>
            {!edit ? (
              <Text style={styles.Text_input}>
                {price !== null ? `${price}` : `Input Price`}
              </Text>
            ) : (
              <TextInput
                style={styles.input}
                placeholder="input display name"
                placeholderTextColor="#9F9F9F"
                value={price}
                onChangeText={text => setPrice(text)}
              />
            )} */}
          </View>

          {/* <View>
            <Text style={styles.label}>Description:</Text>
            {!edit ? (
              <Text style={styles.Text_input}>
                {description !== null
                  ? `${description}`
                  : `Input Description Product`}
              </Text>
            ) : (
              <TextInput
                style={[styles.input, styles.contaddres]}
                placeholder="Input Description Product"
                placeholderTextColor="#9F9F9F"
                value={description}
                onChangeText={text => setDescription(text)}
              />
            )}
          </View> */}
        </View>
        {edit === true ? (
          ''
        ) : (
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
        )}
      </View>
    </ScrollView>
    // </NativeBaseProvider>
  );
};

export default EditProfile;
6;
