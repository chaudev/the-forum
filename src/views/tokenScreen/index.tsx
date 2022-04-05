import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  Image,
  Linking,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import {logOut, wait, getTime, getStrDate} from '~/utils';
import SplashScreen from 'react-native-splash-screen';
import {HomeHeader, HTMLView} from '~/components';
import {icons} from '~/lib';
import {userApi} from '~/api';
import {setNotification} from '~/store/reducers/userSlice';
import {timeOutToken} from '~/utils/function';
import OneSignal from 'react-native-onesignal';
import SimpleToast from 'react-native-simple-toast';
import {useIsFocused} from '@react-navigation/native';

const TokenScreen = () => {
  // @ts-ignore
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const focused = useIsFocused();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNoti();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    SplashScreen.hide();
    getNoti();
  }, []);

  useEffect(() => {
    if (focused) {
      // getDevice();
    }
  }, [focused]);

  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    let notification = notificationReceivedEvent.getNotification();
    console.log('notification xxx: ', notification);
    const data = notification.additionalData;
    console.log('additionalData: ', data);
    onRefresh();
  });

  const getNoti = async () => {
    let todo = {start: 1, lenght: 20};
    try {
      const response = await userApi.getNotification(todo);
      response.status == 200 && setNoti(response.data.data);
    } catch (error) {
      console.error(error);
      timeOutToken({error: error, onPress: () => logOut(dispatch)});
    }
  };

  const setNoti = (data: any) => {
    dispatch(setNotification(data));
    SimpleToast.show('Dữ liệu đã được làm mới', SimpleToast.SHORT);
  };

  const postPlayer = async (param: any) => {
    try {
      await userApi.saveIncludeplayer(param);
    } catch (error) {
      console.error(error);
      // @ts-ignore
      if (error.message == 'Phiên đăng nhập đã hết hiệu lực') {
        logOut(dispatch);
      }
    }
  };

  const getDevice = async () => {
    const deviceState = await OneSignal.getDeviceState();
    postPlayer({AccountID: userData.informations.ID, IncludePlayerID: deviceState.userId});
  };

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="dark-content" />
      <HomeHeader isAdmin={true} isHome={true} />
      <View style={{flex: 1, width: '100%'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={userData?.notification}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View
              style={{
                height: 300,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={icons.empty}
                style={{width: appConfig.sizes.dW / 2, height: appConfig.sizes.dW / 2}}
              />
              <Text style={{fontFamily: appConfig.fonts.Regular, fontSize: 16, color: '#b1b1b6'}}>
                Không có dữ liệu
              </Text>
            </View>
          }
          renderItem={({item}) => (
            <View
              style={{
                width: '100%',
                borderBottomWidth: 1,
                borderColor: 'rgba(84, 84, 88, 0.2)',
                padding: 16,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                <Image resizeMode="contain" source={icons.clock} style={{width: 12, height: 12}} />
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 12,
                    fontFamily: appConfig.fonts.Regular,
                    flex: 1,
                    marginLeft: 5,
                    color: 'rgba(84, 84, 88, 0.7)',
                  }}>
                  {getStrDate(item.CreatedDate)} - {getTime(item.CreatedDate)}
                </Text>
              </View>
              <Text numberOfLines={2} style={{fontSize: 14, fontFamily: appConfig.fonts.Medium, flex: 1}}>
                {item.NotificationTitle}
              </Text>
              <HTMLView
                value={item.NotificationContent}
                onLinkPress={(url: string) => Linking.openURL(appConfig.hostURL + url)}
                stylesheet={htmlStyles}
              />
            </View>
          )}
          keyExtractor={item => {
            return item.ID;
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => logOut(dispatch)}
        activeOpacity={0.5}
        style={[styles.wrapInfo, {marginHorizontal: 16, marginBottom: 16}]}>
        <Text style={{color: '#fff', fontSize: 20, fontFamily: appConfig.fonts.Medium}}>Đăng xuất</Text>
      </TouchableOpacity>
      <SafeAreaView />
    </View>
  );
};

export default TokenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  textHeader: {
    fontFamily: appConfig.fonts.Bold,
    fontSize: 22,
  },
  subTextHeader: {
    fontFamily: appConfig.fonts.Regular,
    color: '#AAB4AF',
    fontSize: 13,
    marginTop: 5,
  },
  wrapInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    backgroundColor: appConfig.colors.primary,
    borderRadius: 10,
  },
  btnBG: {
    backgroundColor: '#F5F5F5',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 50,
  },
});

const htmlStyles = StyleSheet.create({
  a: {
    fontFamily: appConfig.fonts.Medium,
    color: appConfig.colors.primary,
    marginTop: 5,
    fontSize: 14,
  },
  p: {
    fontFamily: appConfig.fonts.Regular,
    fontSize: 14,
    color: '#78909C',
  },
  span: {
    fontFamily: appConfig.fonts.Regular,
    fontSize: 14,
  },
});
