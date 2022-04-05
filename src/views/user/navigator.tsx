import React, {useEffect} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {UserScreen} from './';
import UpdateInformationScreen from './updateInformation';
import UpdatePasswordScreen from './updatePassword';
import TermScreen from './term';
import FAQScreen from './FAQ';

const Stack = createStackNavigator<UserStackParamList>();

const UserNavigator = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Stack.Navigator initialRouteName="MAIN" screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="MAIN"
        component={UserScreen}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="UPDATE"
        component={UpdateInformationScreen}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="UPDATEPASSWORD"
        component={UpdatePasswordScreen}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="TERM"
        component={TermScreen}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="FAQ"
        component={FAQScreen}
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;
