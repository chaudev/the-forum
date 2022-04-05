import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import SplashScreen from 'react-native-splash-screen';
import {AnimationInput, CustomHeader, PrimaryButton} from '~/components';
import {hideBottomTabs} from '~/store/reducers/bottomTabSlice';
import {useNavigation} from '@react-navigation/native';
import {UserProps} from '~/views/types/user';
import {userApi} from '~/api';
import SimpleToast from 'react-native-simple-toast';
import {timeOutToken, logOut} from '~/utils/function';

const UpdatePasswordScreen = () => {
  // @ts-ignore
  const userData = useSelector(state => state.user);
  const navigation = useNavigation<UserProps['navigation']>();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [curentPassword, setCurentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    SplashScreen.hide();
    dispatch(hideBottomTabs());
    console.log(userData.informations);
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePressUpdate = () => {
    setErrorText('');
    setError('');
    if (curentPassword == '') {
      setError('curentPassword');
    } else if (newPassword == '') {
      setError('newPassword');
    } else if (confirmPassword == '') {
      setError('confirmPassword');
    } else if (confirmPassword !== newPassword) {
      SimpleToast.show('Xác nhận mật khẩu không khớp ', SimpleToast.SHORT);
    } else {
      setLoading(true);
      postUpdate();
    }
  };

  const postUpdate = async () => {
    let temp = {
      old_password: curentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };

    try {
      const response = await userApi.updatePassword(temp);
      response.status == 200 && updateData(response.data.data);
    } catch (error) {
      console.error('postUpdate: ', error);
      SimpleToast.show('Cập nhật không thành công', SimpleToast.SHORT);
      // @ts-ignore
      setErrorText(error.message);
      timeOutToken({error: error, onPress: () => logOut(dispatch)});
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (data: any) => {
    SimpleToast.show('Cập nhật thành công', SimpleToast.SHORT);
  };

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="dark-content" />
      <View style={{paddingTop: insets.top}} />
      <CustomHeader title="Thay đổi mật khẩu" onPressLeft={handleGoBack} />

      <View style={[styles.container, {padding: 16, paddingBottom: 0}]}>
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'c6c6c6'}}>
          <View style={{backgroundColor: '#fff'}}>
            <AnimationInput
              label="MẬT KHẨU HIỆN TẠI"
              isError={error == 'curentPassword' ? true : false}
              fontFamily={appConfig.fonts.Regular}
              value={curentPassword}
              isPassword={true}
              onChangeText={(e: string) => setCurentPassword(e)}
              style={{width: '100%', borderBottomWidth: 0}}
            />
            <View style={{marginTop: 16}}>
              <AnimationInput
                label="MẬT KHẨU MỚI"
                isError={error == 'newPassword' ? true : false}
                fontFamily={appConfig.fonts.Regular}
                value={newPassword}
                isPassword={true}
                onChangeText={(e: string) => setNewPassword(e)}
                style={{width: '100%', borderBottomWidth: 0}}
              />
            </View>
            <View style={{marginTop: 16}}>
              <AnimationInput
                label="XÁC NHẬN LẠI MẬT KHẨU"
                isError={error == 'confirmPassword' ? true : false}
                fontFamily={appConfig.fonts.Regular}
                value={confirmPassword}
                isPassword={true}
                onChangeText={(e: string) => setConfirmPassword(e)}
                style={{width: '100%', borderBottomWidth: 0}}
              />
            </View>
          </View>
        </ScrollView>

        <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 16}}>
          {errorText !== '' && (
            <Text
              style={{
                marginBottom: 10,
                color: 'red',
                fontSize: 14,
                width: '100%',
                textAlign: 'center',
                fontFamily: appConfig.fonts.Regular,
              }}>
              {errorText}
            </Text>
          )}
          <PrimaryButton
            onPress={() => handlePressUpdate()}
            text="Lưu thay đổi"
            loading={loading}
          />
        </View>
      </View>
    </View>
  );
};

export default UpdatePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapAvatar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    height: 98,
  },
  btnAvatar: {
    height: 88,
    marginLeft: -26,
    justifyContent: 'flex-end',
  },
  mainBtnAavtar: {
    backgroundColor: appConfig.colors.primary,
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
});
