import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar, Linking, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {hideBottomTabs} from '~/store/reducers/bottomTabSlice';
import {Empty, HomeHeader} from '~/components';
import {parentsApi} from '~/api/parents';
import {setJoined, setPaied} from '~/store/reducers/globalState';
import {wait, logOut} from '~/utils';
import JoinedItem from './item';
import {InformationProps} from '~/views/types/information';
import {timeOutToken} from '~/utils/function';

const CourseJoined = () => {
  // @ts-ignore
  const joined = useSelector(state => state.globalState.joined);
  const navigation = useNavigation<InformationProps['navigation']>();
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getCourseJoined();
    wait(1000).then(() => setRefreshing(false));
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

  useEffect(() => {
    if (focused) {
      dispatch(hideBottomTabs());
    }
  }, [focused]);

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="dark-content" />
      <HomeHeader title="Khóa học đã tham gia" showBack={true} />
      <View style={{flex: 1}}>
        <FlatList
          data={joined}
          numColumns={1}
          horizontal={false}
          ListHeaderComponent={<View style={{height: 16}} />}
          ListEmptyComponent={<Empty />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({item}) => (
            <JoinedItem
              onPress={(e: any) =>
                navigation.navigate('COURSEDETAILS', {
                  data: e,
                })
              }
              data={joined}
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

export default CourseJoined;

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
