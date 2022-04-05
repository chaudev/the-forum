import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import {checkStoragePermission, getStoragePermission, isNull} from '~/utils';
import SplashScreen from 'react-native-splash-screen';
import {localUser, logOut} from '~/utils';
import {AnimationInput, CustomHeader, PrimaryButton} from '~/components';
import {hideBottomTabs} from '~/store/reducers/bottomTabSlice';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {UserProps} from '~/views/types/user';
import {icons} from '~/lib';
import {avatarOptions} from '~/lib/pickImages';
import {userApi} from '~/api';
import {useKeyboard} from '~/utils/useKeyboard';
import {setInformations} from '~/store/reducers/userSlice';
import SimpleToast from 'react-native-simple-toast';
import {isIOS, timeOutToken} from '~/utils/function';

const IMG_DEFAULT = require('~/assets/images/defaultUser.png');

const UpdateInformationScreen = () => {
  // @ts-ignore
  const userData = useSelector(state => state.user);
  const navigation = useNavigation<UserProps['navigation']>();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const isShowKey = useKeyboard();

  const [loading, setLoading] = useState(false);
  const [imagePicked, setImagePicked] = useState({type: '', uri: '', name: ''});
  const [fullName, setFulName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    SplashScreen.hide();
    dispatch(hideBottomTabs());
    getStoragePermission();
    setData();
  }, []);

  const setData = () => {
    if (userData.informations !== {}) {
      setFulName(userData.informations.FullName);
      setEmail(userData.informations.Email);
      setPhoneNumber(userData.informations.Phone);
      setAddress(userData.informations.Address);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGetImage = async () => {
    if (isIOS()) {
      getImage();
    } else {
      const permission = await checkStoragePermission();
      if (!permission) {
        getStoragePermission();
      } else {
        getImage();
      }
    }
  };

  const getImage = () => {
    // @ts-ignore
    launchImageLibrary(avatarOptions, (response: any) => {
      if (!response.didCancel) {
        setImagePicked({
          type: response.assets[0].type,
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
        });
      }
    });
  };

  const handlePressUpdate = () => {
    if (fullName == '') {
      setError('fullName');
    } else if (phoneNumber == '') {
      setError('phoneNumber');
    } else {
      setLoading(true);
      imagePicked.uri == '' ? postUpdate(userData.informations.Avatar) : handleUploadImage();
    }
  };

  const handleUploadImage = async () => {
    try {
      const response = await userApi.uploadAvatar(imagePicked);
      response.status == 200 && postUpdate(response.data.data);
    } catch (error) {
      console.error('postUpdate: ', error);
      SimpleToast.show('Upload ảnh không thành công', SimpleToast.SHORT);
      timeOutToken({error: error, onPress: () => logOut(dispatch)});
    }
  };

  const postUpdate = async (avatar: string) => {
    let temp = {
      id: userData.informations.ID,
      fullname: fullName,
      phone: phoneNumber,
      email: email,
      address: address,
      avatar: avatar,
    };
    try {
      const response = await userApi.updateProfile(temp);
      response.status == 200 && updateData(response.data.data);
    } catch (error) {
      console.error('postUpdate: ', error);
      SimpleToast.show('Cập nhật không thành công', SimpleToast.SHORT);
      timeOutToken({error: error, onPress: () => logOut(dispatch)});
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (data: any) => {
    SimpleToast.show('Cập nhật thành công', SimpleToast.SHORT);
    dispatch(setInformations(data));
    await localUser.setUserInformation(data);
    await localUser.setToken(data.Token);
  };

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="dark-content" />
      <View style={{paddingTop: insets.top}} />
      <CustomHeader title="Chỉnh sửa thông tin" onPressLeft={handleGoBack} />
      <View style={[styles.container, {padding: 16, paddingBottom: 0}]}>
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'c6c6c6'}}>
          <View style={styles.wrapAvatar}>
            <Image
              resizeMode="cover"
              source={
                imagePicked.uri !== ''
                  ? {uri: imagePicked.uri}
                  : isNull(userData.informations.Avatar)
                  ? IMG_DEFAULT
                  : {uri: `${appConfig.hostURL}/${userData.informations.Avatar}`}
              }
              style={{width: 88, height: 88, borderRadius: 999}}
            />
            <View style={styles.btnAvatar}>
              <View style={{borderRadius: 999, backgroundColor: '#fff'}}>
                <TouchableOpacity
                  onPress={handleGetImage}
                  activeOpacity={0.5}
                  style={styles.mainBtnAavtar}>
                  <Image
                    resizeMode="contain"
                    source={icons.camera}
                    style={{width: 14, height: 14}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{backgroundColor: '#fff'}}>
            <AnimationInput
              label="HỌ VÀ TÊN"
              isError={error == 'fullName' ? true : false}
              fontFamily={appConfig.fonts.Regular}
              value={fullName}
              onChangeText={(e: string) => setFulName(e)}
              style={{width: '100%', borderBottomWidth: 0}}
            />
            <View style={{marginTop: 16}}>
              <AnimationInput
                label="EMAIL"
                fontFamily={appConfig.fonts.Regular}
                value={email}
                onChangeText={(e: string) => setEmail(e)}
                style={{width: '100%', borderBottomWidth: 0}}
              />
            </View>
            <View style={{marginTop: 16}}>
              <AnimationInput
                label="SỐ ĐIỆN THOẠI"
                fontFamily={appConfig.fonts.Regular}
                isError={error == 'phoneNumber' ? true : false}
                value={phoneNumber}
                isNumber={true}
                onChangeText={(e: string) => setPhoneNumber(e)}
                style={{width: '100%', borderBottomWidth: 0}}
              />
            </View>
            <View style={{marginTop: 16}}>
              <AnimationInput
                label="ĐỊA CHỈ"
                fontFamily={appConfig.fonts.Regular}
                value={address}
                onChangeText={(e: string) => setAddress(e)}
                style={{width: '100%', borderBottomWidth: 0}}
              />
            </View>
            {isShowKey && (
              <View style={{flex: 1, marginTop: 16, justifyContent: 'flex-end', paddingBottom: 16}}>
                <PrimaryButton
                  onPress={() => handlePressUpdate()}
                  text="Lưu thay đổi"
                  loading={loading}
                />
              </View>
            )}
          </View>
        </ScrollView>
        {!isShowKey && (
          <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 16}}>
            <PrimaryButton
              onPress={() => handlePressUpdate()}
              text="Lưu thay đổi"
              loading={loading}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default UpdateInformationScreen;

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
