import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import OneSignal from 'react-native-onesignal';

const localUser = {
  async getOnsignalDeviceState() {
    let response = await OneSignal.getDeviceState();
    return response;
  },
  async setToken(params: any) {
    await AsyncStorage.setItem('accessToken', params);
  },
  async getToken() {
    const response = await AsyncStorage.getItem('accessToken');
    return response == null ? null : response;
  },
  async setUserInformation(params: any) {
    await AsyncStorage.setItem('user', JSON.stringify(params));
  },
  async getUserInformation() {
    const response = await AsyncStorage.getItem('user');
    return response == null ? null : JSON.parse(response);
  },
  async mergeUser(params: any) {
    await AsyncStorage.mergeItem('user', JSON.stringify(params));
  },
  async logout() {
    await AsyncStorage.multiRemove(['user', 'accessToken']);
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    logged: false,
    informations: {},
    settings: {},
    deviceID: '',
    notification: [],
  },
  reducers: {
    setLogin: (state, action) => {
      state.logged = action.payload;
    },
    setInformations: (state, action) => {
      state.informations = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setDeviceID: (state, action) => {
      state.deviceID = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const {setLogin, setInformations, setSettings, setDeviceID, setNotification} = userSlice.actions;
export {localUser, userSlice};
export default userSlice.reducer;
