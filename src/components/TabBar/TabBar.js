import React from 'react';
import { StyleSheet, View } from 'react-native';

import Style from '../../styles';

const TabBar = ({ children }) => <View style={styles.tabbar}>{children}</View>;

const styles = StyleSheet.create({
  tabbar: {
    marginVertical: Style.variables.spacing.normal,
  },
});

export default TabBar;
