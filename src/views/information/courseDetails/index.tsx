import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar, FlatList, RefreshControl} from 'react-native';
import {useDispatch} from 'react-redux';
import {appConfig} from '~/appConfig';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {hideBottomTabs} from '~/store/reducers/bottomTabSlice';
import {Empty, HomeHeader} from '~/components';
import {parentsApi} from '~/api/parents';
import {setPaied} from '~/store/reducers/globalState';
import {wait, logOut} from '~/utils';
import CourseDetailsItem from './item';
import {InformationProps} from '~/views/types/information';
import {timeOutToken} from '~/utils/function';

const data = [
  {ID: 1, title: 'Lịch sử điểm danh'},
  {ID: 2, title: 'Bài tập'},
  {ID: 3, title: 'Điểm thi'},
];

const CourseDetails = () => {
  // @ts-ignore
  const params = useRoute().params.data;
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<InformationProps['navigation']>();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (focused) {
      dispatch(hideBottomTabs());
    }
  }, [focused]);

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="dark-content" />
      <HomeHeader title="Thông tin chi tiết" showBack={true} />
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          numColumns={1}
          horizontal={false}
          ListHeaderComponent={<View style={{height: 16}} />}
          ListEmptyComponent={<Empty />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({item}) => (
            <CourseDetailsItem
              onPress={(e: any) => {
                if (e.ID == 1) {
                  navigation.navigate('ATTENDANCE', {
                    data: params,
                  });
                }
                if (e.ID == 2) {
                  navigation.navigate('EXCERCISE', {
                    data: params,
                  });
                }
                if (e.ID == 3) {
                  navigation.navigate('EXAM', {
                    data: params,
                  });
                }
              }}
              data={data}
              item={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any) => {
            return item.ID;
          }}
          ListFooterComponent={<View style={{height: 10}} />}
        />
      </View>
    </View>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFA',
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  textTitle: {
    fontSize: 20,
    flex: 1,
    fontFamily: appConfig.fonts.Regular,
    color: '#000',
  },
  moreNews: {
    height: 32,
    marginTop: 15,
    borderLeftWidth: 3,
    borderLeftColor: appConfig.colors.primary,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  sub: {
    fontSize: 12,
    color: '#AAB4AF',
    marginTop: 5,
    fontFamily: appConfig.fonts.Regular,
  },
  title: {
    marginBottom: 16,
    fontSize: 20,
    color: '#fff',
    fontFamily: appConfig.fonts.Medium,
  },
  content: {
    marginBottom: 24,
    fontSize: 15,
    color: '#fff',
    fontFamily: appConfig.fonts.Regular,
  },
  btnBack: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    marginBottom: -50,
    zIndex: 999,
    paddingLeft: 12,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  item: {
    width: '100%',
    height: 72,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
