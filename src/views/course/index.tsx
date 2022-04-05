import React, {useEffect, useState} from 'react';
import {View, RefreshControl, StyleSheet, FlatList} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Empty, HomeHeader} from '~/components';
import {CourseProps} from '../types/course';
import {useDispatch, useSelector} from 'react-redux';
import RenderItemCourse from './renderItem';
import {parentsApi} from '~/api/parents';
import {setCourseList} from '~/store/reducers/courseSlice';
import {wait, logOut} from '~/utils';
import {showBottomTabs} from '~/store/reducers/bottomTabSlice';
import {timeOutToken} from '~/utils/function';

const CourseScreen = () => {
  const navigation = useNavigation<CourseProps['navigation']>();
  // @ts-ignore
  const courseList = useSelector(state => state.course.data);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const focused = useIsFocused();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getCourseList();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (focused) {
      dispatch(showBottomTabs());
    }
  }, [focused]);

  const getCourseList = async () => {
    try {
      const response = await parentsApi.getCourse();
      response.status == 200 && dispatch(setCourseList(response.data.data));
    } catch (error) {
      console.error(error);
      timeOutToken({error: error, onPress: () => logOut(dispatch)});
    }
  };

  return (
    <View style={[styles.container]}>
      <HomeHeader isCourse={true} />
      <View style={{paddingHorizontal: 16}}>
        <FlatList
          data={courseList}
          numColumns={1}
          horizontal={false}
          ListEmptyComponent={<Empty />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({item}) => (
            <RenderItemCourse
              onPress={(e: any) =>
                navigation.navigate('SCHEDULE', {
                  item: e,
                })
              }
              item={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any) => {
            return item.ID;
          }}
          ListFooterComponent={<View style={{height: 140}} />}
        />
      </View>
    </View>
  );
};

export default CourseScreen;

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
