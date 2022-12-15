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
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Navbar from '../../components/Navbar';
import Card from '../../components/CardProduct';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';
// import IconIon from 'react-native-vector-icons/Ionicons';

// Styles
import styles from '../../styles/HomePage';

// Images
import Sample from '../../assets/images/product.png';

const Home = () => {
  const navigation = useNavigation();
  const {height} = useWindowDimensions();
  return (
    <View style={styles.sectionContainer}>
      <Navbar>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>A good coffee is a good day</Text>
          <View style={styles.wrapperSearch}>
            {/* <FontAwesome icon={SolidIcons.search} style={styles.iconSearch} /> */}
            {/* <IconIon name={'search-outline'} style={styles.Icons} /> */}
            <TextInput
              style={styles.textPlaceholder}
              placeholder="Search"
              placeholderTextColor="grey"
              // onChangeText={handlersearch}
            />
          </View>
          <Text
            style={styles.category}
            onPress={() => {
              navigation.navigate('ProductsDetails');
            }}>
            Favorite Products
          </Text>
          <Text
            style={styles.see}
            onPress={() => {
              navigation.navigate('AllProduct');
            }}>
            See more
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            keyboardShouldPersistTaps={'always'}
            style={{height: height / 2}}>
            <Card
              name={'Juz Alvokat'}
              price={10000}
              img={Sample}
              // name={e.product_name}
              // price={e.price}
              // img={e.image}
              // id={e.id}
              // key={e.id}
            />
            <Card
              name={'Juz Alvokat'}
              price={10000}
              img={Sample}
              // name={e.product_name}
              // price={e.price}
              // img={e.image}
              // id={e.id}
              // key={e.id}
            />
            <Card
              name={'Juz Alvokat'}
              price={10000}
              img={Sample}
              // name={e.product_name}
              // price={e.price}
              // img={e.image}
              // id={e.id}
              // key={e.id}
            />
          </ScrollView>

          <Text style={styles.category}>Promo for you</Text>
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
          </ScrollView>
        </ScrollView>
      </Navbar>
    </View>
  );
};

export default Home;
