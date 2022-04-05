import React from 'react';
import {View, Image, Text} from 'react-native';
import {appConfig} from '~/appConfig';
import {icons} from '~/lib';

const Empty = () => {
  return (
    <View
      style={{
        width: appConfig.sizes.dW,
        height: appConfig.sizes.dH + 100,
        marginTop: -100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <Image
        resizeMode="contain"
        source={icons.empty}
        style={{width: appConfig.sizes.dW / 2, height: appConfig.sizes.dW / 2}}
      />
      <Text style={{fontFamily: appConfig.fonts.Regular, fontSize: 16, color: '#b1b1b6'}}>
        Không có dữ liệu
      </Text>
    </View>
  );
};

export default Empty;
