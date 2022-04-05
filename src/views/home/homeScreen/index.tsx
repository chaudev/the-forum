import React, {useEffect, useState} from 'react';
import {View, RefreshControl, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import SplashScreen from 'react-native-splash-screen';
import {Empty, HomeHeader, NewsFeed, Search} from '~/components';
import {useIsFocused} from '@react-navigation/native';
import {showBottomTabs} from '~/store/reducers/bottomTabSlice';
import {userApi} from '~/api';
import {setNotification} from '~/store/reducers/userSlice';
import {parentsApi} from '~/api/parents';
import {setNewsFeed} from '~/store/reducers/newsSlice';
import {setCourseList} from '~/store/reducers/courseSlice';
import {isNull, wait, logOut} from '~/utils';
import {timeOutToken} from '~/utils/function';

let todoNewsFeed = {search: '', start: 1, lenght: 20};

const HomeScreen = () => {
  // @ts-ignore
  const newsFeedData = useSelector(state => state.news.data);
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNewsFeed('');
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (focused) {
      SplashScreen.hide();
      dispatch(showBottomTabs());
      getNoti();
      getCourseList();
    }
  }, [focused]);

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

  const getNewsFeed = async (search: string) => {
    try {
      const response = await parentsApi.getNewsFeed({...todoNewsFeed, search: search});
      response.status == 200 && dispatch(setNewsFeed(response.data.data));
    } catch (error) {
      console.error(error);
      timeOutToken({error: error, onPress: () => logOut(dispatch)});
    }
  };

  const getCourseList = async () => {
    try {
      const response = await parentsApi.getCourse();
      response.status == 200 && dispatch(setCourseList(response.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  const setNoti = (data: any) => {
    dispatch(setNotification(data));
  };

  const handleSearch = (param: string) => {
    getNewsFeed(param);
  };

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="dark-content" />
      <HomeHeader isHome={true} />
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#fff', paddingHorizontal: 16}}>
        {!isNull(newsFeedData) && newsFeedData.length > 0 ? (
          <>
            <Search placeholder="Tìm kiếm tin tức" onSubmit={(e: string) => handleSearch(e)} />
            <NewsFeed data={newsFeedData || []} />
          </>
        ) : (
          <Empty />
        )}
        <View style={{height: 20}} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

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
