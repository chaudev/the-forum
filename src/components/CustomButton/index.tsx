import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {icons} from '~/lib';

const CustomButton = (props: any) => {
  const {label, value, onPress, fontFamily} = props;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={styles.container}>
      <View style={[styles.main, {height: '100%'}]}>
        <Text
          style={[
            styles.labelText,
            {
              fontFamily: fontFamily,
            },
          ]}>
          {label}
        </Text>

        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text
            numberOfLines={1}
            style={[
              {
                fontSize: 15,
                flex: 1,
                marginBottom: -3,
                zIndex: 999,
                fontFamily: fontFamily,
              },
            ]}>
            {value}
          </Text>
        </View>
      </View>
      <Image resizeMode="contain" source={icons.down} style={{width: 18, height: 18}} />
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(84, 84, 88, 0.2)',
    paddingHorizontal: 15,
    borderRadius: 10,
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
  },
  main: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
  },
  labelText: {
    marginBottom: -15,
    marginTop: 10,
    zIndex: 99,
    fontSize: 11,
    color: '#A7A7A7',
  },
  button: {
    height: 36,
    justifyContent: 'center',
  },
});
