import {
  Image,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
  LinearLayout,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Navbar from '../../components/Navbar';
import Card from '../../components/CardProduct';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import authAction from '../../redux/actions/auth';
import {debounce} from '../../utils/debounce';

// Styles
import styles from '../../styles/HomePage';

// Images
import Sample from '../../assets/images/product.png';
import search from '../../assets/images/Search.png';

const Home = () => {
  const navigation = useNavigation();
  const {height} = useWindowDimensions();

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [navFav, setNavFav] = useState(false);
  const [navPromo, setNavPromo] = useState(true);
  const [navFood, setFood] = useState(true);
  const [navCoff, setNavCoff] = useState(true);
  const [navNonCoff, setNavNonCoff] = useState(true);
  const [navadd, setNavadd] = useState(true);
  const [category, setCategory] = useState('favorite');
  const [sort, setSort] = useState('favorite');
  const [product, setProduct] = useState([]);
  const [notfound, setNotfound] = useState('');
  const [loading, setLoading] = useState(true);

  const valueSearch = e => {
    setSearch(e);
  };
  const debounceOnChange = debounce(valueSearch, 1000);
  // link active
  const navActive1 = () => {
    setNavFav(false),
      setNavPromo(true),
      setFood(true),
      setNavCoff(true),
      setNavNonCoff(true),
      setNavadd(true),
      setCategory(),
      setSort('name');
  };
  const navActive2 = () => {
    setNavFav(true),
      setNavPromo(false),
      setFood(true),
      setNavCoff(true),
      setNavNonCoff(true),
      setNavadd(true),
      setCategory(),
      setSort('name');
  };
  const navActive3 = () => {
    setNavFav(true),
      setNavPromo(true),
      setFood(false),
      setNavCoff(true),
      setNavNonCoff(true),
      setNavadd(true),
      setCategory('Food'),
      setSort();
    setSearch(search);
  };
  const navActive4 = () => {
    setNavFav(true),
      setNavPromo(true),
      setFood(true),
      setNavCoff(false),
      setNavNonCoff(true),
      setNavadd(true),
      setCategory('Coffee'),
      setSort();
    setSearch(search);
  };
  const navActive5 = () => {
    setNavFav(true),
      setNavPromo(true),
      setFood(true),
      setNavCoff(true),
      setNavNonCoff(false),
      setNavadd(true),
      setCategory('Non Coffee');
    setSort();
    setSearch(search);
  };
  const navActive6 = () => {
    setNavFav(true),
      setNavPromo(true),
      setFood(true),
      setNavCoff(true),
      setNavNonCoff(true),
      setNavadd(false),
      setCategory('Add On'),
      setSort();
    setSearch(search);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://coffee-gayoe.vercel.app/api/v1/product?category=${category}&sort=${sort}&page=1&limit=4&search=${search}`,
      )
      .then(res => {
        setProduct(res.data.data);
        // setProduct(res.data.data),
        setNotfound(search);
        setLoading(false);
        console.log(res.data.data);
        // console.log('data ke get lho....');
      })
      .catch(err => {
        setNotfound(err.response.data.msg);
        console.log(err.response.data.msg);
        setLoading(false);
      });
  }, [category, search]);

  const resetReduxTransactions = () => {
    dispatch(
      authAction.productThunk({
        id: null,
        product_name: null,
        price: 0,
        stock: 0,
        size: null,
        category: null,
        image: null,
        description: null,
        status: null,
        delivery: null,
        total: 0,
        qty: null,
        id_promo: null,
      }),
    );
  };

  useEffect(() => {
    resetReduxTransactions();
  }, []);

  return (
    <View style={styles.sectionContainer}>
      <Navbar>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>A good coffee is a good day</Text>
            <View style={styles.wrapperSearch}>
              {/* <FontAwesome icon={SolidIcons.search} style={styles.iconSearch} /> */}
              <Image source={search} style={styles.Icons} />
              <TextInput
                style={styles.textPlaceholder}
                placeholder="🔍 Search"
                placeholderTextColor="grey"
                // onChangeText={valueSearch}
                onChangeText={debounceOnChange}
                value={search}
              />
            </View>
            <View style={styles.categorys}>
              <TouchableOpacity>
                <Text
                  style={navFav ? styles.categorys : styles.nav_product_black}
                  onPress={navActive1}>
                  Favorite
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={navPromo ? styles.categorys : styles.nav_product_black}
                  onPress={navActive2}>
                  Promo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={navFood ? styles.categorys : styles.nav_product_black}
                  onPress={navActive3}>
                  Food
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={navCoff ? styles.categorys : styles.nav_product_black}
                  onPress={navActive4}>
                  Coffee
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={
                    navNonCoff ? styles.categorys : styles.nav_product_black
                  }
                  onPress={navActive5}>
                  Non-Coffee
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={navadd ? styles.categorys : styles.nav_product_black}
                  onPress={navActive6}>
                  Add-On
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={styles.container}>
            <Text
              style={styles.category}
              // onPress={() => {
              //   navigation.navigate('ProductsDetails');
              // }}
            >
              {/* Coffee */}
              {category === 'Coffee'
                ? 'Coffee'
                : category === 'favorite'
                ? 'Favorite'
                : category === 'Non Coffee'
                ? 'Non Coffee'
                : category === 'Food'
                ? 'Foods'
                : category === 'Add On'
                ? 'Add on'
                : 'All'}
            </Text>
            <Text
              style={styles.see}
              onPress={() => {
                navigation.navigate('AllProduct', {
                  category: category,
                  sort: sort,
                });
              }}>
              See more
            </Text>
            <ScrollView
              // showsHorizontalScrollIndicator={false}
              horizontal={true}
              keyboardShouldPersistTaps={'always'}
              // style={{height: height / 2}}
            >
              {notfound === 'Internal server Error' ? (
                <Text
                  style={{
                    paddingHorizontal: 100,
                    paddingTop: 100,
                    fontSize: 25,
                  }}>
                  Product Not Found{' '}
                </Text>
              ) : loading ? (
                <ActivityIndicator
                  style={{
                    paddingHorizontal: 160,
                    paddingTop: 150,
                  }}
                  size="large"
                  color="#0000ff"
                />
              ) : (
                product.map((e, idx) => (
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
                ))
              )}
            </ScrollView>

            {/* <Text style={styles.category}>Food</Text>
          <Text
            style={styles.see}
            onPress={() => {
              navigation.navigate('ScreenPromo');
            }}>
            See more
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{height: height / 2}}>
            <Pressable style={styles.card}>
              <View style={styles.containerImage}>
                <Image source={Sample} style={styles.imageCard} />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.cardTitle}>Hazelnut Latte</Text>
                <Text style={styles.cardPrice}>IDR 25.000</Text>
              </View>
            </Pressable>
            <Pressable style={styles.card}>
              <View style={styles.containerImage}>
                <Image source={Sample} style={styles.imageCard} />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.cardTitle}>Hazelnut Latte</Text>
                <Text style={styles.cardPrice}>IDR 25.000</Text>
              </View>
            </Pressable>
            <Pressable style={styles.card}>
              <View style={styles.containerImage}>
                <Image source={Sample} style={styles.imageCard} />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.cardTitle}>Hazelnut Latte</Text>
                <Text style={styles.cardPrice}>IDR 25.000</Text>
              </View>
            </Pressable>
            <Pressable style={styles.card}>
              <View style={styles.containerImage}>
                <Image source={Sample} style={styles.imageCard} />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.cardTitle}>Hazelnut Latte</Text>
                <Text style={styles.cardPrice}>IDR 25.000</Text>
              </View>
            </Pressable>
            <Pressable style={styles.card}>
              <View style={styles.containerImage}>
                <Image source={Sample} style={styles.imageCard} />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.cardTitle}>Hazelnut Latte</Text>
                <Text style={styles.cardPrice}>IDR 25.000</Text>
              </View>
            </Pressable>
          </ScrollView> */}
          </ScrollView>
        </ScrollView>
      </Navbar>
    </View>
  );
};

export default Home;
