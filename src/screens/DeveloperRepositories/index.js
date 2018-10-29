import React from 'react';
import { ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Container, RepositoryCard, Loading, ErrorState } from '../../components';

const DeveloperRepositories = props => {
  const query = gql`
    query($username: String!) {
      developer(username: $username) {
        id
        username
        repositories(limit: 9999, orderBy: { field: STARS, direction: DESC }) {
          id
          slug
          description
          language {
            name
            slug
          }
          stars
          forks
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

        if (error || !data || !data.developer.repositories) {
          return <ErrorState />;
        }

        return (
          <ScrollView>
            <Container>
              {data.developer.repositories.map((repository, index) => (
                <RepositoryCard
                  key={repository.id}
                  rank={index + 1}
                  slug={repository.slug}
                  description={repository.description}
                  language={repository.language}
                  stars={repository.stars}
                  forks={repository.forks}
                />
              ))}
            </Container>
          </ScrollView>
        );
      }}
    </Query>
  );
};

export default DeveloperRepositories;
