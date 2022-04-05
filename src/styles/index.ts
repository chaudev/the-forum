import React from 'react';
import {StyleSheet} from 'react-native';

const rootStyles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  redBackground: {
    backgroundColor: 'red',
  },
  greenBackground: {
    backgroundColor: 'green',
  },
  blueBackground: {
    backgroundColor: 'blue',
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  boxShadow: {
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default rootStyles;
