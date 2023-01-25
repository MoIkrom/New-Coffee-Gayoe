import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Welcome from './src/screens/auth/WelcomePage';
import Splash from './src/screens/splash/Splash';
import Home from './src/screens/auth/Home';
import Signup from './src/screens/auth/Signup';
import Login from './src/screens/auth/Login';
import Forgot from './src/screens/auth/Forgot';
import Reset from './src/screens/auth/Reset';
import ResetPwd from './src/screens/auth/EditPassword';
import HomePage from './src/screens/homePage/Index';
import Drawer from './src/screens/drawer/Index';
import ProductDetail from './src/screens/products/ProductsDetail';
import EditProduct from './src/screens/products/EditProduct';
import Profile from './src/screens/profile/Index';
import Editprofile from './src/screens/profile/Editprofile';
import AllProduct from './src/screens/products/AllProduct';
import AddProduct from './src/screens/products/AddProduct';
import Cart from './src/screens/transactions/Cart';
import Checkout from './src/screens/transactions/Checkout';
import Payment from './src/screens/transactions/Payment';
import History from './src/screens/transactions/History';

function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Welcome'}>
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
          name="EditProduct"
          component={EditProduct}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
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
          name="ResetPwd"
          component={ResetPwd}
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
}
export default App;
