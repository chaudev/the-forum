import React, {useState, useEffect, useLayoutEffect, useReducer, useRef, FC} from 'react';
import {View, SafeAreaView, Image, Button, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import rootStyles from '~/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ExampleProps} from '../types/example';

const textExample = 'Example Screen';

const ExampleScreen: FC<ExampleProps> = () => {
  const navigation = useNavigation<ExampleProps['navigation']>();
  const route = useRoute<ExampleProps['route']>();
  const focus = useIsFocused();
  const insets = useSafeAreaInsets();

  const [state, setState] = useState('');

  useLayoutEffect(() => {
    return setState('foward me!');
  }, []);

  const goToFeed = () => {
    navigation.navigate('Feed');
  };

  return (
    <View style={[styles.container, rootStyles.center]}>
      <Text onPress={() => goToFeed} style={styles.text}>
        {textExample + ' ' + state}
      </Text>
    </View>
  );
};

export default ExampleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});
