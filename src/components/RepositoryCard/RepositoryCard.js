import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import toDateString from '../../utils/toDateString';
import Style from '../../styles';
import { Box, AppText } from '..';

const RepositoryCard = ({
  rank,
  slug,
  description,
  language,
  stars,
  forks,
  githubCreatedAt,
  onPressRepository,
  onPressLangauge,
}) => (
  <TouchableOpacity activeOpacity={0.8} onPress={() => onPressRepository()}>
    <Box>
      <View>
        <AppText style={styles.name}>{`#${rank} ${slug}`}</AppText>
      </View>
      <View>
        <AppText style={styles.description}>{description}</AppText>
      </View>
      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => onPressLangauge()}>
            <AppText style={[styles.metaItem, styles.language]}>{language.name}</AppText>
          </TouchableOpacity>
        </View>
        <View style={styles.metaItem}>
          <AppText className={styles.metaItem}>{`${stars} Star`}</AppText>
        </View>
        <View style={styles.metaItem}>
          <AppText className={styles.metaItem}>{`${forks} Fork`}</AppText>
        </View>
        {githubCreatedAt && (
          <View style={styles.metaItem}>
            <AppText className={styles.metaItem}>{toDateString(githubCreatedAt)}</AppText>
          </View>
        )}
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
    flexDirection: 'column',
  },
  metaItem: {
    fontWeight: '400',
    marginBottom: Style.variables.fontSizes.xxSmall / 4,
    marginRight: Style.variables.fontSizes.xxSmall / 2,
  },
  language: {
    fontWeight: '500',
    color: Style.colors.secondaryColor,
  },
});

RepositoryCard.defaultProps = {
  rank: undefined,
  description: '',
  githubCreatedAt: undefined,
};

export default RepositoryCard;
