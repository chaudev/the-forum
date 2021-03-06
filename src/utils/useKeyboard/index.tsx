import React, {useState, useRef, useEffect} from 'react';
import {Keyboard} from 'react-native';

export function useKeyboard(): boolean {
  const [isOpen, setIsOpen] = useState(false);
  const keyboardShowListener = useRef(null);
  const keyboardHideListener = useRef(null);

  useEffect(() => {
    // @ts-ignore
    keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () => setIsOpen(true));
    // @ts-ignore
    keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () => setIsOpen(false));

    return () => {
      // @ts-ignore
      keyboardShowListener.current.remove();
      // @ts-ignore
      keyboardHideListener.current.remove();
    };
  });

  return isOpen;
}
