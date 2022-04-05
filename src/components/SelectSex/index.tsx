import React, {useMemo, useRef} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';
import {appConfig} from '~/appConfig';
import {RadioButton} from '..';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SelectSex = (props: any) => {
  const {onClose, onChange, value} = props;
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => [150, 60], []);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onClose()}
      style={{
        height: appConfig.sizes.dH + insets.top,
        marginTop: -appConfig.sizes.dH,
        backgroundColor: 'rgba(0,0,0,0.2)',
        zIndex: 99,
      }}>
      {/* <BottomSheet index={0} snapPoints={snapPoints} style={{zIndex: 999}}>
        <View style={{width: '100%', zIndex: 999, paddingHorizontal: 16}}>
          <Text style={{fontSize: 17, fontFamily: appConfig.fonts.Medium, marginBottom: 15}}>
            Chọn giới tính
          </Text>
          <TouchableOpacity
            onPress={() => {
              onChange('nam');
              onClose();
            }}
            activeOpacity={0.5}
            style={{height: 40, flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton isSelected={value == 'nam' ? true : false} />
            <Text style={{fontSize: 14, fontFamily: appConfig.fonts.Regular, marginLeft: 10}}>
              Nam
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onChange('nữ');
              onClose();
            }}
            activeOpacity={0.5}
            style={{height: 40, flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton isSelected={value == 'nữ' ? true : false} />
            <Text style={{fontSize: 14, fontFamily: appConfig.fonts.Regular, marginLeft: 10}}>
              Nữ
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet> */}
    </TouchableOpacity>
  );
};

export default SelectSex;
