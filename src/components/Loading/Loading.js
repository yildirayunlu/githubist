import React from 'react';
import { View, StyleSheet } from 'react-native';

import Style from '../../styles';
import { AppText } from '..';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <AppText>Yükleniyor...</AppText>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loading: {
    marginVertical: Style.variables.spacing.normal,
    alignSelf: 'center',
  },
});
