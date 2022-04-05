import React, {useEffect} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import InformationScreen from './informationScreen';
import PaiedsScreen from './paieds';
import RefundScreen from './refund';
import CourseJoined from './courseJoined';
import CourseDetails from './courseDetails';
import AttendanceScreen from './courseDetails/attendance';
import ExcerciseScreen from './courseDetails/excercise';
import ExamScreen from './courseDetails/exam';
import ResultTestScreen from './resultTest';
import MoreDetails from './more';
import ChangeCoursesScreen from './more/changeCourses';
import RegistrationScreen from './more/registrationAppointments';
import ReservesScreen from './more/reserves';

const Stack = createStackNavigator<InformationStackParamList>();

const InformationNavigator = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Stack.Navigator initialRouteName="MAIN" screenOptions={{headerShown: false}}>
      <Stack.Screen name="MAIN" component={InformationScreen} />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="PAIEDS"
        component={PaiedsScreen}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="REFUND"
        component={RefundScreen}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="COURSE"
        component={CourseJoined}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="COURSEDETAILS"
        component={CourseDetails}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="ATTENDANCE"
        component={AttendanceScreen}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="EXCERCISE"
        component={ExcerciseScreen}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="EXAM"
        component={ExamScreen}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="RESULTTEST"
        component={ResultTestScreen}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="MORE"
        component={MoreDetails}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="CHANGECOURSES"
        component={ChangeCoursesScreen}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="REGISTRATION"
        component={RegistrationScreen}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name="RESERVES"
        component={ReservesScreen}
      />
    </Stack.Navigator>
  );
};

export default InformationNavigator;
