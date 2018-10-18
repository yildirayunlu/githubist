import React from 'react';
import { TouchableOpacity } from 'react-native';

import { AppText } from '..';

const Item = ({ children, itemPressed }) => (
  <TouchableOpacity onPress={itemPressed}>
    <AppText>{children}</AppText>
  </TouchableOpacity>
);

export default Item;
