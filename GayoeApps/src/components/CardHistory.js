import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {ListItem, Button} from '@rneui/themed';
import {useSelector} from 'react-redux';
const CardHistory = props => {
  const profile = useSelector(state => state.auth.profile);
  // const product = useSelector(state => state.auth.product);

  const costing = price => {
    return (
      'Rp ' +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  };
  return (
    <ListItem.Swipeable
      style={styles.card}
      rightContent={() => (
        <Button
          title=""
          //ganti dengan axios delete per id
          onPress={props.handler}
          icon={{
            name: `${profile.role}` === 'admin' ? 'check' : 'delete',
            color: 'white',
          }}
          buttonStyle={{
            borderRadius: 50,
            width: 60,
            height: 60,
            marginTop: '60%',
            marginLeft: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#6A4029',
          }}
        />
      )}>
      <View style={styles.card_bar}>
        <View style={styles.img_bar}>
          <Image style={styles.img} source={props.image} />
        </View>
        <View style={styles.content_right}>
          <Text style={styles.name}>{props.name_product}</Text>
          <Text style={styles.price}>
            {profile.role === 'admin'
              ? `${costing(props.price)} (x${props.qty})`
              : costing(props.price)}
          </Text>
          {profile.role === 'admin' ? (
            <Text style={styles.price}>{props.name} </Text>
          ) : null}
          <Text
            style={
              props.status === 'Paid'
                ? {fontWeight: 'bold', fontSize: 18, color: '#008000'}
                : {fontWeight: 'bold', fontSize: 18, color: '#FA4A0C'}
            }>
            {props.status}
          </Text>
        </View>
      </View>
      <View></View>
    </ListItem.Swipeable>
  );
};

export default CardHistory;

const styles = StyleSheet.create({
  card_bar: {
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    paddingHorizontal: 40,
  },
  img_bar: {width: '80%'},
  img: {
    width: 100,
    height: 100,
    borderRadius: 200,
    marginLeft: 10,
  },
  name: {
    fontWeight: '700',
    fontSize: 22,
    fontFamily: 'Poppins',
    color: '#000',
  },
  price: {
    fontWeight: '400',
    fontSize: 18,
    marginVertical: 5,
    fontFamily: 'Poppins',
    color: '#895537',
  },
  status: {
    fontWeight: '400',
    fontSize: 18,
    marginVertical: 5,
    fontFamily: 'Poppins',
    color: '#895537',
  },
  card: {
    marginTop: 20,
    borderRadius: 20,
    padding: 2,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
  },
});
