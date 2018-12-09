import React from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Routes } from '..';
import Styles from '../../styles';
import toDateString from '../../utils/toDateString';
import {
  Container,
  Avatar,
  TabBar,
  TabBarItem,
  AppText,
  Loading,
  ErrorState,
  Highlight,
} from '../../components';

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

              <TabBar>
                <TabBarItem isActive>Genel Bilgiler</TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.DeveloperRepositories,
                      backButtonTitle: '',
                      passProps: {
                        username: data.developer.username,
                      },
                    });
                  }}
                >
                  Meşhur Repolar
                </TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.DeveloperLanguages,
                      backButtonTitle: '',
                      passProps: { username: data.developer.username },
                    });
                  }}
                >
                  Dil Kullanımı
                </TabBarItem>
                <TabBarItem
                  itemPressed={() =>
                    Linking.openURL(`https://github.com/${data.developer.username}`)
                  }
                >
                  Github&apos;da Görüntüle
                </TabBarItem>
              </TabBar>
              <View>
                <Highlight subject={data.developer.stats.rank} title="Github.ist Sıralaması" />
                <Highlight subject={data.developer.stats.locationRank} title="Şehir Sıralaması" />
                <Highlight subject={data.developer.totalStarred} title="Toplam Star'lanma" />
                <Highlight subject={data.developer.stats.repositoriesCount} title="Repo" />
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
