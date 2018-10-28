import React from 'react';
import { View, StyleSheet } from 'react-native';

import Style from '../../styles';

const Box = ({ children, style }) => {
  const defaultStyle = [styles.box];

  return <View style={[defaultStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: Style.variables.spacing.large,
    borderWidth: 1,
    borderColor: Style.colors.textMuted,
    backgroundColor: Style.colors.white,
    borderRadius: 2,
    shadowColor: '#d5d5d6',
    marginBottom: Style.variables.spacing.normal,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
});

export default Box;
