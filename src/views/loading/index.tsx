import React from 'react';
import {Image, StyleSheet} from 'react-native';
import rootStyles from '~/styles';
import {appConfig} from '~/appConfig';
import LinearGradient from 'react-native-linear-gradient';

const LOGO = require('~/assets/images/logo/logo-01.png');

const LoadingScreen = () => {
  return (
    <LinearGradient colors={['#B2ECF5', '#6CD4E5']} style={[styles.container, rootStyles.center]}>
      <Image
        resizeMode="contain"
        source={LOGO}
        style={{
          width: appConfig.sizes.dW + 130,
          height: appConfig.sizes.dW + 130 / 1.5,
          marginTop: 30,
        }}
      />
    </LinearGradient>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appConfig.colors.white,
  },
});
