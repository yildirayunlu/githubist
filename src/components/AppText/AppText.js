import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Style from '../../styles';

const AppText = ({ children, style, ...otherProps }) => {
  const defaultStyle = [styles.default];

  return (
    <Text style={[defaultStyle, style]} {...otherProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    color: Style.colors.textColor,
  },
});

export default AppText;
