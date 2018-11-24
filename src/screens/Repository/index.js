import React from 'react';
import { View, ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import toDateString from '../../utils/toDateString';
import { Routes } from '..';
import {
  Container,
  AppText,
  TabBar,
  TabBarItem,
  ScreenHeading,
  Loading,
  ErrorState,
  Highlight,
} from '../../components';

const Repository = props => {
  const query = gql`
    query($slug: String!) {
      repository(slug: $slug) {
        id
        slug
        description
        language {
          name
          slug
        }
        stars
        forks
        developer {
          username
          name
          avatarUrl
        }
        stats {
          rank
          languageRank
        }
        githubUrl
        githubCreatedAt
      }
    }
  `;

  const { slug, navigator } = props;

  return (
    <Query query={query} variables={{ slug }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading />;
        }

        if (error || !data || !data.repository) {
          return <ErrorState />;
        }

        return (
          <ScrollView>
            <Container>
              <ScreenHeading>
                {data.repository.description ? (
                  <AppText>{data.repository.description}</AppText>
                ) : (
                  <AppText>{data.repository.slug}</AppText>
                )}
              </ScreenHeading>

              <TabBar>
                <TabBarItem isActive>Genel Bilgiler</TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.Developer,
                      title: data.repository.developer.name,
                      backButtonTitle: '',
                      passProps: { username: data.repository.developer.username },
                    });
                  }}
                >
                  Geliştiriciyi Görüntüle
                </TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.Language,
                      title: data.repository.language.name,
                      backButtonTitle: '',
                      passProps: { slug: data.repository.language.slug },
                    });
                  }}
                >
                  Dili Görüntüle
                </TabBarItem>
              </TabBar>
              <View>
                <Highlight subject={data.repository.language.name} title="Dil" />
                <Highlight subject={data.repository.stats.rank} title="Github.ist Sıralaması" />
                <Highlight subject={data.repository.stats.languageRank} title="Dil Sıralaması" />
                <Highlight subject={data.repository.stars} title="Star" />
                <Highlight subject={data.repository.forks} title="Fork" />
                <Highlight
                  subject={toDateString(data.repository.githubCreatedAt)}
                  title="Oluşturma Tarihi"
                />
              </View>
            </Container>
          </ScrollView>
        );
      }}
    </Query>
  );
};

export default Repository;
