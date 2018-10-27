import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import Style from '../../styles';
import { Box, AppText } from '..';

const LanguageCard = ({ rank, name, totalRepositories, totalDevelopers }) => (
  <TouchableOpacity activeOpacity={0.8}>
    <Box>
      <View style={styles.name}>
        <AppText style={styles.name}>{`#${rank} ${name}`}</AppText>
      </View>
      <View style={styles.meta}>
        {typeof totalDevelopers !== 'undefined' && (
          <AppText className={styles.metaItem}>{`${totalDevelopers} Geliştirci`}</AppText>
        )}
        <AppText className={styles.metaItem}>{`${totalRepositories} Repo`}</AppText>
      </View>
    </Box>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  name: {
    fontSize: Style.variables.fontSizes.normal,
    marginBottom: Style.variables.spacing.xxSmall,
    fontWeight: '500',
  },
  meta: {
    alignSelf: 'flex-start',
  },
  metaItem: {
    fontWeight: '400',
    marginBottom: Style.variables.fontSizes.xxSmall / 4,
  },
});

LanguageCard.defaultProps = {
  rank: undefined,
  language: undefined,
  totalDevelopers: undefined,
};

export default LanguageCard;
