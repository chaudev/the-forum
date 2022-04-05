import React, {useEffect} from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import {isNull, logOut} from '~/utils';
import SplashScreen from 'react-native-splash-screen';
import {ItemButton} from '~/components';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {UserProps} from '~/views/types/user';
import {showBottomTabs} from '~/store/reducers/bottomTabSlice';
import {userApi} from '~/api';
import {setFAQ, setTermOfUser} from '~/store/reducers/globalState';
import {timeOutToken} from '~/utils/function';

const IMG_LOGOUT = require('~/assets/images/user/logout.png');
const IMG_PEOPLE = require('~/assets/images/user/people.png');
const IMG_LOCK = require('~/assets/images/user/lock.png');
const IMG_POSTBOX = require('~/assets/images/user/postbox.png');
const IMG_DEFAULT = require('~/assets/images/defaultUser.png');

const UserScreen = () => {
  // @ts-ignore
  const userData = useSelector(state => state.user);
  const navigation = useNavigation<UserProps['navigation']>();
  const focused = useIsFocused();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  useEffect(() => {
    if (focused) {
      SplashScreen.hide();
      dispatch(showBottomTabs());
      getTerm();
    }
  }, [focused]);

  useEffect(() => {
    getTerm();
    getFAQ();
  }, []);

  const getTerm = async () => {
    try {
      const response = await userApi.getTermOfService();
      response.status == 200 && dispatch(setTermOfUser(response.data.data));
    } catch (error) {
      console.error(error);
      timeOutToken({error: error, onPress: () => logOut(dispatch)});
    }
  };

  const getFAQ = async () => {
    try {
      const response = await userApi.getFAQ();
      response.status == 200 && dispatch(setFAQ(response.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[styles.container, {padding: 16, paddingTop: insets.top + 16}]}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.textHeader}>Tài khoản</Text>
      <Text style={styles.subTextHeader}>
        Thay đổi thông tin cá nhân và xem các khóa học của bạn
      </Text>
      <View style={[styles.wrapInfo, {marginTop: 24}]}>
        <Image
          resizeMode="cover"
          source={
            isNull(userData?.informations?.Avatar)
              ? IMG_DEFAULT
              : {uri: `${appConfig.hostURL}/${userData?.informations?.Avatar}`}
          }
          style={{width: 44, height: 44, borderRadius: 999}}
        />
        <View style={{flexDirection: 'column', marginLeft: 10, flex: 1}}>
          <Text numberOfLines={2} style={[styles.text, {fontSize: 17}]}>
            {userData?.informations?.FullName}
          </Text>
          <Text style={[styles.text, {fontSize: 11, color: '#9D9D9D'}]}>Đang đăng nhập</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('UPDATE')}
          activeOpacity={0.7}
          style={styles.miniButton}>
          <Text style={styles.miniButtonText}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
      </View>
      <ItemButton
        onPress={() => navigation.navigate('UPDATEPASSWORD')}
        source={IMG_LOCK}
        title="Thay đổi mật khẩu"
      />
      <ItemButton
        onPress={() => navigation.navigate('TERM')}
        source={IMG_PEOPLE}
        title="Điều khoản"
      />
      <ItemButton
        onPress={() => navigation.navigate('FAQ')}
        source={IMG_POSTBOX}
        title="Câu hỏi thường gặp"
      />
      <ItemButton
        onPress={() => logOut(dispatch)}
        source={IMG_LOGOUT}
        title="Đăng xuất"
        showArrow={false}
      />
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  miniButton: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: appConfig.colors.primary,
  },
  miniButtonText: {
    color: appConfig.colors.white,
    fontSize: 11,
    fontFamily: appConfig.fonts.Regular,
  },
  text: {
    fontSize: 16,
    color: '#000',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
});
