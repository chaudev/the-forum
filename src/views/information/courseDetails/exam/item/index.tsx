import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import {appConfig} from '~/appConfig';
import {icons} from '~/lib';
import rootStyles from '~/styles';

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

const ExamItem = (props: any) => {
  const {item} = props;
  const [show, setShow] = useState(false);

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
          <Text style={[styles.title]}>{item?.ExamName}</Text>
          <Text style={[styles.content, {color: '#7C7C7C', marginTop: 5}]}>{item?.Note}</Text>
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
          <CardItem title="Nghe hiểu: " content={`${item?.Listening}`} />
          <CardItem title="Ngữ pháp: " content={`${item?.Speaking}`} />
          <CardItem title="Đọc hiểu: " content={`${item?.Reading}`} />
          <CardItem title="Từ vựng: " content={`${item?.Writing}`} />
        </>
      )}
    </TouchableOpacity>
  );
};

export default ExamItem;

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
