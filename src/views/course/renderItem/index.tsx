import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import {parseToMoney} from '~/utils';

const IMG_BUILDING = require('~/assets/icons/building.png');
const IMG_BOOK = require('~/assets/icons/books-stack.png');
const IMG_CLOCK = require('~/assets/icons/clock.png');
const IMG_USER = require('~/assets/icons/user.png');
const IMG_PRICE = require('~/assets/icons/price.png');
const IMG_STATUS = require('~/assets/icons/status.png');

const RenderItemCourse = (props: any) => {
  const {item, onPress} = props;
  // @ts-ignore
  const isStore = useSelector(state => state.isStore);

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.5}
      style={{
        width: appConfig.sizes.dW - 32,
        paddingHorizontal: 16,
        paddingVertical: 18,
        borderWidth: 1,
        borderColor: 'rgba(84, 84, 88, 0.2)',
        marginTop: 16,
        borderRadius: 16,
      }}>
      <View style={[styles.mainItem, {marginTop: 0}]}>
        <View style={styles.btnBG}>
          <Image resizeMode="contain" source={IMG_BOOK} style={{width: 11, height: 11}} />
        </View>
        <Text style={styles.title}>{item?.CourseName}</Text>
      </View>

      <View style={styles.mainItem}>
        <View style={styles.btnBG}>
          <Image resizeMode="contain" source={IMG_BUILDING} style={{width: 11, height: 11}} />
        </View>
        <Text style={styles.content}>Trung tâm: {item?.SchoolName}</Text>
      </View>

      <View style={styles.mainItem}>
        <View style={styles.btnBG}>
          <Image resizeMode="contain" source={IMG_CLOCK} style={{width: 11, height: 11}} />
        </View>
        <Text style={styles.content}>
          Thời gian: {item?.OpeningDate} - {item?.enddate}
        </Text>
      </View>

      <View style={styles.mainItem}>
        <View style={styles.btnBG}>
          <Image
            resizeMode="contain"
            source={IMG_STATUS}
            style={{width: 11, height: 11, marginLeft: -1}}
          />
        </View>
        <Text style={styles.content}>Trạng thái: {item?.StatusName}</Text>
      </View>

      {isStore.status && (
        <View style={styles.mainItem}>
          <View style={styles.btnBG}>
            <Image resizeMode="contain" source={IMG_PRICE} style={{width: 11, height: 11}} />
          </View>
          <Text style={styles.content}>Học phí: {parseToMoney(item?.TotalPaid)}</Text>
        </View>
      )}

      <View style={styles.mainItem}>
        <View style={styles.btnBG}>
          <Image resizeMode="contain" source={IMG_USER} style={{width: 11, height: 11}} />
        </View>
        <Text style={styles.content}>Giáo viên: {item?.ListTeacher}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RenderItemCourse;

const styles = StyleSheet.create({
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
