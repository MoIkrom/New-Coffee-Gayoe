import React, {useState, useEffect} from 'react';
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
  ActivityIndicator,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import back from '../../assets/images/backblack.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import transactionActions from '../../redux/actions/transaction';
import CardHistory from '../../components/CardHistory';
import {
  getHistoryAll,
  // deleteHistoryId,
  // getHistoryAdmin,
  // changePaymentStatus,
} from '../../utils/api';
import swipe from '../../assets/images/swipe.png';
import backs from '../../assets/images/backblack.png';
import trash from '../../assets/images/trash.png';

function History() {
  const [history, setHistory] = useState([]);
  const [historyAdmin, setHistoryAdmin] = useState([]);
  const [paymentId, setPaymentId] = useState();
  const [notfound, setNotfound] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [historyId, setHistoryId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deps, setDeps] = useState(0);

  const product = useSelector(state => state.auth.product);
  const profile = useSelector(state => state.auth.profile);
  const getDataHistory = async () => {
    try {
      setLoading(true);
      const getToken = await AsyncStorage.getItem('token');
      const response = await getHistoryAll(getToken);
      // console.log(response.data.result.data);
      setHistory(response.data.result.data);
      // setDeps(response.data.result.data.length)
      navigation.goBack('Home');
      console.log('ini response' + response);
      setLoading(false);
    } catch (error) {
      // console.log(error.response.data.msg)
      setNotfound(error.response.data.msg);
      setLoading(false);
    }
  };

  const leftButton = (
    <SwipeButtonsContainer style={{paddingTop: 30, paddingRight: 40}}>
      <TouchableOpacity
        // onPress={() => console.log('left button clicked')}
        style={styles.trash}>
        <Image source={trash} style={styles.iconTrash} size={30} />
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  // const history = useSelector(state => state.transaction.history);
  // const token = useSelector(state => state.auth.userData.token);

  const costing = price => {
    return (
      'IDR ' +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  };

  useEffect(() => {
    getDataHistory();
  }, []);
  //   useEffect(() => {
  //     dispatch(transactionActions.getHistoryThunk(token));
  //   }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={{padding: 30}}>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate('HomePage');
            }}>
            <Image source={back} size={20} style={styles.icons} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                paddingLeft: 22,
                position: 'relative',
                top: -16,
              }}>
              Back to Home
            </Text>
          </Pressable>
        </View>
        <Text style={styles.title}>Order History</Text>
        <View style={styles.swipe}>
          <Image source={swipe} />
          <Text style={styles.swipeText}>swipe on an item to delete</Text>
        </View>
      </View>
      {/* <SwipeItem containerView={ViewOverflow} rightButtons={leftButton}> */}

      {loading ? (
        <ActivityIndicator
          style={{
            paddingHorizontal: 160,
            paddingTop: 150,
          }}
          size="large"
          color="#0000ff"
        />
      ) : (
        // ) : history.length > 0 ? (
        <ScrollView style={{paddingLeft: 25, paddingRight: 25}}>
          <View style={{paddingLeft: 10}}>
            {history.map(e => (
              <CardHistory
                key={e.id}
                name_product={e.product_name}
                price={e.total}
                image={{uri: e.image}}
                status={e.status}
              />
            ))}
          </View>
        </ScrollView>
        // ) : (
        //   'History Not Available'
        // )}
      )}

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
      {/* </SwipeItem> */}
    </View>
  );
}

export default History;
