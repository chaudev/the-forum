import React, {useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Linking,
} from 'react-native';
import {useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import {isNull, getStrDate, getTime} from '~/utils';
import SplashScreen from 'react-native-splash-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getLastName} from '~/utils/function';
import appRouter from '~/navigators/appRouter';
import Popover from 'react-native-popover-view';
import {HTMLView} from '~/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icons} from '~/lib';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const IMG_BGAVATAR = require('~/assets/images/bg-avatar.png');

const HomeHeader = (props: any) => {
  const {isHome, isCourse, title, showBack, isInfomation, isAdmin} = props;
  // @ts-ignore
  const userData = useSelector(state => state.user);
  const navigation = useNavigation();
  const focused = useIsFocused();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (focused) {
      SplashScreen.hide();
    }
  }, [focused]);

  return (
    <View
      style={[
        styles.container,
        {
          padding: 16,
          paddingTop: 16 + insets.top,
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: isHome || isCourse ? 0 : 3,
        },
      ]}>
      {showBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}
          style={styles.button}>
          <Image
            resizeMode="contain"
            source={icons.goBack}
            style={{width: 22, height: 22, marginLeft: -5}}
          />
        </TouchableOpacity>
      )}
      <View style={{flex: 1}}>
        {isHome && (
          <>
            <Text style={styles.textHeader}>
              Xin chào {getLastName(userData?.informations?.FullName + '')}
            </Text>
            {!isAdmin && <Text style={styles.subTextHeader}>Hôm nay bạn muốn học gì?</Text>}
            {isAdmin && (
              <Text style={styles.subTextHeader}>Đây là danh sách thông báo mới nhất</Text>
            )}
          </>
        )}
        {isCourse && (
          <>
            <Text style={styles.textHeader}>Khóa học</Text>
            <Text style={styles.subTextHeader}>Tìm kiếm khóa học và thời gian phù hợp</Text>
          </>
        )}
        {isInfomation && (
          <>
            <Text style={styles.textHeader}>Thông tin chung</Text>
            <Text style={styles.subTextHeader}>Xem thông tin về lịch test, khóa học...</Text>
          </>
        )}
        {!isHome && !isCourse && !isInfomation && (
          <>
            <Text style={[styles.textHeader, {textAlign: 'center', fontSize: 20}]}>{title}</Text>
          </>
        )}
      </View>
      <Popover
        from={
          <TouchableOpacity onPress={() => {}} activeOpacity={0.5}>
            {!isAdmin && (
              <View style={styles.btnBG}>
                <Ionicons name="notifications" color={appConfig.colors.primary} size={16} />
              </View>
            )}
          </TouchableOpacity>
        }>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
        <View
          style={{
            minHeight: 50,
            maxHeight: appConfig.sizes.dH / 1.3,
            width: appConfig.sizes.dW - 20,
            backgroundColor: '#fff',
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={userData?.notification}
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
                  padding: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                  <Image
                    resizeMode="contain"
                    source={icons.clock}
                    style={{width: 12, height: 12}}
                  />
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
                <Text
                  numberOfLines={2}
                  style={{fontSize: 14, fontFamily: appConfig.fonts.Medium, flex: 1}}>
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
      </Popover>
      {isHome && (
        <TouchableOpacity
          // @ts-ignore
          onPress={() => !isAdmin && navigation.navigate(appRouter.TABS.USER)}
          activeOpacity={!isAdmin ? 0.5 : 1}
          style={{marginLeft: 10}}>
          <View style={styles.btnBG}>
            <Image
              resizeMode="cover"
              source={IMG_BGAVATAR}
              style={{width: 38, height: 38, marginBottom: -35, borderRadius: 999}}
            />
            <Image
              resizeMode="cover"
              source={
                isNull(userData?.informations?.Avatar)
                  ? icons.defaultAvatar
                  : {uri: `${appConfig.hostURL}/${userData?.informations?.Avatar}`}
              }
              style={{width: 32, height: 32, borderRadius: 999}}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  textHeader: {
    fontFamily: appConfig.fonts.Bold,
    fontSize: 22,
  },
  boxShadow: {
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
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
  btnBG: {
    backgroundColor: '#F5F5F5',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  button: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
