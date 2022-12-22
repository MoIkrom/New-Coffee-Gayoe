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
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Card from '../../components/CardProduct';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import backs from '../../assets/images/backblack.png';
// import {useDispatch, useSelector} from 'react-redux';
// import productAction from '../../redux/actions/product';
import {debounce} from '../../utils/debounce';

function See_more({route}) {
  //   const dispatch = useDispatch();
  const navigation = useNavigation();
  //   const product = useSelector(state => state.product.data);
  //   console.log(product);
  const [product, setProduct] = useState([]);
  const {category, sort} = route.params;
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const valueSearch = e => {
    setSearch(e);
  };
  const debounceOnChange = debounce(valueSearch, 1000);
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
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://coffee-gayoe.vercel.app/api/v1/product?category=${category}&sort=${sort}`,
      )
      .then(res => {
        setProduct(res.data.data);
        setLoading(false);
        // console.log(res.data.data);
        // setProduct(res.data.result.data), console.log('data ke get');
      })
      .catch(err => {
        // setNotfound(err.response.data.msg)
        console.log(err.response.data.msg);
      });
  }, [category]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.navbar}>
        <Image
          source={backs}
          size={20}
          style={styles.icons}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.titleNavbar}>{category}</Text>
        {/* <Text style={styles.titleNavbar}>Favorite Products</Text> */}
        {/* <View style={styles.wrapperSearch}> */}
        {/* <FontAwesome icon={SolidIcons.search} style={styles.iconSearch} /> */}
        {/* <Image source={search} style={styles.Icons1} /> */}
        {/* <TextInput
            style={styles.textPlaceholder}
            placeholder="🔍 Search"
            placeholderTextColor="grey"
            // onChangeText={valueSearch}
            onChangeText={debounceOnChange}
            value={search}
          /> */}
        {/* </View> */}
      </View>
      <ScrollView style={styles.scrolles}>
        <View>
          <Text style={styles.category}>{category}</Text>
          <View style={styles.containerCard}>
            {loading ? (
              <ActivityIndicator
                style={{
                  paddingHorizontal: 130,
                  paddingTop: 220,
                }}
                size="large"
                color="#0000ff"
              />
            ) : (
              product.map((e, idx) => (
                <Card
                  name={e.product_name}
                  price={e.price}
                  img={e.image}
                  id={e.id}
                  key={idx}
                />
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
