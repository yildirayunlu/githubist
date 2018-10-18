import React from 'react';
import { StyleSheet } from 'react-native';

import { AppText } from '..';
import Style from '../../styles';

const Heading = ({ children, h1, h2, h3, h4, h5, h6, style, ...otherProps }) => {
  const defaultStyle = [styles.default];

  if (style) {
    defaultStyle.push([style]);
  }
  if (h1) {
    defaultStyle.push([styles.h1]);
  }
  if (h2) {
    defaultStyle.push([styles.h2]);
  }
  if (h3) {
    defaultStyle.push([styles.h3]);
  }
  if (h4) {
    defaultStyle.push([styles.h4]);
  }
  if (h5) {
    defaultStyle.push([styles.h5]);
  }
  if (h6) {
    defaultStyle.push([styles.h6]);
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
    marginVertical: Style.variables.spacing.large,
  },
  h1: {
    fontSize: Style.variables.headingSizes.h1,
  },
  h2: {
    fontSize: Style.variables.headingSizes.h2,
  },
  h3: {
    fontSize: Style.variables.headingSizes.h3,
    marginVertical: Style.variables.spacing.normal,
  },
  h4: {
    fontSize: Style.variables.headingSizes.h4,
    marginVertical: Style.variables.spacing.small,
  },
  h5: {
    fontSize: Style.variables.headingSizes.h5,
    marginVertical: Style.variables.spacing.xSmall,
  },
  h6: {
    fontSize: Style.variables.headingSizes.h6,
    marginVertical: Style.variables.spacing.xxSmall,
  },
});

export default Heading;
