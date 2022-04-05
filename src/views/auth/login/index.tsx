import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet, StatusBar, ActivityIndicator} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import {CustomInput} from '~/components';
import {userApi} from '~/api';
import {setInformations, setLogin, localUser} from '~/store/reducers/userSlice';
import {setNewsFeed} from '~/store/reducers/newsSlice';
import {logOut} from '~/utils';
import {parentsApi} from '~/api/parents';
import SimpleToast from 'react-native-simple-toast';

const LOGO = require('~/assets/images/logo/logo-02.png');

let todoNewsFeed = {search: '', start: 1, lenght: 20};

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state: any) => state.user);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUserName = (e: string) => {
    setUserName(e);
  };

  const onChangePassword = (e: string) => {
    setPassword(e);
  };

  const handleLogin = () => {
    setLoading(true);
    callApi({
      username: userName,
      password: password,
    });
  };

  const callApi = async (data: IInputLogin) => {
    try {
      const response = await userApi.login(data);
      response.status == 200 && handleLogged(response);
    } catch (error: any) {
      console.log(error);
      SimpleToast.show(error.message, SimpleToast.SHORT);
      setLoading(false);
    }
  };

  const postPlayer = async (param: any) => {
    try {
      await userApi.saveIncludeplayer(param);
    } catch (error) {
      console.error(error: any); 
      if (error.message == 'Phiên đăng nhập đã hết hiệu lực') {
        logOut(dispatch);
      }
    }
  };

  const setNews = async (data: object) => {
    await dispatch(setNewsFeed(data));
    setLoading(false);
  };

  const getNewsFeed = async () => {
    setLoading(true);
    try {
      const response = await parentsApi.getNewsFeed(todoNewsFeed);
      response.status == 200 && setNews(response.data.data);
    } catch (error: any) {
      console.error(error); 
      if (error.message == 'Phiên đăng nhập đã hết hiệu lực') {
        logOut(dispatch);
      }
    }
  };

  const handleLogged = async (data: any) => {
    await localUser.setUserInformation(data.data.data);
    await localUser.setToken(data.data.data.Token);
    dispatch(setInformations(data.data.data));
    postPlayer({AccountID: data.data.data.ID, IncludePlayerID: userData.deviceID});
    await getNewsFeed();
    dispatch(setLogin(true));
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top + 28}]}>
      <StatusBar barStyle="dark-content" />
      <Image resizeMode="contain" source={LOGO} style={styles.logo} />
      <CustomInput defaultValue={userName} onChange={onChangeUserName} placeholder="Số điện thoại" />
      <View style={{marginTop: 16, width: '100%'}}>
        <CustomInput defaultValue={password} onChange={onChangePassword} placeholder="Mật khẩu" isPassword={true} />
      </View>
      <TouchableOpacity onPress={() => handleLogin()} activeOpacity={0.7} style={styles.btn}>
        <Text style={styles.text}>Đăng nhập</Text>
        {loading && <ActivityIndicator size="small" color="#fff" style={{marginLeft: 10}} />}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appConfig.colors.white,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: appConfig.sizes.dW / 1.5,
    height: appConfig.sizes.dW / 2.5,
    marginBottom: 48,
  },
  btn: {
    marginTop: 48,
    width: '100%',
    backgroundColor: appConfig.colors.primary,
    height: 56,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: appConfig.fonts.Medium,
    color: appConfig.colors.white,
    fontSize: 17,
  },
});
