import React, {useState, useCallback} from 'react';

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
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
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
  // const [isLoading, setLoading] = useState(false)
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
      console.log(value);
      console.log(statusPaid);
      const result = await transactions(getToken, {
        // product_id: product.id_product,
        // promo_id: product.id_promo,
        // delivery_id: product.delivery,
        // method_payment: value,
        // qty: product.qty,
        // tax: 10,
        // total: product.total,
        // status: statusPaid,

        product_id: product.id,
        qty: product.qty,
        shiping: product.shiping,
        total: product.total,
        payment: value,
        status: statusPaid,
        // image: product.image,
        // product_name: product.product_name,
        // price: product.price,
        // size: product.size,
        // subTotal: product.total,
      });
      // await handleShowNotification(
      //   result.data.result.data.name,
      //   result.data.result.data.image,
      // );
      // console.log(result);
      handleRemoveRedux();
      setLoading(false);
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <Image
          source={back}
          size={20}
          style={{marginTop: 5, marginRight: 40}}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.titleNavbar}>Payment</Text>
      </View>
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
              {/* <Text style={styles.Title}>{cartState.productName}</Text>
              <Text style={styles.Title}>x {cartState.qty}</Text>
              <Text style={styles.Title}>{size()}</Text> */}
            </View>
            <View style={{marginHorizontal: 20}}>
              <Text style={styles.price}>
                <C>{costing(product.total)}</C>
              </Text>
              {/* <Text style={styles.price}>IDR {costing(cartState.price)}</Text> */}
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
          {/* <Text style={styles.prices}>IDR {costing(cartState.subTotal)}</Text> */}
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
                Proceed payment
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
