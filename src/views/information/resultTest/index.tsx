import React, {useEffect, useState} from 'react';
import {View, StyleSheet, RefreshControl, FlatList} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Empty, HomeHeader} from '~/components';
import {useDispatch, useSelector} from 'react-redux';
import {hideBottomTabs} from '~/store/reducers/bottomTabSlice';
import ItemResultTest from './item';
import {wait} from '~/utils';
import {parentsApi} from '~/api/parents';
import {setResultTest} from '~/store/reducers/globalState';

const ResultTestScreen = () => {
  // @ts-ignore
  const resultTests = useSelector(state => state.globalState.resultTest);
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getResultTest();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const getResultTest = async () => {
    try {
      const response = await parentsApi.getResultTest();
      response.status == 200 && dispatch(setResultTest(response.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (focused) {
      dispatch(hideBottomTabs());
    }
  }, [focused]);

  return (
    <View style={[styles.container]}>
      <HomeHeader title="Thông tin kiểm tra" showBack={true} />
      <FlatList
        data={resultTests}
        numColumns={1}
        horizontal={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Empty />}
        renderItem={({item}) => (
          <ItemResultTest onPress={(e: any) => {}} data={resultTests} item={item} />
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

export default ResultTestScreen;

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
