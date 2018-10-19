import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Style from '../../styles';
import { Box, AppText } from '..';

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
  githubCreatedAt,
}) => (
  <TouchableOpacity activeOpacity={0.7}>
    <Box>
      <AppText>Developer Name</AppText>
    </Box>
  </TouchableOpacity>
);

const styles = StyleSheet.create({});

DeveloperCard.defaultProps = {
  rank: undefined,
  followers: undefined,
  totalStarred: undefined,
  location: undefined,
  githubCreatedAt: '',
  company: '',
  repositoriesCount: undefined,
  repoText: 'Repo',
};

export default DeveloperCard;
