import React from 'react';
import { View, StyleSheet } from 'react-native';

import Style from '../../styles';

const Container = ({ children }) => <View style={styles.container}>{children}</View>;

const styles = StyleSheet.create({
  container: {
    margin: Style.variables.spacing.normal,
  },
});

export default Container;
