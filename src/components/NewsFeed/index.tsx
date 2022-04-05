import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {isNull} from '~/utils';
import {appConfig} from '~/appConfig';
import {NewsProps} from '~/views/types/news';

const NewsFeed = (props: any) => {
  const {data} = props;
  const navigation = useNavigation<NewsProps['navigation']>();

  const goToDetails = (item: object) => {
    navigation.navigate('DETAILS', {
      item,
    });
  };

  return (
    <View style={[styles.container]}>
      {!isNull(data) && (
        <>
          {data.length !== 0 && (
            <>
              <TouchableOpacity
                onPress={() => goToDetails(data[0])}
                activeOpacity={0.5}
                style={styles.first}>
                <View style={{width: '100%', height: 182}}>
                  <Image
                    resizeMode="cover"
                    source={{uri: `${appConfig.hostURL}${data[0]?.PostIMG}`}}
                    style={{width: appConfig.sizes.dW - 32, height: 182, borderRadius: 16}}
                  />
                </View>
                <Text style={styles.title}>{data[0]?.TitlePost || ''}</Text>
                <Text style={styles.sub}>
                  {data[0]?.CreatedDate} • {data[0]?.NumberView} phút đọc
                </Text>
              </TouchableOpacity>

              <View style={{width: '100%'}}>
                <Text
                  style={{
                    color: '#1C1C1C',
                    fontSize: 20,
                    fontFamily: appConfig.fonts.Medium,
                    marginTop: 20,
                  }}>
                  Tin tức mới nhất
                </Text>

                {data.map((e: any) => (
                  <TouchableOpacity
                    key={e.ID}
                    onPress={() => goToDetails(e)}
                    activeOpacity={0.5}
                    style={styles.item}>
                    <View style={{height: '100%', width: 100}}>
                      <Image
                        resizeMode="cover"
                        source={{uri: `${appConfig.hostURL}${e?.PostIMG}`}}
                        style={{width: 100, height: 72, borderRadius: 10}}
                      />
                    </View>
                    <View style={{flex: 1, paddingLeft: 16}}>
                      <Text style={[styles.title, {marginTop: 0, fontSize: 16}]}>
                        {e?.TitlePost || ''}
                      </Text>
                      <Text style={styles.sub}>
                        {e?.CreatedDate} • {e?.NumberView} phút đọc
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default NewsFeed;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
  },
  title: {
    fontSize: 17,
    color: '#000',
    fontFamily: appConfig.fonts.Medium,
    marginTop: 16,
  },
  sub: {
    fontSize: 12,
    color: '#AAB4AF',
    marginTop: 5,
    fontFamily: appConfig.fonts.Regular,
  },
  first: {
    width: '100%',
  },
  item: {
    width: '100%',
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
