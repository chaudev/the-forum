import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {isNull} from '~/utils';

const IMG_ARROW = require('~/assets/images/arrow-right.png');

const ItemButton = (props: any) => {
  const {onPress, source, showArrow, title, subTitle} = props;

  return (
    <TouchableOpacity onPress={() => onPress()} activeOpacity={0.5} style={[styles.wrapInfo]}>
      <View style={styles.btnBG}>
        <Image resizeMode="contain" source={source} style={{width: 16, height: 16}} />
      </View>
      <View style={{flex: 1}}>
        <Text style={[styles.textFull, {marginLeft: 16}]}>{title}</Text>
        {!isNull(subTitle) && <Text style={styles.subTitle}>{subTitle}</Text>}
      </View>
      {showArrow !== false && (
        <Image resizeMode="contain" source={IMG_ARROW} style={{width: 20, height: 20}} />
      )}
    </TouchableOpacity>
  );
};

export default ItemButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textFull: {
    fontSize: 16,
    color: '#000',
  },
  subTitle: {
    fontSize: 12,
    color: '#AAB4AF',
    marginLeft: 16,
  },
  wrapInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  btnBG: {
    backgroundColor: '#F5F5F5',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
  },
});
