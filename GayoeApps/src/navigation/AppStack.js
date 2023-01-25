import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Welcome from '../screens/auth/WelcomePage';
import Splash from '../screens/splash/Splash';
import Home from '../screens/auth/Home';
import Signup from '../screens/auth/Signup';
import Login from '../screens/auth/Login';
import Forgot from '../screens/auth/Forgot';
import Reset from '../screens/auth/Reset';
import HomePage from '../screens/homePage/Index';
import Drawer from '../screens/drawer/Index';
import ProductDetail from '../screens/products/ProductsDetail';
import Profile from '../screens/profile/Index';
import Editprofile from '../screens/profile/Editprofile';
import AllProduct from '../screens/products/AllProduct';
import Cart from '../screens/transactions/Cart';
import Checkout from '../screens/transactions/Checkout';
import Payment from '../screens/transactions/Payment';
import History from '../screens/transactions/History';
import {useNavigation} from '@react-navigation/core';

import {useSelector} from 'react-redux';

const Stack = createStackNavigator();
const AppStack = () => {
  const navigation = useNavigation();
  const profile = useSelector(state => state.auth.profile);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Welcome'}>
        {/* <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forgot"
          component={Forgot}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Reset"
          component={Reset}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Drawer"
          component={Drawer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Editprofile"
          component={Editprofile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AllProduct"
          component={AllProduct}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppStack;
