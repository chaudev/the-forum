import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {appConfig} from '~/appConfig';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RenderItemFAQ = (props: any) => {
  const {item} = props;
  // @ts-ignore
  const FAQ = useSelector(state => state.globalState.FAQ);

  const [isShow, setIsShow] = useState(false);

  const isFirst = (item: any) => {
    return FAQ.indexOf(item) == 0 ? true : false;
  };

  return (
    <TouchableOpacity
      onPress={() => setIsShow(!isShow)}
      activeOpacity={0.5}
      style={{
        width: '100%',
        paddingVertical: 10,
        borderTopWidth: isFirst(item) ? 0 : 1,
        borderColor: 'rgba(84, 84, 88, 0.2)',
      }}>
      <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 16, fontFamily: appConfig.fonts.Medium}}>
            {item?.TitleQuestion}
          </Text>
        </View>
        <MaterialIcons
          name={!isShow ? 'keyboard-arrow-right' : 'keyboard-arrow-down'}
          size={26}
          color="#000"
        />
      </View>
      {isShow && (
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: appConfig.fonts.Regular,
              color: '#7C7C7C',
              marginTop: 10,
            }}>
            {item?.AnswerContent}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RenderItemFAQ;
