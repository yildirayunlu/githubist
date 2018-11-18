import React from 'react';
import { StyleSheet } from 'react-native';

import { AppText } from '..';
import Style from '../../styles';

const ScreenHeading = ({ children, ...otherProps }) => (
  <AppText style={styles.screenHeading} {...otherProps}>
    {children}
  </AppText>
);

const styles = StyleSheet.create({
  screenHeading: {
    fontWeight: '400',
    marginVertical: Style.variables.spacing.normal,
    fontSize: Style.variables.fontSizes.normal,
  },
});

export default ScreenHeading;
