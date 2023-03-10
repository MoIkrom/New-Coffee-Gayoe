import React, {useState, useEffect, useCallback} from 'react';

import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Pressable,
  Linking,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import styles from '../../styles/Payment';
import {onBackPress} from '../../utils/backpress';
import {Divider} from '@rneui/themed';
import back from '../../assets/images/backblack.png';
import card from '../../assets/images/card.png';
import bank from '../../assets/images/bank.png';
import cod from '../../assets/images/cod.png';

import {useDispatch, useSelector} from 'react-redux';
import {transactions} from '../../utils/api';
import authAction from '../../redux/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
('');
// import axios from 'axios';

function Payment() {
  // const [Payment, setPayment] = useState();
  const product = useSelector(state => state.auth.product);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [value, setValue] = useState('Card');
  const [statusPaid, setStatusPaid] = useState('Paid');
  const [loading, setLoading] = useState(false);

  const handleRemoveRedux = () => {
    dispatch(
      authAction.productThunk({
        id: null,
        image: null,
        product_name: null,
        price: 0,
        size: null,
        qty: 0,
        subTotal: 0,
        total: 0,
        shiping: null,
      }),
    );
  };

  const costing = price => {
    return (
      'Rp ' +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  };

  const handleTransactions = async () => {
    try {
      if (value === 'Bank') setStatusPaid('Paid');
      if (value === 'Card') setStatusPaid('Paid');
      if (value === 'Cash On Delivery') setStatusPaid('Pending');
      setLoading(true);
      const getToken = await AsyncStorage.getItem('token');
      const result = await transactions(getToken, {
        product_id: product.id,
        qty: product.qty,
        shiping: product.shiping,
        total: product.total,
        payment: value,
        status: statusPaid,
      });
      result;
      handleRemoveRedux();
      setLoading(false);
      ToastAndroid.showWithGravity(
        statusPaid === 'Pending' ? 'Payment Pending . . . ' : 'Payment Success',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      navigation.replace('History');
    } catch (err) {
      console.log(err);
      ToastAndroid.showWithGravity(
        err.response.data.msg,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      setLoading(false);
    }
  };
  const B = props => (
    <Text style={{fontWeight: 'bold', fontSize: 14}}>{props.children}</Text>
  );
  const C = props => (
    <Text style={{fontWeight: 'bold', fontSize: 22}}>{props.children}</Text>
  );
  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    onBackPress(handleBackPress);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <View style={styles.navbar}>
          <Image
            source={back}
            size={20}
            style={{marginTop: 5, marginRight: 40}}
          />
          <Text style={styles.titleNavbar}>Payment</Text>
        </View>
      </TouchableOpacity>
      <View style={{paddingTop: 30}}>
        <Text style={styles.TitleProduct}>Products</Text>
        <View style={styles.Containercard}>
          <View style={styles.card}>
            <View>
              <Image
                source={{uri: product.image}}
                style={{width: 70, height: 70, borderRadius: 100}}
              />
            </View>
            <View style={{marginHorizontal: 15, minWidth: 100, maxWidth: 80}}>
              <Text style={styles.Title}>
                Name : <B>{product.product_name}</B>
              </Text>
              <Text style={styles.Title}>
                Quantity : <B>{product.qty}</B>
              </Text>
              <Text style={styles.Title}>
                Size : <B>{product.size}</B>
              </Text>
            </View>
            <View style={{marginHorizontal: 20}}>
              <Text style={styles.price}>
                <C>{costing(product.total)}</C>
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.TitleProduct}>Payment method</Text>
        <View style={styles.CardMethods}>
          <View>
            <View style={styles.radio}>
              <Pressable
                style={
                  value === 'Card' ? styles.checkedOuter : styles.unchekedOuter
                }
                onPress={() => {
                  setValue('Card');
                  setStatusPaid('Paid');
                }}>
                <View
                  style={
                    value === 'Card' ? styles.checkedInner : undefined
                  }></View>
              </Pressable>
            </View>
            <View style={styles.radio}>
              <Pressable
                style={
                  value === 'Bank' ? styles.checkedOuter : styles.unchekedOuter
                }
                onPress={() => {
                  setValue('Bank');
                  setStatusPaid('Paid');
                }}>
                <View
                  style={
                    value === 'Bank' ? styles.checkedInner : undefined
                  }></View>
              </Pressable>
            </View>
            <View style={styles.radio}>
              <Pressable
                style={
                  value === 'Cash On Delivery'
                    ? styles.checkedOuter
                    : styles.unchekedOuter
                }
                onPress={() => {
                  setValue('Cash On Delivery');
                  setStatusPaid('Pending');
                }}>
                <View
                  style={
                    value === 'Cash On Delivery'
                      ? styles.checkedInner
                      : undefined
                  }></View>
              </Pressable>
            </View>
          </View>
          <View>
            <View style={styles.methodList}>
              <View style={styles.methodCard}>
                <Image source={card} style={styles.cardIcon} size={20} />
              </View>
              {/* <Text style={styles.textMethod}>Card</Text> */}
              <Text
                style={styles.textMethod}
                onPress={() => {
                  setValue('Card');
                }}>
                Card
              </Text>
            </View>
            <Divider
              width={1}
              style={{width: '100%', marginTop: 5, marginBottom: 3.5}}
            />
            <View style={styles.methodList}>
              <View style={styles.methodBank}>
                <Image source={bank} style={styles.cardIcon} size={20} />
              </View>
              {/* <Text style={styles.textMethod}>Bank account</Text> */}
              <Text
                style={styles.textMethod}
                onPress={() => {
                  setValue('Bank');
                }}>
                Bank account
              </Text>
            </View>
            <Divider
              width={1}
              style={{width: '100%', marginTop: 5, marginBottom: 3.5}}
            />
            <View style={styles.methodList}>
              <View style={styles.methodCod}>
                <Image source={cod} style={{color: 'black'}} size={20} />
              </View>
              {/* <Text style={styles.textMethod}>Cash on delivery</Text> */}
              <Text
                style={styles.textMethod}
                onPress={() => {
                  setValue('Cash On Delivery');
                }}>
                Cash on delivery
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 10,
            paddingBottom: 20,
            alignItems: 'center',
          }}>
          <Text style={styles.totals}>Total</Text>
          <Text style={styles.prices}>{costing(product.total)}</Text>
        </View>
        <View style={{paddingBottom: 30}}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleTransactions}>
            {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handlePress();
            }}> */}
            <View
              style={{
                marginBottom: 20,
                backgroundColor: '#6A4029',
                height: 70,
                borderRadius: 20,
                paddingLeft: 30,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-Bold',
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: 80,
                }}>
                {loading ? (
                  <View
                    style={{
                      marginHorizontal: 50,
                    }}>
                    <ActivityIndicator
                      style={{
                        marginHorizontal: 50,
                      }}
                      size="large"
                      color="#FFBA33"
                    />
                  </View>
                ) : (
                  'Process payment'
                )}
              </Text>

              {/* {isLoading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Poppins-Bold',
                    fontWeight: 'bold',
                    fontSize: 20,
                    paddingLeft: 80,
                  }}>
                  Proceed payment
                </Text>
              )} */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Payment;
