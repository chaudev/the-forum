import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import {appConfig} from '~/appConfig';
import {getIndex, getStrDate, getTime} from '~/utils';
import {icons} from '~/lib';

const CardItem = (props: any) => {
  const {source, content} = props;
  return (
    <View style={styles.mainItem}>
      <View style={styles.btnBG}>
        <Image resizeMode="contain" source={source} style={{width: 11, height: 11}} />
      </View>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const ItemSchedule = (props: any) => {
  const {data, item, onPress} = props;

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.5}
      style={[
        styles.container,
        {
          width: appConfig.sizes.dW - 32,
        },
      ]}>
      <View
        style={{
          height: '100%',
          width: 40,
          backgroundColor: appConfig.colors.primary,
          borderTopStartRadius: 16,
          borderBottomStartRadius: 15,
          marginTop: -1,
          zIndex: 999,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 22, color: '#fff', fontFamily: appConfig.fonts.Bold}}>{getIndex(data, item) + 1}</Text>
      </View>
      <View style={{flex: 1, paddingLeft: 16, paddingVertical: 16}}>
        <View style={[styles.mainItem, {marginTop: -10}]}>
          <CardItem source={icons.book} content={`Môn học: ${item?.subject}`} />
        </View>
        <CardItem source={icons.building} content={`Trung tâm: ${item?.school}`} />
        <CardItem source={icons.room} content={`Phòng: ${item?.room}`} />
        <CardItem source={icons.calender} content={`Ngày: ${getStrDate(item?.start)}`} />
        <CardItem source={icons.clock} content={`Thời gian: ${getTime(item?.start)} - ${getTime(item?.end)}`} />
        <CardItem source={icons.user} content={`Giáo viên: ${item?.teacher}`} />
      </View>
    </TouchableOpacity>
  );
};

export default ItemSchedule;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingLeft: 0,
    borderWidth: 1,
    borderColor: 'rgba(84, 84, 88, 0.2)',
    marginTop: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 230,
  },
  title: {
    fontSize: 14,
    fontFamily: appConfig.fonts.Regular,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    fontSize: 13,
    fontFamily: appConfig.fonts.Regular,
    lineHeight: 16,
    marginLeft: 10,
  },
  mainItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  btnBG: {
    backgroundColor: '#F5F5F5',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
});
