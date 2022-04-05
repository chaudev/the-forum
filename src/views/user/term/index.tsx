import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Linking} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import {CustomHeader} from '~/components';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {HTMLView} from '~/components';
import {hideBottomTabs} from '~/store/reducers/bottomTabSlice';

const TermScreen = () => {
  // @ts-ignore
  const term = useSelector(state => state.globalState.term);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const focused = useIsFocused();

  useEffect(() => {
    if (focused) {
      dispatch(hideBottomTabs());
    }
  }, [focused]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="dark-content" />
      <View style={{paddingTop: insets.top}} />
      <CustomHeader title="Điều khoản" onPressLeft={handleGoBack} />

      <View style={[styles.container, {padding: 16, paddingTop: 0, paddingBottom: 0}]}>
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'c6c6c6'}}>
          <View style={{backgroundColor: '#fff'}}>
            <HTMLView
              value={term?.TermContent}
              onLinkPress={(url: string) => Linking.openURL(appConfig.hostURL + url)}
              stylesheet={htmlStyles}
            />
            <View style={{height: 20}} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default TermScreen;

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

const htmlStyles = StyleSheet.create({
  a: {
    fontFamily: appConfig.fonts.Medium,
    color: appConfig.colors.primary,
    marginTop: 5,
    fontSize: 14,
  },
  p: {
    fontFamily: appConfig.fonts.Regular,
    fontSize: 14,
    lineHeight: 21,
  },
  span: {
    fontFamily: appConfig.fonts.Regular,
    fontSize: 14,
  },
});
