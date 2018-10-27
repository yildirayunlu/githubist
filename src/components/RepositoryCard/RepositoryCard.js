import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import Style from '../../styles';
import { Box, AppText } from '..';

const RepositoryCard = ({ rank, slug, description, language, stars, forks, githubCreatedAt }) => (
  <TouchableOpacity activeOpacity={0.8}>
    <Box>
      <View>
        <AppText style={styles.name}>{`#${rank} ${slug}`}</AppText>
      </View>
      <View>
        <AppText style={styles.description}>{description}</AppText>
      </View>
      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <TouchableOpacity activeOpacity={0.8}>
            <AppText style={[styles.metaItem, styles.language]}>{language.name}</AppText>
          </TouchableOpacity>
        </View>
        <View style={styles.metaItem}>
          <AppText className={styles.metaItem}>{`${stars} Star`}</AppText>
        </View>
        <View style={styles.metaItem}>
          <AppText className={styles.metaItem}>{`${forks} Fork`}</AppText>
        </View>
        <View style={styles.metaItem}>
          <AppText className={styles.metaItem}>{githubCreatedAt}</AppText>
        </View>
      </View>
    </Box>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  name: {
    fontSize: Style.variables.fontSizes.normal,
    fontWeight: '500',
  },
  meta: {
    marginTop: Style.variables.spacing.xSmall,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  metaItem: {
    fontWeight: '400',
    marginBottom: Style.variables.fontSizes.xxSmall / 4,
    marginRight: Style.variables.fontSizes.xxSmall,
  },
  language: {
    fontWeight: '500',
    color: Style.colors.secondaryColor,
  },
});

RepositoryCard.defaultProps = {
  rank: undefined,
  description: '',
  githubCreatedAt: '',
};

export default RepositoryCard;
