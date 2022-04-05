import React from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
import {appConfig} from '~/appConfig';
import {tabIcons} from '~/lib';
import appRouter from '~/navigators/appRouter';

const TabItem = (props: any) => {
  const {color, tab, text, name} = props;
  const actived = color === appConfig.colors.primary ? true : false;

  return (
    <View
      style={{
        width: appConfig.sizes.dW / tab,
        flex: 1,
      }}>
      <View
        style={[
          {
            flex: 1,
            backgroundColor: appConfig.colors.white,
            width: appConfig.sizes.dW / tab,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          {name == appRouter.TABS.HOME && (
            <Image
              resizeMode="contain"
              source={actived ? tabIcons.activated.HOME : tabIcons.normal.HOME}
              style={{width: 20, height: 20}}
            />
          )}
          {name == appRouter.TABS.COURSE && (
            <Image
              resizeMode="contain"
              source={actived ? tabIcons.activated.COURSE : tabIcons.normal.COURSE}
              style={{width: 20, height: 20}}
            />
          )}
          {name == appRouter.TABS.INFORMATION && (
            <Image
              resizeMode="contain"
              source={actived ? tabIcons.activated.INFORMATION : tabIcons.normal.INFORMATION}
              style={{width: 20, height: 20}}
            />
          )}
          {name == appRouter.TABS.USER && (
            <Image
              resizeMode="contain"
              source={actived ? tabIcons.activated.USER : tabIcons.normal.USER}
              style={{width: 20, height: 20}}
            />
          )}
        </View>

        <Text
          style={{
            color: actived ? appConfig.colors.primary : '#1C1C1C',
            fontSize: 9,
            fontFamily: appConfig.fonts.Medium,
            marginTop: 4,
          }}>
          {text}
        </Text>
      </View>
    </View>
  );
};

export default TabItem;
