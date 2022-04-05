import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import {appConfig} from '~/appConfig';
import {icons} from '~/lib';
import {getIndex, getStrDate, isNull, parseToMoney} from '~/utils';

const JoinedItem = (props: any) => {
  const {item, onPress, data} = props;

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.5}
      style={[
        styles.container,
        styles.boxShadow,
        {
          marginTop: getIndex(data, item) == 0 ? 0 : 16,
        },
      ]}>
      <View style={[styles.mainItem]}>
        <Text
          style={{
            fontSize: 16,
            color: '#000',
            fontFamily: appConfig.fonts.Regular,
          }}>
          {item?.CourseName}
        </Text>
      </View>

      <Image resizeMode="contain" source={icons.right} style={{width: 20, height: 20}} />
    </TouchableOpacity>
  );
};

export default JoinedItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 64,
    marginHorizontal: 16,
  },
  boxShadow: {
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
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
