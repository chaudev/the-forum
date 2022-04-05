import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {Empty, HomeHeader} from '~/components';
import {useDispatch} from 'react-redux';
import {hideBottomTabs} from '~/store/reducers/bottomTabSlice';
import RegistrationItem from './item';

const RegistrationScreen = () => {
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
      <HomeHeader title="Điểm thi" showBack={true} />

      <FlatList
        data={params.RegistrationAppointments}
        numColumns={1}
        horizontal={false}
        ListEmptyComponent={<Empty />}
        renderItem={({item}) => (
          <RegistrationItem
            onPress={(e: any) => {}}
            data={params.RegistrationAppointments}
            item={item}
          />
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

export default RegistrationScreen;

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
