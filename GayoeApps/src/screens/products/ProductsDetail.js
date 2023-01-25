import React, {useEffect, useState} from 'react';

import styles from '../../styles/ProductsDetails';
import {
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ScrollView,
  ToastAndroid,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import authAction from '../../redux/actions/auth';
import back from '../../assets/images/back.png';
import cart from '../../assets/images/shopping-cart.png';
import {onBackPress} from '../../utils/backpress';

import AsyncStorage from '@react-native-async-storage/async-storage';

function ProductDetail({route}) {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const {id_product} = route.params;
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  const dispatch = useDispatch();
  const [roles, setRoles] = useState('');
  const [size, setSize] = useState('R');
  const [modalVisible, setModalVisible] = useState(false);
  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };
  const deleteProductByid = async () => {
    const token = await AsyncStorage.getItem('token');
    const role = await AsyncStorage.getItem('role');
    setLoadingModal(true);
    axios
      .delete(
        `https://coffee-gayoe.vercel.app/api/v1/product/${id_product}`,
        {headers: {'x-access-token': token}},
        role,
      )
      .then(res => {
        setModalVisible(false);
        ToastAndroid.showWithGravity(
          'Delete Product Success',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        ),
          navigation.replace('HomePage');
        setLoadingModal(false);
      })

      .catch(err => {
        console.log(err.response.data);
        console.log(id_product);

        setLoadingModal(false);
      });
  };
  const getProductByid = () => {
    axios
      .get(`https://coffee-gayoe.vercel.app/api/v1/product/${id_product}`)
      .then(res => {
        setProduct(res.data.result.data[0]);
        setLoading(false);
      })

      .catch(err => {
        console.log(err.response.data.msg);
      });
  };
  const getRoles = async () => {
    const role = await AsyncStorage.getItem('role');
    setRoles(role);
  };
  useEffect(() => {
    getProductByid();
    getRoles();
    onBackPress(handleBackPress);
  }, []);

  const costing = price => {
    return (
      'Rp ' +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  };

  const handleRedux = () => {
    dispatch(
      authAction.productThunk(
        {
          id: product.id,
          price: product.price,
          product_name: product.product_name,
          total: 0,
          image: product.image,
          qty: 1,
          size: size,
        },
        () => {
          navigation.navigate('Cart');
        },
      ),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image source={back} size={22} style={styles.icon} />
            <Text
              style={{
                color: 'white',
                marginLeft: 15,
                fontSize: 17,
                position: 'relative',
                top: -2,
              }}>
              Back
            </Text>
          </View>
        </TouchableOpacity>
        <Image source={cart} size={22} style={styles.icon} />
      </View>
      {loading ? (
        <ActivityIndicator
          style={{
            paddingHorizontal: 160,
            paddingTop: 250,
          }}
          size="large"
          color="#FFBA33"
        />
      ) : (
        <View style={styles.main}>
          <View style={styles.price}>
            <Text style={styles.priceText}>{costing(product.price)}</Text>
            {/* {product?.dataPromo === 999 ? (
                    <Text style={styles.priceText}>{detail ? costing(detail.price) : ""}</Text>
                ):
                    <>
                        <Text style={styles.strip}>  {product ?costing(detail.price) :""}  </Text>
                        <Text style={styles.priceTextDisount}>{product ? costing((parseInt(product?.dataPromo.discount) / 100) * parseInt(product?.dataProduct.price)): ""}</Text>
                    </>
                } */}
          </View>
          <View style={styles.top}>
            <Image source={{uri: product.image}} style={styles.product} />
            <Text style={styles.Title}>{product.product_name}</Text>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.firstText}>
              Delivery only on{' '}
              <Text
                style={{
                  color: '#6A4029',
                  fontFamily: 'Poppins-Bold',
                  fontWeight: 'bold',
                }}>
                Monday to friday{' '}
              </Text>{' '}
              at{' '}
              <Text
                style={{
                  color: '#6A4029',
                  fontFamily: 'Poppins-Bold',
                  fontWeight: 'bold',
                }}>
                1 - 7 pm
              </Text>
            </Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text
              style={roles === 'admin' ? {display: 'none'} : styles.sizeText}>
              {' '}
              Choose a size
            </Text>
            <View
              style={
                roles === 'admin'
                  ? {display: 'none'}
                  : {
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }
              }>
              <Pressable
                style={size === 'R' ? styles.selected : styles.button}
                onPress={() => {
                  setSize('R');
                }}>
                <Text
                  style={
                    size === 'R' ? styles.selectedText : styles.buttonText
                  }>
                  R
                </Text>
              </Pressable>
              <Pressable
                style={size === 'L' ? styles.selected : styles.button}
                onPress={() => {
                  setSize('L');
                }}>
                <Text
                  style={
                    size === 'L' ? styles.selectedText : styles.buttonText
                  }>
                  L
                </Text>
              </Pressable>
              <Pressable
                style={size === 'XL' ? styles.selected : styles.button}
                onPress={() => {
                  setSize('XL');
                }}>
                <Text
                  style={
                    size === 'XL' ? styles.selectedText : styles.buttonText
                  }>
                  XL
                </Text>
              </Pressable>
            </View>
            <View
              style={
                roles === 'admin'
                  ? {display: 'none'}
                  : {width: width, paddingBottom: 10}
              }>
              <TouchableOpacity activeOpacity={0.8} onPress={handleRedux}>
                <View
                  style={{
                    backgroundColor: '#6A4029',
                    height: 70,
                    width: width / 1.2,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Poppins-Bold',
                      fontSize: 17,
                      fontWeight: 'bold',
                    }}>
                    Add to cart
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={
                roles === 'admin'
                  ? {width: width, paddingTop: 100}
                  : {display: 'none'}
              }>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setModalVisible(true), console.log('masukChoy');
                }}>
                <View
                  style={{
                    backgroundColor: '#6A4029',
                    height: 70,
                    width: width / 1.2,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Poppins-Bold',
                      fontSize: 17,
                      fontWeight: 'bold',
                    }}>
                    Delete Product
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={
                roles === 'admin'
                  ? {width: width, paddingTop: 20}
                  : {display: 'none'}
              }>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.push('EditProduct', {id_product: id_product})
                }>
                <View
                  style={{
                    backgroundColor: '#6A4029',
                    height: 70,
                    width: width / 1.2,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Poppins-Bold',
                      fontSize: 17,
                      fontWeight: 'bold',
                    }}>
                    Edit Product
                  </Text>
                </View>
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
                  <Text style={styles.modalText}>
                    Are you sure to Delete this Product?
                  </Text>

                  {loadingModal ? (
                    <View>
                      <ActivityIndicator />
                      <Text style={{marginTop: 10}}>
                        Please Wait Loading . . .
                      </Text>
                    </View>
                  ) : (
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <Pressable
                        style={[styles.buttonModal, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.buttonModal, styles.buttonClose]}
                        onPress={deleteProductByid}>
                        <Text style={styles.textStyle}>Yes</Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              </View>
            </Modal>
          </View>
        </View>
      )}
    </View>
  );
}

export default ProductDetail;
