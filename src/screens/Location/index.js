import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Routes } from '..';
import Styles from '../../styles';
import {
  Container,
  TabBar,
  TabBarItem,
  ScreenHeading,
  Loading,
  ErrorState,
  Highlight,
} from '../../components';

const Location = props => {
  const query = gql`
    query($slug: String!) {
      location(slug: $slug) {
        id
        name
        slug
        totalDevelopers
        totalRepositories
        stats {
          rank
        }
        languageUsage(limit: 1) {
          language {
            name
          }
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

        if (error || !data || !data.location) {
          return <ErrorState />;
        }

        return (
          <ScrollView style={styles.wrapper}>
            <Container>
              <ScreenHeading>
                {`Bu şehir için toplam ${data.location.totalDevelopers} geliştrici ve ${
                  data.location.totalRepositories
                } repo bulunuyor.`}
              </ScreenHeading>
              <TabBar>
                <TabBarItem isActive>Genel Bilgiler</TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.LocationRepositories,
                      backButtonTitle: '',
                      passProps: { slug: data.location.slug },
                    });
                  }}
                >
                  Meşhur Repolar
                </TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.LocationDevelopers,
                      backButtonTitle: '',
                      passProps: { slug: data.location.slug },
                    });
                  }}
                >
                  Meşhur Geliştiricler
                </TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.LocationLanguages,
                      backButtonTitle: '',
                      passProps: { slug: data.location.slug },
                    });
                  }}
                >
                  Dil Kullanımı
                </TabBarItem>
              </TabBar>
              <View>
                <Highlight subject={data.location.stats.rank} title="Github.ist Sıralaması" />
                <Highlight subject={data.location.totalDevelopers} title="Geliştirici" />
                <Highlight subject={data.location.totalRepositories} title="Repo" />
                <Highlight
                  subject={
                    data.location.languageUsage.length > 0
                      ? data.location.languageUsage[0].language.name
                      : 'Yok'
                  }
                  title="En Sevilen Dil"
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
  wrapper: {
    paddingVertical: Styles.variables.spacing.normal,
  },
});

export default Location;
