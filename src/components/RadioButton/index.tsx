import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {appConfig} from '~/appConfig';

const RadioButton = (props: any) => {
  const {isSelected} = props;

  return (
    <View style={[styles.radio]}>
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: 999,
          backgroundColor: appConfig.colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            backgroundColor: appConfig.colors.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isSelected && (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                backgroundColor: appConfig.colors.primary,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radio: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
