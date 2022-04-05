import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {appConfig} from '~/appConfig';
import {getIndex, getStrDate, isNull, parseToMoney} from '~/utils';

const PaiedItem = (props: any) => {
  const {item, onPress, data} = props;

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.5}
      style={[
        styles.container,
        {
          borderTopWidth: getIndex(data, item) == 0 ? 0 : 1,
        },
      ]}>
      <View style={[styles.mainItem]}>
        <Text
          style={{
            fontSize: 16,
            color: '#000',
            fontFamily: appConfig.fonts.Regular,
          }}>
          {isNull(item?.ReasonNote) ? 'Không có ghi chú' : item?.ReasonNote}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#7C7C7C',
            fontFamily: appConfig.fonts.Regular,
            marginTop: 5,
          }}>
          Ngày tạo: {getStrDate(item?.CreatedDate)}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 15,
          color: appConfig.colors.primary,
          fontFamily: appConfig.fonts.Regular,
        }}>
        {parseToMoney(item?.Price)} VND
      </Text>
    </TouchableOpacity>
  );
};

export default PaiedItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    borderColor: 'rgba(84, 84, 88, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
    flex: 1,
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
