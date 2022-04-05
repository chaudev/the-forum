import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar, FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import {CustomHeader} from '~/components';
import {hideBottomTabs} from '~/store/reducers/bottomTabSlice';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {UserProps} from '~/views/types/user';
import RenderItemFAQ from './renderItem';

const FAQScreen = () => {
  // @ts-ignore
  const FAQ = useSelector(state => state.globalState.FAQ);
  const navigation = useNavigation<UserProps['navigation']>();
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
      <CustomHeader title="Câu hỏi thường gặp" onPressLeft={handleGoBack} />
      <View style={[styles.container, {padding: 16, paddingTop: 0, paddingBottom: 0}]}>
        <FlatList
          data={FAQ}
          renderItem={({item}) => <RenderItemFAQ item={item} />}
          keyExtractor={(item: any) => {
            return item.ID;
          }}
        />
      </View>
    </View>
  );
};

export default FAQScreen;

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
