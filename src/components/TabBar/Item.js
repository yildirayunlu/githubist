import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Style from '../../styles';
import { AppText } from '..';

const Item = ({ children, itemPressed }) => (
  <TouchableOpacity onPress={itemPressed}>
    <AppText style={styles.item}>{children}</AppText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    fontSize: Style.variables.fontSizes.normal,
    marginBottom: Style.variables.spacing.xSmall,
    color: Style.colors.blackColor,
    fontWeight: '500',
  },
});

export default Item;
