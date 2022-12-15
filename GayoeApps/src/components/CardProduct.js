import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React from 'react';
import styles from '../styles/CardProduct';
import {useNavigation} from '@react-navigation/native';

const CardProduct = ({img, name, price, id}) => {
  const navigation = useNavigation();
  const costing = price => {
    return (
      'IDR ' +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  };
  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        navigation.navigate('ProductDetail', id);
      }}>
      <View style={styles.containerImage}>
        <Image source={img} style={styles.imageCard} />
        {/* <Image source={{uri: img}} style={styles.imageCard} /> */}
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardPrice}>{costing(price)}</Text>
      </View>
    </Pressable>
  );
};

export default CardProduct;
