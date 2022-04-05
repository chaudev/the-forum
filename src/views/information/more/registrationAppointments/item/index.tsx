import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import {icons} from '~/lib';
import rootStyles from '~/styles';
import {getStrDate, isNull, parseToMoney} from '~/utils';

const CardItem = (props: any) => {
  const {title, content} = props;
  return (
    <View style={styles.mainItem}>
      <Text style={{paddingRight: 10, marginLeft: 16}}>•</Text>
      <Text style={styles.content}>{title}</Text>
      <Text style={[styles.content, {fontFamily: appConfig.fonts.Medium}]}>{content}</Text>
    </View>
  );
};

const RegistrationItem = (props: any) => {
  const {item} = props;
  const [show, setShow] = useState(false);

  // @ts-ignore
  const isStore = useSelector(state => state.isStore);

  return (
    <TouchableOpacity
      onPress={() => setShow(!show)}
      activeOpacity={0.8}
      style={[
        styles.container,
        rootStyles.boxShadow,
        {
          marginTop: 16,
        },
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Text style={[styles.title]}>Lớp: {item?.ClassName}</Text>
          <Text style={[styles.content, {color: '#7C7C7C', marginTop: 5}]}>
            Ngày: {getStrDate(item?.CreatedDate)}
          </Text>
        </View>
        <Image
          resizeMode="contain"
          source={!show ? icons.right : icons.down}
          style={{width: 20, height: 20}}
        />
      </View>

      {show && (
        <>
          <View
            style={{
              backgroundColor: 'rgba(170, 180, 175, 0.4)',
              height: 1,
              marginTop: 16,
              marginHorizontal: -16,
            }}
          />
          <CardItem title="Trung tâm: " content={`${item?.SchoolName}`} />
          <CardItem title="Ca học: " content={`${item?.StudyName}`} />
          <CardItem title="Người đăng ký: " content={`${item?.StudentName}`} />
          <CardItem title="Điện thoại: " content={`${item?.StudentPhone}`} />

          {isStore.status && (
            <>
              <CardItem title="Học phí: " content={`${parseToMoney(item?.ClassPrice)} VND`} />
              <CardItem title="Đã thanh toán: " content={`${parseToMoney(item?.Deposit)} VND`} />
              <CardItem title="Hình thức: " content={`${item?.PaymentMethodName}`} />
            </>
          )}
          <CardItem title="Ghi chú: " content={`${isNull(item?.Note) ? 'Không có' : item?.Note}`} />
        </>
      )}
    </TouchableOpacity>
  );
};

export default RegistrationItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 17,
    fontFamily: appConfig.fonts.Regular,
  },
  content: {
    fontSize: 14,
    fontFamily: appConfig.fonts.Regular,
  },
  mainItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  btnBG: {
    backgroundColor: '#F5F5F5',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
});
