import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  Linking,
  FlatList,
  RefreshControl,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {hideBottomTabs} from '~/store/reducers/bottomTabSlice';
import {Empty, HomeHeader} from '~/components';
import {parentsApi} from '~/api/parents';
import {setPaied} from '~/store/reducers/globalState';
import {isNull, parseToMoney, wait, logOut} from '~/utils';
import PaiedItem from './item';
import {InformationProps} from '~/views/types/information';
import {timeOutToken} from '~/utils/function';

const PaiedsScreen = () => {
  // @ts-ignore
  const paieds = useSelector(state => state.globalState.paieds);
  const navigation = useNavigation<InformationProps['navigation']>();
  const focused = useIsFocused();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPaieds();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const getPaieds = async () => {
    try {
      const response = await parentsApi.getPaymentHistory();
      response.status == 200 && dispatch(setPaied(response.data.data));
    } catch (error) {
      console.error(error);
      timeOutToken({error: error, onPress: () => logOut(dispatch)});
    }
  };

  useEffect(() => {
    if (focused) {
      dispatch(hideBottomTabs());
    }
  }, [focused]);

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="dark-content" />
      <HomeHeader title="Lịch sử thanh toán" showBack={true} />
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <FlatList
          data={paieds.PaymentHistory}
          numColumns={1}
          horizontal={false}
          ListEmptyComponent={<Empty />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({item}) => (
            <PaiedItem
              onPress={(e: any) => Linking.openURL(`${appConfig.hostURL}${e?.LinkDetail}`)}
              data={paieds.PaymentHistory}
              item={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any) => {
            return item.ID;
          }}
          ListFooterComponent={<View style={{height: 10}} />}
        />
      </View>
      <View
        style={{
          width: appConfig.sizes.dW,
          padding: 16,
          paddingBottom: 14,
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: 'rgba(84, 84, 88, 0.2)',
          borderTopWidth: 1,
        }}>
        <View style={{flex: 1}}>
          <Text style={{fontFamily: appConfig.fonts.Regular}}>Tổng thanh toán</Text>
          <Text style={{fontFamily: appConfig.fonts.Medium, fontSize: 16}}>
            {isNull(paieds?.TotalPriceLeft) ? '0' : parseToMoney(paieds?.TotalPriceLeft)} VND
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('REFUND')}
          activeOpacity={0.5}
          style={{
            backgroundColor: appConfig.colors.primary,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            borderRadius: 7,
          }}>
          <Text style={{fontFamily: appConfig.fonts.Regular, color: '#fff'}}>
            Lịch sử hoàn tiền
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaiedsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textTitle: {
    fontSize: 20,
    flex: 1,
    fontFamily: appConfig.fonts.Regular,
    color: '#000',
  },
  moreNews: {
    height: 32,
    marginTop: 15,
    borderLeftWidth: 3,
    borderLeftColor: appConfig.colors.primary,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },

  main: {
    width: appConfig.sizes.dW,
    height: 350,
    marginTop: -350,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: 16,
  },
  mainHtml: {
    width: '100%',
    backgroundColor: appConfig.colors.white,
    marginTop: -50,
    borderRadius: 24,
    padding: 16,
    paddingTop: 24,
    paddingBottom: 70,
  },
  sub: {
    fontSize: 12,
    color: '#AAB4AF',
    marginTop: 5,
    fontFamily: appConfig.fonts.Regular,
  },
  title: {
    marginBottom: 16,
    fontSize: 20,
    color: '#fff',
    fontFamily: appConfig.fonts.Medium,
  },
  content: {
    marginBottom: 24,
    fontSize: 15,
    color: '#fff',
    fontFamily: appConfig.fonts.Regular,
  },
  btnBack: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    marginBottom: -50,
    zIndex: 999,
    paddingLeft: 12,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  item: {
    width: '100%',
    height: 72,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
