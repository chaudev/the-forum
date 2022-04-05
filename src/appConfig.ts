import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const appConfig = {
  hostURL: '', // LINK API
  oneSignalID: '', // ONESIGNAL KEY FOR PUSH NOTIFICATION
  appVersion: '1.0.0',
  colors: {
    primary: '#6CD4E5',
    placeholder: '#7C7C7C',
    boder: 'rgba(84, 84, 88, 0.2)',
    white: '#fff',
    black: '#000',
  },
  sizes: {
    dW: width,
    dH: height,
  },
  fonts: {
    Bold: 'GoogleSans-Bold',
    BoldItalic: 'GoogleSans-BoldItalic',
    Italic: 'GoogleSans-Italic',
    Medium: 'GoogleSans-Medium',
    MediumItalic: 'GoogleSans-MediumItalic',
    Regular: 'GoogleSans-Regular',
  },
};
