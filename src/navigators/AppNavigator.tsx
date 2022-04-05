import React, {useEffect, useLayoutEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {initOneSignal, logOut} from '~/utils';
import {localUser, setInformations, setLogin} from '~/store/reducers/userSlice';
import SplashScreen from 'react-native-splash-screen';
import AuthNavigator from '~/navigators/AuthNavigator';
import RootTabNavigator from '~/navigators/RootTabNavigator';
import LoadingScreen from '~/views/loading';
import TokenScreen from '~/views/tokenScreen';
import {parentsApi} from '~/api/parents';
import {setNewsFeed} from '~/store/reducers/newsSlice';
import {timeOutToken} from '~/utils/function';
import {storeApi} from '~/api/store';
import {setIsStore} from '~/store/reducers/isStore';

let todoNewsFeed = {search: '', start: 1, lenght: 20};

const RootStack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const userData = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isNew, setNew] = useState(false);

  useLayoutEffect(() => {
    SplashScreen.hide();
    getStoreStatus();
    loadData();
  }, []);

  useEffect(() => {
    if (userData.deviceID !== '' && isNew == true) {
      setLoading(false);
    }
  }, [userData.deviceID, isNew]);

  const loadData = async () => {
    await settingNotification();
    await getLocalData();
  };

  const getLocalData = async () => {
    const userInformation = await localUser.getUserInformation();
    const token = await localUser.getToken();
    dispatch(setInformations(userInformation));
    dispatch(setLogin(token == null ? false : true));
    if (token !== null) {
      await getNewsFeed();
    } else {
      setNew(true);
    }
  };

  const settingNotification = async () => {
    await initOneSignal(dispatch);
  };

  const getNewsFeed = async () => {
    try {
      const response = await parentsApi.getNewsFeed(todoNewsFeed);
      response.status == 200 && setNews(response.data.data);
    } catch (error) {
      timeOutToken({
        error: error,
        onPress: () => {
          logOut(dispatch);
          setLoading(false);
        },
      });
    }
  };

  const setNews = (data: object) => {
    dispatch(setNewsFeed(data));
    setNew(true);
  };

  const getStoreStatus = async () => {
    try {
      const response = await storeApi.getIsStore();
      !!response.data.isstore && dispatch(setIsStore(response.data.isstore));
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <NavigationContainer>
      {!loading ? (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          {!userData.logged ? (
            <RootStack.Screen name="Auth" component={AuthNavigator} />
          ) : (
            <>
              {userData?.informations?.RoleID === 1 || userData?.informations?.RoleID === 9 ? (
                <RootStack.Screen name="RootTabNavigator" component={TokenScreen} />
              ) : (
                <RootStack.Screen name="RootTabNavigator" component={RootTabNavigator} />
              )}
            </>
          )}
        </RootStack.Navigator>
      ) : (
        <LoadingScreen />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
