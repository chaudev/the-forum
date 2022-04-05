import React from 'react';
import {Alert, Clipboard, Linking, Platform} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {setInformations, setLogin} from '~/store/reducers/userSlice';
import {localUser} from '.';
import {check, requestMultiple, PERMISSIONS} from 'react-native-permissions';
import moment from 'moment';

export const openLink = (url: string) => {
  Linking.openURL(url);
};

export const copyToClipboard = (text: string) => {
  Clipboard.setString(text);
  SimpleToast.show('Sao chép thành công', SimpleToast.SHORT);
};

export const isNull = (param: any) => {
  return param == undefined || param == null || param == '' ? true : false;
};

export const logOut = (dispatch: any) => {
  localUser.logout();
  dispatch(setLogin(false));
  dispatch(setInformations({}));
};

export const getStoragePermission = () => {
  requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]).then(statuses => {
    console.log(
      'PERMISSIONS - READ_STORAGE: ',
      statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE],
    );
  });
};

export const checkStoragePermission = async () => {
  const res = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  return res == 'granted' ? true : false;
};

export const getLastName = (text: string) => {
  if (!isNull(text)) {
    let arrayText = text.split('');
    let newText = arrayText.reverse();
    let baseResult = '';
    let flag = 0;
    for (let i = 0; i < newText.length; i++) {
      if (newText[i] == ' ') {
        flag = 1;
      }
      if (flag == 0) {
        baseResult = baseResult + newText[i];
      }
    }
    let arrayResult = baseResult.split('');
    let result = arrayResult.reverse();
    return result;
  } else {
    return '';
  }
};

export const parseToMoney = (value: string) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export const getTime = (date: any) => {
  return moment(date).format('hh:mm');
};

export const getStrDate = (date: any) => {
  return moment(date).format('DD/MM/yyy');
};

export const getIndex = (data: any, item: any) => {
  return data.indexOf(item);
};

export const isIOS = () => {
  return Platform.OS == 'ios' ? true : false;
};

export const timeOutToken = (props: any) => {
  const {onPress, error} = props;

  if (error.message == 'Phiên đăng nhập đã hết hiệu lực') {
    Alert.alert('Phiên đăng nhập đã hết hiệu lực', 'Đăng nhập lại để tiếp tục', [
      {text: 'OK', onPress: () => onPress()},
    ]);
  }
};
