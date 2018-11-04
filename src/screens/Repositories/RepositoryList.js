import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Loading, List, ErrorState, RepositoryCard } from '../../components';

class RepositoryList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loadMoreLoading: false,
    };
  }

  loadMoreContent = (data, error, fetchMore) => {
    const { loadMoreLoading } = this.state;

    if (loadMoreLoading) {
      return;
    }

    if (error || !data || !data.repositories) {
      return;
    }

    this.setState({ loadMoreLoading: true }, () => {
      fetchMore({
        variables: {
          offset: data.repositories.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          if (fetchMoreResult.repositories.length === 0) {
            this.setState({ loadMoreLoading: false }, () => prev);
          }

          this.setState({ loadMoreLoading: false });

          return {
            ...prev,
            repositories: [...prev.repositories, ...fetchMoreResult.repositories],
          };
        },
      });
    });
  };

  render() {
    const query = gql`
      query($limit: Int!, $offset: Int!, $orderBy: LocationOrder!) {
        repositories(limit: $limit, offset: $offset, orderBy: $orderBy) {
          id
          slug
          description
          language {
            name
            slug
          }
          stars
          forks
          githubCreatedAt
        }
      }
    `;

    const { orderBy, header } = this.props;
    const { loadMoreLoading } = this.state;

    return (
      <Query query={query} variables={{ limit: 20, offset: 0, orderBy }}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) {
            return <Loading />;
          }

          if (error || !data) {
            return <ErrorState />;
          }

          return (
            <List
              style={{ paddingTop: 15 }}
              showsVerticalScrollIndicator={false}
              data={data.repositories}
              renderItem={({ item, index }) => (
                <RepositoryCard
                  key={index}
                  rank={index + 1}
                  slug={item.slug}
                  description={item.description}
                  language={item.language}
                  stars={item.stars}
                  forks={item.forks}
                  githubCreatedAt={item.githubCreatedAt}
                />
              )}
              numColumns={1}
              keyExtractor={(item, index) => `location-${orderBy.field}-${index}`}
              onEndReached={() => {
                this.loadMoreContent(data, error, fetchMore);
              }}
              ListFooterComponent={loadMoreLoading && <Loading />}
              ListHeaderComponent={header}
            />
          );
        }}
      </Query>
    );
  }
}

export default RepositoryList;
