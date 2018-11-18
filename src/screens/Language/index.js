import React from 'react';
import { View, ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Routes } from '..';
import {
  Container,
  TabBar,
  TabBarItem,
  ScreenHeading,
  Loading,
  ErrorState,
  Highlight,
} from '../../components';

const Language = props => {
  const query = gql`
    query($slug: String!) {
      language(slug: $slug) {
        id
        name
        slug
        totalRepositories
        totalDevelopers
        totalStars
        stats {
          rank
          developersCountRank
          repositoriesCountRank
        }
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

        if (error || !data || !data.language) {
          return <ErrorState />;
        }

        return (
          <ScrollView>
            <Container>
              <ScreenHeading>
                {`Bu dil için toplam ${data.language.totalDevelopers} geliştrici ve ${
                  data.language.totalRepositories
                } repo bulunuyor.`}
              </ScreenHeading>
              <TabBar>
                <TabBarItem isActive>Genel Bilgiler</TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.LanguageRepositories,
                      backButtonTitle: '',
                      passProps: { slug: data.language.slug },
                    });
                  }}
                >
                  Meşhur Repolar
                </TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.LanguageDevelopers,
                      backButtonTitle: '',
                      passProps: { slug: data.language.slug },
                    });
                  }}
                >
                  Geliştirici Kullanımı
                </TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.LanguageLocation,
                      backButtonTitle: '',
                      passProps: { slug: data.language.slug },
                    });
                  }}
                >
                  Şehir Dağılımı
                </TabBarItem>
              </TabBar>
              <View>
                <Highlight subject={data.language.stats.rank} title="Github.ist Sıralaması" />
                <Highlight
                  subject={data.language.stats.developersCountRank}
                  title="Geliştirici Sayısı Sıralaması"
                />
                <Highlight
                  subject={data.language.stats.repositoriesCountRank}
                  title="Repo Sayısı Sıralaması"
                />
                <Highlight subject={data.language.totalDevelopers} title="Geliştirici" />
                <Highlight subject={data.language.totalRepositories} title="Repo" />
                <Highlight subject={data.language.totalStars} title="Star" />
              </View>
            </Container>
          </ScrollView>
        );
      }}
    </Query>
  );
};

export default Language;
