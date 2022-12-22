import React, {useState} from 'react';

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
import styles from '../../styles/Cart';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
// import Sample from "../image/Hazel.png"
import Icons from 'react-native-vector-icons/FontAwesome5';
import {Divider} from '@rneui/themed';
import back from '../../assets/images/backblack.png';

import {useDispatch, useSelector} from 'react-redux';
// import transactionActions from '../../redux/actions/transaction';
import authAction from '../../redux/actions/auth';

function Cart() {
  //   const [quantity, setQuantity] = useState(1);

  //   const dispatch = useDispatch();
  //   const cartState = useSelector(state => state.transaction.cart);
  const dispatch = useDispatch();
  const product = useSelector(state => state.auth.product);
  const [quantity, setQuantity] = useState(product.qty);
  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  const min = () => {
    setQuantity(quantity === 1 ? 1 : quantity - 1);
  };

  const max = () => {
    setQuantity(quantity === 10 ? 10 : quantity + 1);
    // console.log('tambah');
  };

  const costing = price => {
    return (
      'Rp ' +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  };

  const getItemTotal = () => {
    let price = product.price * quantity;
    return costing(price);
  };

  const getTax = () => {
    let price = product.price * quantity;
    const tax = price / 10;
    return costing(tax);
  };
  const getSizeCost = () => {
    let cost = 0;
    if (product.size === 'L') cost = 6000;
    if (product.size === 'XL') cost = 12000;
    if (quantity > 1) cost = cost * quantity;
    return costing(cost);
  };
  const getTotal = () => {
    let price = product.price * quantity;
    let tax = price / 10;
    let cost = 0;
    if (product.size === 'L') cost = 6000;
    if (product.size === 'XL') cost = 12000;
    if (quantity > 1) cost = cost * quantity;
    const total = price + tax + cost;
    return costing(total);
  };

  const handleCheckout = () => {
    let cost = 0;
    if (product.size === 'L') cost = 6000;
    if (product.size === 'XL') cost = 12000;
    if (quantity > 1) cost = cost * quantity;
    let price = product.price * quantity;
    let tax = price / 10;
    const total = price + cost + tax;
    const data = {
      id: product.id,
      image: product.image,
      product_name: product.product_name,
      price: product.price,
      size: product.size,
      qty: quantity,
      subTotal: total,

      // id: product.id,
      // price: product.price,
      // product_name: product.product_name,
      // total: 0,
      // image: product.image,
      // qty: 1,
      // size: size,
    };
    // console.log(cost);
    dispatch(authAction.productThunk(data));
    navigation.navigate('Checkout');
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
        <Text style={styles.titleNavbar}>My Cart</Text>
      </View>

      <View style={{paddingTop: 40}}>
        <View style={{minHeight: 250}}>
          <View style={styles.card}>
            <View
              style={{
                marginRight: 20,
                backgroundColor: 'white',
                width: width / 3,
                padding: 10,
                borderRadius: 30,
              }}>
              <Image source={{uri: product.image}} style={styles.cardImage} />
              <Text style={styles.cardPrice}>{costing(product.price)}</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>{product.product_name}</Text>
              <View style={styles.quantity}>
                {/* <Pressable style={styles.quantityBtn}>
                  <IconComunity name={'window-minimize'} size={15} />
                </Pressable> */}
                <Pressable>
                  <View
                    style={
                      quantity === 1 ? styles.quantityBtn1 : styles.quantityBtn
                    }
                    onStartShouldSetResponder={min}>
                    <Text style={styles.up}>-</Text>
                  </View>
                </Pressable>
                <Text style={styles.qtyText}>{quantity}</Text>

                <Pressable>
                  <View
                    style={
                      quantity === 10
                        ? styles.quantityBtn10
                        : styles.quantityBtn
                    }
                    onPress={max}
                    onStartShouldSetResponder={max}>
                    <Text style={styles.up}>+</Text>
                  </View>
                </Pressable>

                {/* <Pressable style={styles.quantityBtn}>
                  <Icons name={'plus'} size={10} />
                </Pressable> */}
              </View>
            </View>
          </View>
        </View>
        <Divider width={1} style={{width: '100%', marginTop: 15}} />
        <View style={{paddingTop: 30}}>
          <View style={styles.containerTotal}>
            <Text style={styles.textTotal}>Item Total</Text>
            <Text style={styles.textPrice}>{getItemTotal()}</Text>
          </View>
          <View style={styles.containerTotal}>
            <Text style={styles.textTotal}>Size Cost</Text>
            <Text style={styles.textPrice}>{getSizeCost()}</Text>
          </View>
          <View style={styles.containerTotal}>
            <Text style={styles.textTotal}>Tax</Text>
            <Text style={styles.textPrice}>{getTax()}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 20,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontWeight: 'bold',
              fontSize: 20,
              color: 'black',
            }}>
            Total :
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontWeight: 'bold',
              fontSize: 20,
              color: 'black',
            }}>
            {getTotal()}
          </Text>
        </View>
        <View style={{paddingTop: 20, paddingBottom: 30}}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleCheckout}>
            <View
              style={{
                marginVertical: 15,
                backgroundColor: '#FFBA33',
                height: 70,
                borderRadius: 20,
                paddingLeft: 30,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              {/* <IconComunity
                name={'chevron-right'}
                size={25}
                style={{color: 'black'}}
              /> */}
              <Text
                style={{
                  paddingLeft: 100,
                  color: 'black',
                  fontFamily: 'Poppins-Bold',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                CHECKOUT
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* {cartState.length !== 0 && (
        <>
          <View style={{paddingTop: 40}}>
            <View style={{minHeight: 250}}>
              <View style={styles.card}>
                <View
                  style={{
                    marginRight: 20,
                    backgroundColor: 'white',
                    width: width / 3,
                    padding: 10,
                    borderRadius: 30,
                  }}>
                  <Image
                    source={{uri: cartState.image}}
                    style={styles.cardImage}
                  />
                  <Text style={styles.cardPrice}>
                    IDR {costing(cartState.price)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.cardTitle}>{cartState.productName}</Text>
                  <View style={styles.quantity}>
                    <Pressable
                      style={styles.quantityBtn}
                      onPress={() => {
                        quantity !== 1 && setQuantity(quantity - 1);
                      }}>
                      <IconComunity name={'window-minimize'} size={15} />
                    </Pressable>
                    <Text style={styles.qtyText}>{quantity}</Text>
                    <Pressable
                      style={styles.quantityBtn}
                      onPress={() => {
                        setQuantity(quantity + 1);
                      }}>
                      <Icons name={'plus'} size={10} />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
            <Divider width={1} style={{width: '100%', marginTop: 15}} />
            <View style={{paddingTop: 30}}>
              <View style={styles.containerTotal}>
                <Text style={styles.textTotal}>Item Total</Text>
                <Text style={styles.textPrice}>IDR {getItemTotal()}</Text>
              </View>
              <View style={styles.containerTotal}>
                <Text style={styles.textTotal}>Size Cost</Text>
                <Text style={styles.textPrice}>IDR {getSizeCost()}</Text>
              </View>
              <View style={styles.containerTotal}>
                <Text style={styles.textTotal}>Tax</Text>
                <Text style={styles.textPrice}>IDR 10.000</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 20,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: 'black',
                }}>
                Total :
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: 'black',
                }}>
                IDR {getTotal()}
              </Text>
            </View>
            <View style={{paddingTop: 20, paddingBottom: 30}}>
              <TouchableOpacity onPress={handleCheckout} activeOpacity={0.8}>
                <View
                  style={{
                    marginVertical: 15,
                    backgroundColor: '#FFBA33',
                    height: 70,
                    borderRadius: 20,
                    paddingLeft: 30,
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                  }}>
                  <IconComunity
                    name={'chevron-right'}
                    size={25}
                    style={{color: 'black'}}
                  />
                  <Text
                    style={{
                      paddingLeft: 80,
                      color: 'black',
                      fontFamily: 'Poppins-Bold',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    CHECKOUT
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )} */}
    </ScrollView>
  );
}

export default Cart;
