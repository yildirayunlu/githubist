import React from 'react';
import { StyleSheet } from 'react-native';

import { AppText } from '..';
import Style from '../../styles';

const H3 = ({ children, style, ...otherProps }) => {
  const defaultStyle = [styles.default];

  if (style) {
    defaultStyle.push([style]);
  }

  return (
    <AppText style={[defaultStyle]} {...otherProps}>
      {children}
    </AppText>
  );
};

const styles = StyleSheet.create({
  default: {
    fontWeight: '400',
    marginVertical: Style.variables.spacing.normal,
    fontSize: Style.variables.headingSizes.h3,
  },
});

export default H3;
