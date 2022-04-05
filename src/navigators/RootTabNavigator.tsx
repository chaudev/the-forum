import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from '~/navigators/TabNavigator';
import appRouter from '~/navigators/appRouter';

const Stack = createNativeStackNavigator();

const RootTabNavigator = (): any => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={appRouter.ROOTTAB} component={TabNavigator} />
    </Stack.Navigator>
  );
};
export default RootTabNavigator;
