import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {Empty, HomeHeader} from '~/components';
import {useDispatch} from 'react-redux';
import {hideBottomTabs} from '~/store/reducers/bottomTabSlice';
import ReservesItem from './item';

const ReservesScreen = () => {
  // @ts-ignore
  const params = useRoute().params.data;
  const focused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (focused) {
      dispatch(hideBottomTabs());
    }
  }, [focused]);

  return (
    <View style={[styles.container]}>
      <HomeHeader title="Bảo lưu" showBack={true} />

      <FlatList
        data={params.Reserves}
        numColumns={1}
        horizontal={false}
        ListEmptyComponent={<Empty />}
        renderItem={({item}) => (
          <ReservesItem onPress={(e: any) => {}} data={params.Reserves} item={item} />
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

export default ReservesScreen;

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
