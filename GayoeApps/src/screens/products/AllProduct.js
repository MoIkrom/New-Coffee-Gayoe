import React, {useEffect} from 'react';

import styles from '../../styles/AllProduct';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
// import Sample from '../image/food4.png';

import {View, Image, ScrollView, Text, Pressable} from 'react-native';

import {useNavigation} from '@react-navigation/native';
// import {useDispatch, useSelector} from 'react-redux';
// import productAction from '../../redux/actions/product';

function Favorite() {
  //   const dispatch = useDispatch();
  const navigation = useNavigation();
  //   const product = useSelector(state => state.product.data);
  //   console.log(product);

  const costing = price => {
    return (
      'IDR ' +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  };

  //   useEffect(() => {
  //     dispatch(productAction.getAllThunk());
  //   }, [dispatch]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.navbar}>
        <IconComunity
          name={'chevron-left'}
          size={20}
          style={styles.icons}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.titleNavbar}>Favorite Products</Text>
      </View>
      <ScrollView style={styles.scrolles}>
        <View>
          <Text style={styles.category}>Everyone's Favorite</Text>
          <View style={styles.containerCard}>
            <Pressable
              style={styles.card}
              onPress={() => {
                navigation.navigate('ProductDetail', data.id);
              }}>
              <View>
                <Text style={styles.titleFood}>data.product_name</Text>
                <Text style={styles.priceFood}>Rp 10.000</Text>
              </View>
            </Pressable>

            {/* {product?.map(data => {
              {
                return (
                  <>
                    <Pressable
                      style={styles.card}
                      onPress={() => {
                        navigation.navigate('ProductDetail', data.id);
                      }}>
                      <Image
                        // source={{uri: data.image}}
                        style={styles.imgProduct}
                      />
                      <View>
                        <Text style={styles.titleFood}>
                          {'data.product_name'}
                          {/* {data.product_name} */}
            {/* </Text>
                        <Text style={styles.priceFood}>
                          {costing(10000)}
                           {costing(data.price)} 
                        </Text>
                      </View>
                    </Pressable>
                  </>
                );
              }
            })}  */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Favorite;
