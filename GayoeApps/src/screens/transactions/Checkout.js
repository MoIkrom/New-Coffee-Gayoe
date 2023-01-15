import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import styles from '../../styles/Checkout';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider} from '@rneui/themed';
import axios from 'axios';
import back from '../../assets/images/backblack.png';
// import {NativeBaseProvider, Radio} from 'native-base';

import {useDispatch, useSelector} from 'react-redux';
import authAction from '../../redux/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Checkout() {
  const product = useSelector(state => state.auth.product);
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const costing = price => {
    return (
      'Rp ' +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  };
  const getProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    setLoading(true);
    axios
      .get(`https://coffee-gayoe.vercel.app/api/v1/users/profile`, {
        headers: {'x-access-token': token},
      })
      .then(res => {
        setFirstName(res.data.result.result[0].firstname);
        setLastName(res.data.result.result[0].lastname);
        setAddress(res.data.result.result[0].addres);
        setPhoneNumber(res.data.result.result[0].phone_number);

        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProfile();
  }, []);
  const handleValue = () => {
    // value === 1 ? 5000 : 0;
    if (value === '1') return 5000;
    return 0;
  };

  const deliveryMethodHandler = () => {
    const data = {
      id: product.id,
      image: product.image,
      product_name: product.product_name,
      price: product.price,
      size: product.size,
      qty: product.qty,
      subTotal: product.total,
      total: product.total + handleValue(),
      shiping: parseInt(value),
    };
    dispatch(authAction.productThunk(data));
    navigation.replace('Payment');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <Image
          source={back}
          size={20}
          style={styles.icons}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.titleNavbar}>Checkout</Text>
      </View>
      <View style={{paddingTop: 30}}>
        <Text style={styles.TitleDelivery}>Delivery</Text>
        <Text style={styles.TitleAddress}>Profile Details</Text>
        <View style={styles.CardAddress}>
          <View style={styles.contdel}>
            <Text style={styles.CardStreets}>Delivery to </Text>
            <Text style={styles.d}>
              : {firstName} {lastName}
            </Text>
          </View>
          <View style={styles.contdel}>
            <Text style={styles.CardStreets}>Address</Text>
            <Text style={styles.CardStreetDetail}> : {address}</Text>
          </View>
          <View style={styles.contdel}>
            <Text style={styles.CardStreets}>Phone Number </Text>
            <Text style={styles.CardPhone}> : {phoneNumber}</Text>
          </View>
        </View>
        <Text style={styles.TitleAddress}>Delivery methods</Text>
        <View style={styles.CardMethods}>
          <View>
            <View style={styles.radio}>
              <Pressable
                style={
                  value === '1' ? styles.checkedOuter : styles.unchekedOuter
                }
                onPress={() => {
                  setValue('1');
                }}>
                <View
                  style={
                    value === '1' ? styles.checkedInner : undefined
                  }></View>
              </Pressable>
            </View>
            <View style={styles.radio}>
              <Pressable
                style={
                  value === '2' ? styles.checkedOuter : styles.unchekedOuter
                }
                onPress={() => {
                  setValue('2');
                }}>
                <View
                  style={
                    value === '2' ? styles.checkedInner : undefined
                  }></View>
              </Pressable>
            </View>
            <View style={styles.radio}>
              <Pressable
                style={
                  value === '3' ? styles.checkedOuter : styles.unchekedOuter
                }
                onPress={() => {
                  setValue('3');
                }}>
                <View
                  style={
                    value === '3' ? styles.checkedInner : undefined
                  }></View>
              </Pressable>
            </View>
          </View>
          {/* <View style={styles.option_container}>
            <Radio.Group
              defaultValue="1"
              name="exampleGroup"
              accessibilityLabel="favorite colorscheme"
              onChange={nextValue => {
                setValue(nextValue);
              }}
              value={value}>
              <View style={styles.border_bottom}>
                <View style={styles.options}>
                  <Radio colorScheme={'amber'} value="1" my={1}>
                    Door delivery
                  </Radio>
                </View>
              </View>
              <View style={styles.border_bottom}>
                <View style={styles.options}>
                  <Radio colorScheme="amber" value="2" my={1}>
                    Pick up at store
                  </Radio>
                </View>
              </View>
              <View style={styles.margin_dine}>
                <View style={styles.options}>
                  <Radio colorScheme="amber" value="3" my={1}>
                    Dine in
                  </Radio>
                </View>
              </View>
            </Radio.Group>
          </View> */}
          <View>
            <Text
              style={styles.textMethod}
              onPress={() => {
                setValue('1');
              }}>
              Door delivery
            </Text>
            <Divider
              width={1}
              style={{width: '100%', marginTop: 6, marginBottom: 5.5}}
            />
            <Text
              style={styles.textMethod}
              onPress={() => {
                setValue('2');
              }}>
              Pick up at store
            </Text>
            <Divider
              width={1}
              style={{width: '100%', marginTop: 5, marginBottom: 5.5}}
            />
            <Text
              style={styles.textMethod}
              onPress={() => {
                setValue('3');
              }}>
              Dine In
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 25,
          }}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.price}>
            {costing(product.total + handleValue())}
          </Text>
        </View>
        <View style={{paddingBottom: 30}}>
          <TouchableOpacity activeOpacity={0.8} onPress={deliveryMethodHandler}>
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
                  paddingLeft: 60,
                }}>
                Proceed to payment
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Checkout;
