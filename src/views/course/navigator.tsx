import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CourseScreen from '.';
import CourseDetailScreen from './detailScreen';
import ScheduleScreen from './schedule';

const Stack = createStackNavigator<CourseStackParamList>();

const CourseNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MAIN" screenOptions={{headerShown: false}}>
      <Stack.Screen name="MAIN" component={CourseScreen} />
      <Stack.Screen name="DETAILS" component={CourseDetailScreen} />
      <Stack.Screen name="SCHEDULE" component={ScheduleScreen} />
    </Stack.Navigator>
  );
};

export default CourseNavigator;
