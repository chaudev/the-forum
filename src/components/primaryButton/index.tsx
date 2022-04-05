import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {appConfig} from '~/appConfig';

const PrimaryButton = (props: any) => {
  const {onPress, text, loading} = props;

  return (
    <TouchableOpacity
      onPress={() => !loading && onPress()}
      activeOpacity={0.5}
      style={{
        width: '100%',
        height: 56,
        borderRadius: 10,
        backgroundColor: appConfig.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <Text style={{fontSize: 17, color: '#fff', fontFamily: appConfig.fonts.Medium}}>{text}</Text>
      {loading && <ActivityIndicator size="small" color="#fff" style={{marginLeft: 10}} />}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
