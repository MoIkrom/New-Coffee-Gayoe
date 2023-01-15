import React, {useEffect, useState} from 'react';

import styles from '../../styles/ProductsDetails';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
// import Sample from '../image/product.png'
// import ButtonCustom from '../components/FancyButton'

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

// import transactionActions from '../../redux/actions/transaction';
// import axios from 'axios';

function ProductDetail({route}) {
  // function ProductDetail(props) {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const {id_product} = route.params;
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [size, setSize] = useState('R');
  const [modalVisible, setModalVisible] = useState(false);
  const handleBackPress = () => {
    navigation.goBack();
    return true;
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
  useEffect(() => {
    getProductByid();
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
        <Image
          source={back}
          size={22}
          style={styles.icon}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Image source={cart} size={22} style={styles.icon} />
      </View>
      {loading ? (
        <ActivityIndicator
          style={{
            paddingHorizontal: 160,
            paddingTop: 250,
          }}
          size="large"
          color="#0000ff"
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
            <Text style={styles.sizeText}> Choose a size</Text>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
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
            <View style={{width: width, paddingBottom: 30}}>
              {/* <ButtonCustom text={"Add to cart"} textColor={"white"} color={"#6A4029"}/> */}
              <TouchableOpacity activeOpacity={0.8} onPress={handleRedux}>
                {/* <TouchableOpacity onPress={addCart} activeOpacity={0.8}> */}
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
            <Modal
              visible={modalVisible}
              transparent={true}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Are you want to continue transaction?
                  </Text>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    {/* <Pressable
                    onPress={() => {
                      addCart();
                      setModalVisible(false);
                      return ToastAndroid.showWithGravityAndOffset(
                        `Added Product To Cart`,
                        ToastAndroid.SHORT,
                        ToastAndroid.TOP,
                        25,
                        50,
                      );
                    }}
                    style={[styles.buttonModal, styles.buttonClose]}>
                    <Text style={styles.textStyle}>Continue</Text>
                  </Pressable> */}
                    <Pressable
                      style={[styles.buttonModal, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                  </View>
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
