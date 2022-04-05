import React, {useEffect, useState} from 'react';
import {View, RefreshControl, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {Empty, HomeHeader} from '~/components';
import {useDispatch} from 'react-redux';
import {parentsApi} from '~/api/parents';
import {isNull, wait, logOut} from '~/utils';
import SimpleToast from 'react-native-simple-toast';
import ItemSchedule from './item';
import {hideBottomTabs} from '~/store/reducers/bottomTabSlice';
import {appConfig} from '~/appConfig';
import {timeOutToken} from '~/utils/function';

const ScheduleScreen = () => {
  // @ts-ignore
  const params = useRoute().params.item;
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (focused) {
      dispatch(hideBottomTabs());
    }
  }, [focused]);

  useEffect(() => {
    if (!isNull(params)) {
      getSchedule(params?.CourseID);
    }
  }, [params]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getSchedule(params?.CourseID);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const getSchedule = async (param: any) => {
    try {
      const response = await parentsApi.getCourseSchedule(param);
      // @ts-ignore
      response.status == 200 && setSchedules(response.data.data);
    } catch (error) {
      // @ts-ignore
      SimpleToast.show(error.message, SimpleToast.SHORT);
      timeOutToken({error: error, onPress: () => logOut(dispatch)});
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container]}>
      <HomeHeader title="Lịch học" subTitle="Theo dõi lịch học của khóa" showBack={true} />
      {loading && (
        <View
          style={{
            width: appConfig.sizes.dW,
            height: appConfig.sizes.dH,
            marginTop: -70,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={appConfig.colors.primary} />
        </View>
      )}
      {!loading && (
        <View style={{paddingHorizontal: 16}}>
          <FlatList
            data={schedules}
            numColumns={1}
            horizontal={false}
            ListEmptyComponent={<Empty />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            renderItem={({item}) => (
              <ItemSchedule onPress={(e: any) => {}} data={schedules} item={item} />
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any) => {
              return item.ID;
            }}
            ListFooterComponent={<View style={{height: 130}} />}
          />
        </View>
      )}
    </View>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});
