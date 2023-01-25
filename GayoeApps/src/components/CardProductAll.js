import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from '../styles/CardProductAll';
import {useNavigation} from '@react-navigation/native';

// const CardProduct = props => {
const CardProduct = ({img, name, price, id}) => {
  const navigation = useNavigation();
  const costing = price => {
    return (
      'Rp ' +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  };
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.push('ProductDetail', {id_product: id});
        // navigation.navigate('ProductDetail', id);
        // console.log(id);
      }}>
      <View style={styles.containerImage}>
        {/* <Image source={img} style={styles.imageCard} /> */}
        <Image source={{uri: img}} style={styles.imageCard} />
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.cardTitle}>{name}</Text>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          top: 20,
        }}>
        <Text style={styles.cardPrice}>{costing(price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardProduct;
