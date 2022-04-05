import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './homeScreen';
import DetailScreen from './detailScreen';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Stack.Navigator initialRouteName="MAIN" screenOptions={{headerShown: false}}>
      <Stack.Screen name="MAIN" component={HomeScreen} />
      <Stack.Screen name="DETAILS" component={DetailScreen} initialParams={{}} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
