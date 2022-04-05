import OneSignal from 'react-native-onesignal';
import {setDeviceID} from '~/store/reducers/userSlice';
import {appConfig} from '../appConfig';

export const getDeviceID = async (dispatch: any) => {
  const deviceState = await OneSignal.getDeviceState();
  console.log('deviceState.userId: ', deviceState.userId);
  if (deviceState.userId != undefined) {
    dispatch(setDeviceID(deviceState.userId));
  } else {
    getDeviceID(dispatch);
  }
};

export const initOneSignal = async (dispatch: any) => {
  await OneSignal.setLogLevel(6, 0);
  await OneSignal.setAppId(appConfig.oneSignalID);

  OneSignal.promptForPushNotificationsWithUserResponse(response => {
    console.log('Prompt response:', response);
  });

  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    let notification = notificationReceivedEvent.getNotification();
    console.log('notification xxx: ', notification);
    const data = notification.additionalData;
    console.log('additionalData: ', data);
  });

  OneSignal.setNotificationOpenedHandler(notification => {
    console.log('notification:', notification);
  });

  getDeviceID(dispatch);
};
