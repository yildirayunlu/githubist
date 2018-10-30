import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Routes } from '..';
import Styles from '../../styles';
import toDateString from '../../utils/toDateString';
import { Container, Avatar, AppText, Loading, ErrorState, Highlight } from '../../components';

const Developer = props => {
  const query = gql`
    query($username: String!) {
      developer(username: $username) {
        id
        name
        username
        avatarUrl
        bio
        githubUrl
        githubCreatedAt
        totalStarred
        followers
        following
        location {
          name
        }
        languageUsage(limit: 9999, offset: 0) {
          language {
            id
            name
            slug
          }
          repositoriesCount
        }
        stats {
          rank
          locationRank
          repositoriesCount
        }
      }
    }
  `;

  const { username, navigator } = props;

  return (
    <Query query={query} variables={{ username }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading />;
        }

        if (error || !data || !data.developer) {
          return <ErrorState />;
        }

        return (
          <ScrollView>
            <Container>
              <View style={styles.personal}>
                <Avatar source={{ uri: data.developer.avatarUrl }} />
                <AppText style={styles.name}>{data.developer.name}</AppText>
                <AppText style={styles.username}>{data.developer.username}</AppText>
                {data.developer.bio && <AppText style={styles.bio}>{data.developer.bio}</AppText>}
              </View>
              <View>
                <Highlight subject={data.developer.stats.rank} title="Github.ist Sıralaması" />
                <Highlight subject={data.developer.stats.locationRank} title="Şehir Sıralaması" />
                <Highlight subject={data.developer.totalStarred} title="Toplam Star'lanma" />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigator.push({
                      ...Routes.DeveloperRepositories,
                      title: "Repo'ları",
                      passProps: { username: data.developer.username },
                    });
                  }}
                >
                  <Highlight subject={data.developer.stats.repositoriesCount} title="Repo" />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigator.push({
                      ...Routes.DeveloperLanguages,
                      title: 'Dil Kullanımı',
                      passProps: { username: data.developer.username },
                    });
                  }}
                >
                  <Highlight subject={data.developer.languageUsage.length} title="Dil Kullanımı" />
                </TouchableOpacity>
                <Highlight subject={data.developer.followers} title="Takipçi" />
                <Highlight subject={data.developer.following} title="Takip Edilen" />
                <Highlight subject={data.developer.location.name} title="Şehir" />
                <Highlight
                  subject={toDateString(data.developer.githubCreatedAt)}
                  title="Kayıt Tarihi"
                />
              </View>
            </Container>
          </ScrollView>
        );
      }}
    </Query>
  );
};

const styles = StyleSheet.create({
  personal: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: Styles.variables.spacing.normal,
    marginBottom: Styles.variables.spacing.normal,
  },
  name: {
    fontSize: Styles.variables.headingSizes.h2,
    fontWeight: '700',
  },
  username: {
    fontSize: Styles.variables.headingSizes.h4,
    fontWeight: '500',
    marginBottom: Styles.variables.spacing.xSmall,
  },
  bio: {
    paddingHorizontal: Styles.variables.spacing.normal,
  },
});

export default Developer;
