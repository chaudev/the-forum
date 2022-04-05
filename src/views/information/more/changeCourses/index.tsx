import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {Empty, HomeHeader} from '~/components';
import {useDispatch} from 'react-redux';
import {hideBottomTabs} from '~/store/reducers/bottomTabSlice';
import ItemChangeCourses from './item';

const ChangeCoursesScreen = () => {
  // @ts-ignore
  const params = useRoute().params.data;
  const focused = useIsFocused();
  const dispatch = useDispatch();

  console.log('params: ', params);

  useEffect(() => {
    if (focused) {
      dispatch(hideBottomTabs());
    }
  }, [focused]);

  return (
    <View style={[styles.container]}>
      <HomeHeader title="Chuyển khóa" showBack={true} />

      <FlatList
        data={params.ChangeCourses}
        numColumns={1}
        horizontal={false}
        ListEmptyComponent={<Empty />}
        renderItem={({item}) => (
          <ItemChangeCourses onPress={(e: any) => {}} data={params.ChangeCourses} item={item} />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => {
          return item.ID;
        }}
        ListFooterComponent={<View style={{height: 16}} />}
      />
    </View>
  );
};

export default ChangeCoursesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFA',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});
