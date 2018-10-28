import React from 'react';
import { StyleSheet } from 'react-native';

import Style from '../../styles';
import { Box, AppText } from '..';

const Highlight = ({ title, subject }) => (
  <Box style={styles.container}>
    <AppText style={styles.subject}>{subject}</AppText>
    <AppText style={styles.title}>{title}</AppText>
  </Box>
);

export default Highlight;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: Style.variables.spacing.small,
  },
  subject: {
    fontSize: Style.variables.headingSizes.h3,
    fontWeight: '700',
    marginBottom: Style.variables.spacing.xSmall,
  },
  title: {
    fontSize: Style.variables.fontSizes.normal,
  },
});
