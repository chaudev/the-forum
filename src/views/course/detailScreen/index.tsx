import React, {useEffect} from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {appConfig} from '~/appConfig';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {hideBottomTabs} from '~/store/reducers/bottomTabSlice';
import {NewsProps} from '~/views/types/news';
import {isNull, parseToMoney} from '~/utils';

const IMG_BACK = require('~/assets/icons/CaretLeft2.png');
const BACKGROUND = require('~/assets/images/unsplash.png');

const IMG_BUILDING = require('~/assets/icons/building.png');
const IMG_BOOK = require('~/assets/icons/books-stack.png');
const IMG_CLOCK = require('~/assets/icons/clock.png');
const IMG_USER = require('~/assets/icons/user.png');
const IMG_PRICE = require('~/assets/icons/wallet.png');

const CourseDetailScreen = () => {
  const navigation = useNavigation<NewsProps['navigation']>();
  // @ts-ignore
  const params = useRoute().params.item;
  const focused = useIsFocused();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  useEffect(() => {
    if (focused) {
      dispatch(hideBottomTabs());
    }
  }, [focused]);

  const Item = (props: any) => {
    const {source, title, content} = props;
    return (
      <View style={{flexDirection: 'row', marginBottom: 25}}>
        <View style={styles.btnBG}>
          <Image resizeMode="contain" source={source} style={{width: 16, height: 16}} />
        </View>
        <View style={{flex: 1, marginLeft: 16}}>
          <Text style={{fontSize: 17, fontFamily: appConfig.fonts.Medium}}>{title}</Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: appConfig.fonts.Regular,
              color: '#7C7C7C',
              marginTop: 5,
            }}>
            {content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="light-content" />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.5}
        style={[styles.btnBack, {paddingTop: insets.top + 16}]}>
        <Image resizeMode="contain" source={IMG_BACK} style={{width: 24, height: 24}} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#fff'}}>
        <Image
          resizeMode="cover"
          source={BACKGROUND}
          style={{width: appConfig.sizes.dW, height: 350}}
        />
        <View style={styles.main}>
          <Text style={styles.title}>{params?.CourseName || ''}</Text>
          {/* <Text style={styles.content}>{params?.TitlePost || ''}</Text> */}
        </View>
        <View style={styles.mainHtml}>
          <Item source={IMG_BUILDING} title="Trung tâm" content={params.SchoolName} />
          <Item source={IMG_BOOK} title="Môn học" content={params.CourseName} />
          <Item
            source={IMG_CLOCK}
            title="Thời gian"
            content={
              params.OpeningDate + ' - ' + (isNull(params.enddate) ? 'Không rõ' : params.enddate)
            }
          />
          <Item source={IMG_USER} title="Giáo viên" content={params.ListTeacher} />
          <Item source={IMG_PRICE} title="Học phí" content={parseToMoney(params.TotalPaid)} />
        </View>
      </ScrollView>
    </View>
  );
};

export default CourseDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btnBG: {
    backgroundColor: '#F5F5F5',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
  },
  main: {
    width: appConfig.sizes.dW,
    height: 350,
    marginTop: -350,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: 16,
  },
  mainHtml: {
    width: '100%',
    backgroundColor: appConfig.colors.white,
    marginTop: -50,
    borderRadius: 24,
    padding: 30,
    paddingTop: 50,
    paddingBottom: 70,
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
});
