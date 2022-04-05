import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {hideBottomTabs} from '~/store/reducers/bottomTabSlice';
import {Empty, HomeHeader} from '~/components';
import {parentsApi} from '~/api/parents';
import {setMore} from '~/store/reducers/globalState';
import {wait, logOut} from '~/utils';
import CourseDetailsItem from './item';
import {InformationProps} from '~/views/types/information';
import {timeOutToken} from '~/utils/function';

const data = [
  {ID: 1, title: 'Chuyển khóa'},
  // {ID: 2, title: 'Kết quả đăng ký'},
  {ID: 3, title: 'Khóa hẹn đăng ký'},
  {ID: 4, title: 'Bảo lưu'},
];

const MoreDetails = () => {
  // @ts-ignore
  const moreData = useSelector(state => state.globalState.more);
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<InformationProps['navigation']>();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMoreData();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const getMoreData = async () => {
    try {
      const response = await parentsApi.getMore();
      response.status == 200 && dispatch(setMore(response.data.data));
    } catch (error) {
      console.error(error);
      timeOutToken({error: error, onPress: () => logOut(dispatch)});
    }
  };

  useEffect(() => {
    if (focused) {
      dispatch(hideBottomTabs());
    }
  }, [focused]);

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="dark-content" />
      <HomeHeader title="Thông tin khác" showBack={true} />
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
                  navigation.navigate('CHANGECOURSES', {
                    data: moreData,
                  });
                }
                if (e.ID == 2) {
                  navigation.navigate('EXCERCISE', {
                    data: moreData,
                  });
                }
                if (e.ID == 3) {
                  navigation.navigate('REGISTRATION', {
                    data: moreData,
                  });
                }
                if (e.ID == 4) {
                  navigation.navigate('RESERVES', {
                    data: moreData,
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

export default MoreDetails;

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
