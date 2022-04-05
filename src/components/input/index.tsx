import React, {useState, useEffect, useLayoutEffect, useReducer, useRef, FC} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import rootStyles from '~/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ExampleProps} from '../../views/types/example';
import {appConfig} from '~/appConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';

const textExample = 'Example Screen';

const CustomInput = (props: any) => {
  const {placeholderTextColor, onChange, placeholder, isPassword, defaultValue} = props;

  const [showPassword, setShowPassword] = useState(false);

  const onChangeStatus = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={[styles.container]}>
      <TextInput
        onChangeText={onChange}
        defaultValue={defaultValue || ''}
        placeholder={placeholder || ''}
        secureTextEntry={isPassword == true ? !showPassword : false}
        placeholderTextColor={placeholderTextColor || appConfig.colors.placeholder}
        style={{fontSize: 17, fontFamily: appConfig.fonts.Medium, flex: 1}}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => onChangeStatus()}
          style={{height: 36, justifyContent: 'center'}}
          activeOpacity={0.7}>
          {showPassword ? (
            <Ionicons name="eye-outline" size={20} color={appConfig.colors.placeholder} />
          ) : (
            <Ionicons name="eye-off-outline" size={20} color={appConfig.colors.placeholder} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderColor: appConfig.colors.boder,
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});
