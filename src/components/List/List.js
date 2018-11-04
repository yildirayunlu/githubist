import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import Style from '../../styles';

const List = ({ children, ...otherProps }) => (
  <FlatList style={styles.list} {...otherProps}>
    {children}
  </FlatList>
);

export default List;

const styles = StyleSheet.create({
  list: {
    paddingVertical: Style.variables.spacing.normal,
  },
});
