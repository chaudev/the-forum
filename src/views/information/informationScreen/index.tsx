import React, {useEffect, useState} from 'react';
import {View, RefreshControl, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import {HomeHeader, ItemButton} from '~/components';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {showBottomTabs} from '~/store/reducers/bottomTabSlice';
import {parentsApi} from '~/api/parents';
import {wait, logOut} from '~/utils';
import {InformationProps} from '~/views/types/information';
import {icons} from '~/lib';
import {setJoined, setMore, setPaied, setResultTest} from '~/store/reducers/globalState';
import {timeOutToken} from '~/utils/function';

const InformationScreen = () => {
  const navigation = useNavigation<InformationProps['navigation']>();
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  // @ts-ignore
  const isStore = useSelector(state => state.isStore);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPaieds();
    getCourseJoined();
    getResultTest();
    getMoreData();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (focused) {
      dispatch(showBottomTabs());
    }
  }, [focused]);

  useEffect(() => {
    getPaieds();
    getCourseJoined();
    getResultTest();
    getMoreData();
  }, []);

  const getCourseJoined = async () => {
    try {
      const response = await parentsApi.getCourseJoined();
      response.status == 200 && dispatch(setJoined(response.data.data));
    } catch (error) {
      console.error(error);
      timeOutToken({error: error, onPress: () => logOut(dispatch)});
    }
  };

  const getResultTest = async () => {
    try {
      const response = await parentsApi.getResultTest();
      response.status == 200 && dispatch(setResultTest(response.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  const getPaieds = async () => {
    try {
      const response = await parentsApi.getPaymentHistory();
      response.status == 200 && dispatch(setPaied(response.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  const getMoreData = async () => {
    try {
      const response = await parentsApi.getMore();
      response.status == 200 && dispatch(setMore(response.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="dark-content" />
      <HomeHeader isInfomation={true} />
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#fff', paddingHorizontal: 16}}>
        <ItemButton
          onPress={() => navigation.navigate('RESULTTEST')}
          source={icons.exam}
          title="Thông tin kiểm tra"
        />
        <ItemButton
          onPress={() => navigation.navigate('COURSE')}
          source={icons.openBook2}
          title="Khóa học đã tham gia"
        />
        {isStore.status && (
          <>
            <ItemButton
              onPress={() => navigation.navigate('PAIEDS')}
              source={icons.wallet}
              title="Lịch sử thanh toán"
            />
            <ItemButton
              onPress={() => navigation.navigate('REFUND')}
              source={icons.refund}
              title="Lịch sử hoàn tiền"
            />
          </>
        )}
        <ItemButton
          onPress={() => navigation.navigate('MORE')}
          source={icons.more}
          title="Thông tin khác"
        />
        <View style={{height: 20}} />
      </ScrollView>
    </View>
  );
};

export default InformationScreen;

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
