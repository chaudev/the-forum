import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Linking,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {hideBottomTabs} from '~/store/reducers/bottomTabSlice';
import {HTMLView} from '~/components';
import {NewsProps} from '~/views/types/news';
import {isNull} from '~/utils';
import {isIOS} from '~/utils/function';

const IMG_BACK = require('~/assets/icons/CaretLeft2.png');

const DetailScreen = () => {
  // @ts-ignore
  const newsFeedData = useSelector(state => state.news.data);
  const navigation = useNavigation<NewsProps['navigation']>();
  // @ts-ignore
  const params = useRoute().params.item;
  const focused = useIsFocused();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  let scrollRef = useRef(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    getTop5();
  }, [newsFeedData]);

  const getTop5 = () => {
    let temp: any = [];
    if (newsFeedData.length > 0) {
      temp.push(newsFeedData[0]);
      if (newsFeedData.length > 1) {
        temp.push(newsFeedData[1]);
        if (newsFeedData.length > 2) {
          temp.push(newsFeedData[2]);
          if (newsFeedData.length > 3) {
            temp.push(newsFeedData[3]);
            if (newsFeedData.length > 4) {
              temp.push(newsFeedData[4]);
            }
          }
        }
      }
    }
    setData(temp);
  };

  useEffect(() => {
    if (focused) {
      dispatch(hideBottomTabs());
    }
  }, [focused]);

  const goToDetails = (item: object) => {
    // @ts-ignore
    scrollRef.current.scrollTo({
      y: 0,
      animated: true,
    });
    navigation.navigate('DETAILS', {
      item,
    });
  };

  return (
    <View style={[styles.container, {marginTop: isIOS() ? -15 : 0}]}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.5}
        style={[styles.btnBack, {paddingTop: insets.top + 16}]}>
        <Image resizeMode="contain" source={IMG_BACK} style={{width: 24, height: 24}} />
      </TouchableOpacity>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#fff'}}>
        <Image
          resizeMode="cover"
          source={{uri: `${appConfig.hostURL}${params?.PostIMG}`}}
          style={{width: appConfig.sizes.dW, height: 350}}
        />
        <View style={styles.main}>
          <Text style={styles.title}>{params?.TitlePost || ''}</Text>
        </View>
        <View style={styles.mainHtml}>
          <HTMLView
            value={params?.ContentPost}
            onLinkPress={(url: string) => Linking.openURL(url)}
            stylesheet={htmlStyles}
          />
        </View>
        {!isNull(data) && data.length > 0 && (
          <View style={{paddingHorizontal: 16, paddingBottom: 16}}>
            <View style={[styles.moreNews]}>
              <Text style={styles.textTitle}>Các bài viết khác</Text>
            </View>
            {data.map((e: any) => (
              <TouchableOpacity
                onPress={() => goToDetails(e)}
                activeOpacity={0.5}
                style={styles.item}>
                <View style={{height: '100%', width: 100}}>
                  <Image
                    resizeMode="cover"
                    source={{uri: `${appConfig.hostURL}${e?.PostIMGThumbnail}`}}
                    style={{width: 100, height: 72, borderRadius: 10}}
                  />
                </View>
                <View style={{flex: 1, paddingLeft: 16}}>
                  <Text
                    numberOfLines={2}
                    style={[styles.title, {marginTop: 0, fontSize: 16, color: '#000'}]}>
                    {e?.TitlePost}
                  </Text>
                  <Text style={styles.sub}>
                    {e?.CreatedDate} • {e?.NumberView} phút đọc
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

  main: {
    width: appConfig.sizes.dW,
    height: 350,
    marginTop: -350,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: 16,
  },
  mainHtml: {
    width: '100%',
    backgroundColor: appConfig.colors.white,
    marginTop: -50,
    borderRadius: 24,
    padding: 16,
    paddingTop: 24,
    paddingBottom: 70,
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

const htmlStyles = StyleSheet.create({
  a: {
    fontFamily: appConfig.fonts.Regular,
    color: appConfig.colors.primary,
    marginTop: 5,
  },
  p: {
    fontFamily: appConfig.fonts.Regular,
    marginBottom: -50,
    lineHeight: 24,
  },
  span: {
    fontFamily: appConfig.fonts.Regular,
  },
});
