import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Style from '../../styles';
import { AppText } from '..';

const Item = ({ children, isActive, itemPressed }) => {
  const itemStyle = [styles.item];

  if (isActive) {
    itemStyle.push([styles.isActive]);
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={itemPressed}>
      <AppText style={itemStyle}>{children}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    fontSize: Style.variables.fontSizes.normal,
    marginBottom: Style.variables.spacing.xSmall,
    color: Style.colors.textMuted,
    fontWeight: '400',
  },
  isActive: {
    color: Style.colors.blackColor,
  },
});

Item.defaultProps = {
  isActive: undefined,
};

export default Item;
