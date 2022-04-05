import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {appConfig} from '~/appConfig';
import {icons} from '~/lib';
import {isNull} from '~/utils';

const CustomHeader = (props: any) => {
  const {title, containerStyle, showLeftIcon, showRightIcon, onPressLeft, onPressRight} = props;

  return (
    <View style={[containerStyle, styles.container]}>
      <TouchableOpacity
        onPress={() => !isNull(onPressLeft) && onPressLeft()}
        activeOpacity={0.5}
        style={styles.button}>
        {showLeftIcon !== false && (
          <Image resizeMode="contain" source={icons.goBack} style={{width: 24, height: 24}} />
        )}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() => !isNull(onPressRight) && onPressRight()}
        activeOpacity={0.5}
        style={styles.button}>
        {showRightIcon && (
          <Image resizeMode="contain" source={icons.goBack} style={{width: 24, height: 24}} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontFamily: appConfig.fonts.Medium,
  },
  button: {
    width: 45,
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
