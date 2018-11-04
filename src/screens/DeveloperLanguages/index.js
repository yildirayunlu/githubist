import React from 'react';
import { ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Container, LanguageCard, Loading, ErrorState } from '../../components';

const DeveloperLanguages = props => {
  const query = gql`
    query($username: String!) {
      developer(username: $username) {
        id
        username
        languageUsage(limit: 9999, offset: 0) {
          language {
            id
            name
          }
          repositoriesCount
        }
      }
    }
  `;

  const { username } = props;

  return (
    <Query query={query} variables={{ username }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading />;
        }

        if (error || !data || !data.developer.languageUsage) {
          return <ErrorState />;
        }

        return (
          <ScrollView style={{ paddingTop: 15 }}>
            <Container>
              {data.developer.languageUsage.map((language, index) => (
                <LanguageCard
                  key={language.language.id}
                  rank={index + 1}
                  name={language.language.name}
                  totalRepositories={language.repositoriesCount}
                />
              ))}
            </Container>
          </ScrollView>
        );
      }}
    </Query>
  );
};

export default DeveloperLanguages;
