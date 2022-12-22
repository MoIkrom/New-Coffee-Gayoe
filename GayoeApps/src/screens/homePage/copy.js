import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {ScrollView} from 'react-native-gesture-handler';
import styles from '../style/Home';
import search_icon from '../assets/header/search.png';
import CardProduct from '../components/CardProduct';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import authAction from '../redux/actions/auth';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [navFav, setNavFav] = useState(false);
  const [navCoff, setNavCoff] = useState(true);
  const [navNonCoff, setNavNonCoff] = useState(true);
  const [navFood, setFood] = useState(true);
  const [navadd, setNavadd] = useState(true);
  const [category, setCategory] = useState('favorite');
  const [sort, setSort] = useState('favorite');
  const [product, setProduct] = useState([]);
  const [notfound, setNotfound] = useState('');

  const valueSearch = e => {
    setSearch(e), console.log(e);
  };

  // link active
  const navActive1 = () => {
    setNavFav(false),
      setNavCoff(true),
      setNavNonCoff(true),
      setNavadd(true),
      setFood(true),
      setCategory('favorite'),
      setSort('favorite');
  };
  const navActive2 = () => {
    setNavCoff(false),
      setNavFav(true),
      setNavNonCoff(true),
      setNavadd(true),
      setFood(true),
      setCategory('coffee'),
      setSort();
    setSearch(search);
  };
  const navActive3 = () => {
    setNavNonCoff(false),
      setNavFav(true),
      setNavCoff(true),
      setNavadd(true),
      setFood(true),
      setCategory('non_coffee'),
      setSort();
    setSearch(search);
  };
  const navActive4 = () => {
    setNavadd(false),
      setNavFav(true),
      setNavCoff(true),
      setNavNonCoff(true),
      setFood(true),
      setCategory('addon');
    setSort();
    setSearch(search);
  };
  const navActive5 = () => {
    setFood(false),
      setNavadd(true),
      setNavFav(true),
      setNavCoff(true),
      setNavNonCoff(true),
      setCategory('foods'),
      setSort();
    setSearch(search);
  };

  useEffect(() => {
    axios
      .get(
        `https://coffeeadictbe.vercel.app/coffee/product?category=${category}&sorting=${sort}&page=1&limit=10&name_product=${search}`,
      )
      .then(res => {
        setProduct(res.data.result.data), setNotfound(search);
        console.log('data ke get');
      })
      .catch(err => {
        setNotfound(err.response.data.msg);
        // console.log(err.response.data.msg)
      });
  }, [category, search]);

  const resetReduxTransactions = () => {
    dispatch(
      authAction.productThunk({
        id_product: null,
        price: 0,
        name_product: null,
        status: null,
        delivery: null,
        total: 0,
        image: null,
        qty: 0,
        payment_method: null,
        size: null,
        id_promo: null,
      }),
    );
  };

  useEffect(() => {
    resetReduxTransactions();
  }, []);

  return (
    <ScrollView>
      <View style={styles.home_background}>
        {/* Header */}
        <Header />
        {/* Content Home */}
        <View style={styles.content_home}>
          {/* title */}
          <View>
            <Text style={styles.title_home}>A good coffee is a good day</Text>
          </View>

          {/* Search bar */}
          <View>
            <View style={styles.box_search}>
              <Image source={search_icon}></Image>
              <TextInput
                style={styles.input_search}
                placeholder="Search"
                onChangeText={valueSearch}
                placeholderTextColor="#9F9F9F"
              />
            </View>
          </View>
          {/* Navigasi Product */}
          <View>
            <View style={styles.navgiation_bar_product}>
              <Text
                style={navFav ? styles.nav_product : styles.nav_product_black}
                onPress={navActive1}>
                Favorite
              </Text>
              <Text
                style={navCoff ? styles.nav_product : styles.nav_product_black}
                onPress={navActive2}>
                Coffee
              </Text>
              <Text
                style={
                  navNonCoff ? styles.nav_product : styles.nav_product_black
                }
                onPress={navActive3}>
                Non Coffee
              </Text>
              <Text
                style={navFood ? styles.nav_product : styles.nav_product_black}
                onPress={navActive5}>
                Foods
              </Text>
              <Text
                style={navadd ? styles.nav_product : styles.nav_product_black}
                onPress={navActive4}>
                Add-ons
              </Text>
            </View>
          </View>

          {/* Category Coffee */}
          <View>
            <View style={styles.category_Coffee}>
              <Text style={styles.title_coffee}>
                {category === 'coffee'
                  ? 'Coffee'
                  : category === ''
                  ? 'favorite'
                  : category === 'non coffee'
                  ? 'Non Coffee'
                  : category === 'food'
                  ? 'Foods'
                  : category === 'add on'
                  ? 'Add-on'
                  : 'All'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('See_All', {
                    category: category,
                    sort: sort,
                  });
                }}>
                <Text style={styles.title_coffee_all}>See All</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card Product */}
          <ScrollView horizontal={true}>
            <View style={styles.content_card_product}>
              <View style={styles.list_product}>
                {/* product.length < 0 || notfound !== "Product Not Found" ? (<Text>Not Found Product</Text>) : */}
                {notfound === 'Product Not Found' ? (
                  <Text>Not Found Product</Text>
                ) : (
                  product.map(e => (
                    <CardProduct
                      key={e.id}
                      id={e.id}
                      name={e.name}
                      image_product={e.image}
                      price={e.price}
                      size={e.size}
                    />
                  ))
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
