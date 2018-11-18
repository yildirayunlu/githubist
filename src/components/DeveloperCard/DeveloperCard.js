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
  repoText,
  location,
  onPressUser,
  onPressLocation,
}) => (
  <Box>
    <View style={styles.profile}>
      <TouchableOpacity
        onPress={() => {
          onPressUser();
        }}
        activeOpacity={0.8}
        style={styles.avatar}
      >
        <Avatar small source={{ uri: profilePicture }} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          onPressUser();
        }}
        activeOpacity={0.8}
        style={styles.info}
      >
        <AppText style={styles.name}>{`#${rank} ${name}`}</AppText>
        <AppText style={styles.username}>{username}</AppText>
        {company && <AppText style={styles.company}>{company}</AppText>}
      </TouchableOpacity>
    </View>
    <View style={styles.meta}>
      {location && (
        <TouchableOpacity
          onPress={() => {
            onPressLocation();
          }}
          activeOpacity={0.8}
        >
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
        <AppText className={styles.metaItem}>{`${repositoriesCount} ${repoText}`}</AppText>
      )}
    </View>
  </Box>
);

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
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
  repoText: 'Repo',
};

export default DeveloperCard;
