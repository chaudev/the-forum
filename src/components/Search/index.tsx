import React, {useState} from 'react';
import {View, Image, StyleSheet, TextInput} from 'react-native';
import {appConfig} from '~/appConfig';
import {isNull} from '~/utils';

const IMG_SEARCH = require('~/assets/icons/search.png');

const Search = (props: any) => {
  const {placeholder, onSubmit} = props;

  const [text, setText] = useState('');

  return (
    <View style={[styles.container]}>
      <Image resizeMode="contain" source={IMG_SEARCH} style={{width: 24, height: 24}} />
      <TextInput
        value={text}
        onChangeText={e => setText(e)}
        placeholder={placeholder || ''}
        placeholderTextColor={appConfig.colors.placeholder}
        style={styles.input}
        onEndEditing={() => !isNull(onSubmit) && onSubmit(text)}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(84, 84, 88, 0.2)',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    backgroundColor: '#F9FAFA',
  },
  input: {
    fontSize: 17,
    color: '#000',
    flex: 1,
    paddingHorizontal: 14,
    fontFamily: appConfig.fonts.Regular,
  },
});
