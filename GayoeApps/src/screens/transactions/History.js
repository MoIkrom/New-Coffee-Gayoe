import React, {useEffect} from 'react';

import styles from '../../styles/History';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {SwipeItem, SwipeButtonsContainer} from 'react-native-swipe-item';
import Sample from '../../assets/images/product.png';
import ViewOverflow from 'react-native-view-overflow';

import {
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
// import transactionActions from '../../redux/actions/transaction';

function History() {
  const leftButton = (
    <SwipeButtonsContainer style={{paddingTop: 30, paddingRight: 40}}>
      <TouchableOpacity
        // onPress={() => console.log('left button clicked')}
        style={styles.trash}>
        <IconComunity
          name={'trash-can-outline'}
          style={styles.iconTrash}
          size={30}
        />
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const history = useSelector(state => state.transaction.history);
  const token = useSelector(state => state.auth.userData.token);

  const costing = price => {
    return (
      'IDR ' +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  };

  //   useEffect(() => {
  //     dispatch(transactionActions.getHistoryThunk(token));
  //   }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={{padding: 30}}>
        <IconComunity
          name={'chevron-left'}
          size={20}
          style={styles.icons}
          onPress={() => {
            navigation.goBack();
          }}
          onLongPress={() => {
            navigation.navigate('HomePage');
          }}
        />
        <Text style={styles.title}>Order History</Text>
        <View style={styles.swipe}>
          {/* <IconComunity name={"gesture-swipe"} size={20} />
                    <Text style={styles.swipeText}>swipe on an item to delete</Text> */}
        </View>
      </View>
      <SwipeItem containerView={ViewOverflow} rightButtons={leftButton}>
        <ScrollView style={{paddingLeft: 25, paddingRight: 25}} key={e.id}>
          <View
            style={{
              backgroundColor: 'white',
              width: width / 1.15,
              borderRadius: 20,
              flexDirection: 'row',
              padding: 15,
            }}>
            <View></View>
            <View style={{paddingLeft: 10}}>
              <Text style={styles.cardTitle}>e.product_name</Text>
              <Text style={styles.cardPrice}>Rp 20.000</Text>
              <Text style={styles.cardStatus}>Paid</Text>
            </View>
          </View>
        </ScrollView>

        {/* {history?.map(e => {
          return (
            <ScrollView style={{paddingLeft: 25, paddingRight: 25}} key={e.id}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: width / 1.15,
                  borderRadius: 20,
                  flexDirection: 'row',
                  padding: 15,
                }}>
                <View>
                  <Image source={{uri: e.image}} style={styles.imageCard} />
                </View>
                <View style={{paddingLeft: 10}}>
                  <Text style={styles.cardTitle}>{e.product_name}</Text>
                  <Text style={styles.cardPrice}>{costing(e.price)}</Text>
                  <Text style={styles.cardStatus}>{e.status_name}</Text>
                </View>
              </View>
            </ScrollView>
          );
        })} */}
      </SwipeItem>
    </View>
  );
}

export default History;
