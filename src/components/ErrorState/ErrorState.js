import React from 'react';
import { View, StyleSheet } from 'react-native';

import Style from '../../styles';
import { AppText } from '..';

const ErrorState = () => (
  <View style={styles.error}>
    <AppText>Bir hata meydana geldi.</AppText>
  </View>
);

export default ErrorState;

const styles = StyleSheet.create({
  error: {
    marginVertical: Style.variables.spacing.normal,
    alignSelf: 'center',
  },
});
