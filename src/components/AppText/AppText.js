import React from 'react';
import { Text, StyleSheet } from 'react-native';

const AppText = ({ children, bold, style, ...otherProps }) => {
  const defaultStyle = [styles.default];

  if (bold) {
    defaultStyle.push(styles.bold);
  }

  return (
    <Text style={[defaultStyle, style]} {...otherProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    color: '#000',
  },
  bold: {
    fontWeight: '500',
  },
});

export default AppText;
