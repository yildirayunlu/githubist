import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Loading, DeveloperCard, ErrorState } from '../../components';

const DeveloperList = props => {
  const { orderBy } = props;

  const query = gql`
    query($limit: Int!, $offset: Int!, $orderBy: DeveloperOrder!) {
      developers(limit: $limit, offset: $offset, orderBy: $orderBy) {
        id
        name
        username
        avatarUrl
        totalStarred
        followers
        company
        stats {
          repositoriesCount
        }
        location {
          name
          slug
        }
      }
    }
  `;

  return (
    <Query query={query} variables={{ limit: 10, offset: 0, orderBy }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading />;
        }

        if (error || !data) {
          return <ErrorState />;
        }

        return data.developers.map((developer, index) => (
          <DeveloperCard
            key={developer.id}
            rank={index + 1}
            name={developer.name}
            username={developer.username}
            profilePicture={developer.avatarUrl}
            company={developer.company}
            totalStarred={developer.totalStarred}
            followers={developer.followers}
            location={developer.location.name}
            repositoriesCount={developer.stats.repositoriesCount}
          />
        ));
      }}
    </Query>
  );
};

export default DeveloperList;
