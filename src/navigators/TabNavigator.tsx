import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {appConfig} from '~/appConfig';
import appRouter from './appRouter';
import {Tabs} from '~/components';
import SplashScreen from 'react-native-splash-screen';
import UserNavigator from '~/views/user/navigator';
import {useSelector} from 'react-redux';
import HomeNavigator from '~/views/home/navigator';
import CourseNavigator from '~/views/course/navigator';
import InformationNavigator from '~/views/information/navigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const tabs: number = 4;

const TabNavigator = () => {
  // @ts-ignore
  const tabState = useSelector(state => state.bottomTab.isShow);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => <Tabs color={color} route={route.name} tabs={tabs} />,
        tabBarActiveTintColor: appConfig.colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: tabState === true ? 50 + insets.bottom : 0,
          opacity: tabState === true ? 1 : 0,
          backgroundColor: '#fff',
        },
      })}>
      <Tab.Screen name={appRouter.TABS.HOME} component={HomeNavigator} />
      <Tab.Screen name={appRouter.TABS.COURSE} component={CourseNavigator} />
      <Tab.Screen name={appRouter.TABS.INFORMATION} component={InformationNavigator} />
      <Tab.Screen name={appRouter.TABS.USER} component={UserNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
