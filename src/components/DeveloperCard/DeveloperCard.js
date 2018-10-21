import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import Style from '../../styles';
import { Box, AppText, Avatar } from '..';

const DeveloperCard = ({
  rank,
  name,
  username,
  profilePicture,
  company,
  followers,
  totalStarred,
  repositoriesCount,
  location,
}) => (
  <TouchableOpacity activeOpacity={0.8}>
    <Box>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Avatar small source={{ uri: profilePicture }} />
        </View>

        <View style={styles.info}>
          <AppText style={styles.name}>{`#${rank} ${name}`}</AppText>
          <AppText style={styles.username}>{username}</AppText>
          {company && <AppText style={styles.company}>{company}</AppText>}
        </View>
      </View>
      <View style={styles.meta}>
        {location && (
          <TouchableOpacity activeOpacity={0.8}>
            <AppText style={[styles.metaItem, styles.location]}>{location}</AppText>
          </TouchableOpacity>
        )}

        {typeof totalStarred !== 'undefined' && (
          <AppText className={styles.metaItem}>{`${totalStarred} Star'lanma`}</AppText>
        )}
        {typeof followers !== 'undefined' && (
          <AppText className={styles.metaItem}>{`${followers} Takipçi`}</AppText>
        )}
        {typeof repositoriesCount !== 'undefined' && (
          <AppText className={styles.metaItem}>{`${repositoriesCount} Repo`}</AppText>
        )}
      </View>
    </Box>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Style.variables.spacing.normal,
  },
  avatar: {
    marginRight: Style.variables.spacing.normal,
  },
  info: {},
  name: {
    fontSize: Style.variables.fontSizes.normal,
    fontWeight: '500',
  },
  meta: {
    alignSelf: 'flex-start',
  },
  metaItem: {
    fontWeight: '400',
    marginBottom: Style.variables.fontSizes.xxSmall / 4,
  },
  location: {
    fontWeight: '500',
    color: Style.colors.secondaryColor,
  },
});

DeveloperCard.defaultProps = {
  rank: undefined,
  followers: undefined,
  totalStarred: undefined,
  location: undefined,
  company: '',
  repositoriesCount: undefined,
};

export default DeveloperCard;