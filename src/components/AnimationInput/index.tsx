import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, TextInput, Animated, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {appConfig} from '~/appConfig';

const AnimationInput = (props: any) => {
  const {label, value, onChangeText, style, fontFamily, isPassword, isNumber, isError} = props;
  const [focused, setFocused] = React.useState(false);
  const [flag, setFlag] = React.useState(-10);
  const useFocused = useIsFocused();

  const ANIM_RING_BOTTOM = new Animated.Value(20);

  const startAnimation = () => {
    Animated.timing(ANIM_RING_BOTTOM, {
      toValue: 0,
      useNativeDriver: true,
      duration: 100,
    }).start();
  };

  useEffect(() => {
    setFlag(0);
  }, [useFocused]);

  useEffect(() => {
    if (focused && value == '') {
      startAnimation();
    }
  }, [focused]);

  useEffect(() => {
    if (value != '' && flag == 0) {
      startAnimation();
    }
  }, [flag]);

  const [showPassword, setShowPassword] = React.useState(false);

  const onChangeStatus = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            borderColor: isError ? 'red' : 'rgba(84, 84, 88, 0.2)',
          },
        ]}>
        {(focused || value !== '') && (
          <Animated.Text
            style={[
              styles.labelText,
              {
                fontFamily: fontFamily,
                transform: [{translateY: ANIM_RING_BOTTOM}],
              },
            ]}>
            {focused || value !== '' ? label : ''}
          </Animated.Text>
        )}

        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            placeholder={!focused ? label : ''}
            placeholderTextColor={appConfig.colors.placeholder}
            secureTextEntry={isPassword == true ? !showPassword : false}
            keyboardType={isNumber == true ? 'phone-pad' : 'default'}
            style={[
              style,
              {
                fontSize: 15,
                flex: 1,
                marginBottom: focused || value !== '' ? -10 : -3,
                zIndex: 999,
                fontFamily: fontFamily,
              },
            ]}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />

          {isPassword && (
            <TouchableOpacity
              onPress={() => onChangeStatus()}
              style={[
                styles.button,
                {
                  marginBottom: focused || value !== '' ? 8 : 0,
                },
              ]}
              activeOpacity={0.7}>
              {showPassword ? (
                <Ionicons name="eye-outline" size={20} color="#A7A7A7" />
              ) : (
                <Ionicons name="eye-off-outline" size={20} color="#A7A7A7" />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isError && (
        <Text
          style={{marginTop: 5, color: 'red', fontSize: 11, fontFamily: appConfig.fonts.Regular}}>
          Không được bỏ trống
        </Text>
      )}
    </>
  );
};

export default AnimationInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 10,
    height: 56,
    justifyContent: 'center',
  },
  labelText: {
    marginBottom: -15,
    marginTop: 10,
    zIndex: 99,
    fontSize: 11,
    color: '#A7A7A7',
    marginLeft: 4,
  },
  button: {
    height: 36,
    justifyContent: 'center',
  },
});
