import React, {useState, useEffect} from 'react';

import styles from '../../styles/AllProduct';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
// import Sample from '../image/food4.png';

import {
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
// import DropDown, {Select, Option, OptionList} from 'react-native-selectme';
import Card from '../../components/CardProductAll';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import backs from '../../assets/images/backblack.png';
// import {useDispatch, useSelector} from 'react-redux';
// import productAction from '../../redux/actions/product';
import {debounce} from '../../utils/debounce';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {onBackPress} from '../../utils/backpress';

function See_more({route}) {
  //   const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState([]);
  // const {category, sort} = route.params;
  const {category} = route.params;
  const [loading, setLoading] = useState(true);
  const [notfound, setNotfound] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const deleteChange = text => setSearch('');
  const updateChange = text => setSearch(text);
  const debounceOnChange = debounce(updateChange, 2000);
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

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    onBackPress(handleBackPress);
    setLoading(true);
    axios
      .get(
        `https://coffee-gayoe.vercel.app/api/v1/product?category=${category}&sort=${sort}&search=${search}`,
      )
      .then(res => {
        setProduct(res.data.data);
        setLoading(false);
        console.log(search);
        // setProduct(res.data.result.data), console.log('data ke get');
      })
      .catch(err => {
        // setNotfound(err.response.data.msg)
        console.log(err);
      });
  }, [category, search, sort]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{display: 'flex', flexDirection: 'row'}}>
          <Image source={backs} size={20} style={styles.icons} />
          <Text style={styles.titleNavbar}>Back</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.category}>{category} Category </Text>
      <View style={styles.divup}>
        <View style={styles.wrapperSearch}>
          <Image source={search} style={styles.icons} />
          <TextInput
            style={styles.textPlaceholder}
            placeholder=" Search Product Here "
            placeholderTextColor="grey"
            onChangeText={debounceOnChange}
          />

          {/* <TouchableOpacity
            onPress={() => {
              setSearch('');
              // input.clear();
            }}>
            <Text style={styles.delete}>X</Text>
          </TouchableOpacity>` */}
        </View>
        <View style={styles.cardfilter}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.text}>Sort</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <Pressable
              style={[styles.buttonss, styles.buttonClosed]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyles}>X</Text>
            </Pressable>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Sorting By :</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                {/* <Pressable style={[styles.button, styles.buttonClose]}> */}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setSort('name');
                  }}>
                  <Text style={styles.textStyle}>Name</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setSort('expensive');
                  }}>
                  <Text style={styles.textStyle}>Pricy</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setSort('cheapest');
                  }}>
                  <Text style={styles.textStyle}>Cheapest</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setSort('newest');
                  }}>
                  <Text style={styles.textStyle}>New Product </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <ScrollView style={styles.scrolles}>
        <View>
          <View style={styles.containerCard}>
            {/* {loading ? (
              <ActivityIndicator
                style={{
                  paddingHorizontal: 190,
                  paddingTop: 220,
                }}
                size="large"
                color="#0000ff"
              />
            ) : (
              product.map((e, idx) => (
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 38,
                  }}>
                  <Card
                    name={e.product_name}
                    price={e.price}
                    img={e.image}
                    id={e.id}
                    key={idx}
                  />
                </View>
              ))
            )} */}
            {notfound === 'Internal server Error' ? (
              <Text
                style={{
                  paddingHorizontal: 100,
                  paddingTop: 100,
                  fontSize: 25,
                }}>
                Product Not Found
              </Text>
            ) : loading ? (
              <ActivityIndicator
                style={{
                  paddingHorizontal: 190,
                  paddingTop: 220,
                }}
                size="large"
                color="#0000ff"
              />
            ) : (
              product.map((e, idx) => (
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 38,
                  }}>
                  <Card
                    // name={'Juz Alvokat'}
                    // price={10000}
                    // img={Sample}
                    name={e.product_name}
                    price={e.price}
                    img={e.image}
                    id={e.id}
                    key={idx}
                  />
                </View>
              ))
            )}

            {/* <Pressable
              style={styles.card}
              onPress={() => {
                navigation.navigate('ProductDetail', data.id);
              }}>
              <View>
                <Text style={styles.titleFood}>data.product_name</Text>
                <Text style={styles.priceFood}>Rp 10.000</Text>
              </View>
            </Pressable> */}

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

export default See_more;
