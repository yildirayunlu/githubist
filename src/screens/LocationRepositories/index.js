import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Loading, Container, List, ErrorState, RepositoryCard } from '../../components';

class LocationRepositories extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loadMoreLoading: false,
      stopScrollListening: false,
    };
  }

  loadMoreContent = (data, error, fetchMore) => {
    const { loadMoreLoading, stopScrollListening } = this.state;

    if (loadMoreLoading || stopScrollListening) {
      return;
    }

    if (error || !data || !data.location.repositories) {
      return;
    }

    this.setState({ loadMoreLoading: true }, () => {
      fetchMore({
        variables: {
          offset: data.location.repositories.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          if (fetchMoreResult.location.repositories.length === 0) {
            this.setState({ loadMoreLoading: false, stopScrollListening: false }, () => prev);
          }

          this.setState({ loadMoreLoading: false });

          return {
            ...prev,
            location: {
              ...prev.location,
              repositories: [
                ...prev.location.repositories,
                ...fetchMoreResult.location.repositories,
              ],
            },
          };
        },
      });
    });
  };

  render() {
    const query = gql`
      query($slug: String!, $limit: Int!, $offset: Int!, $orderBy: RepositoryOrder!) {
        location(slug: $slug) {
          id
          name
          slug
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
          }
        }
      }
    `;

    const { header, slug } = this.props;
    const { loadMoreLoading } = this.state;

    return (
      <Query
        query={query}
        variables={{ slug, limit: 20, offset: 0, orderBy: { field: 'STARS', direction: 'DESC' } }}
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading) {
            return <Loading />;
          }

          if (error || !data) {
            return <ErrorState />;
          }

          return (
            <Container>
              <List
                style={{ paddingTop: 15 }}
                showsVerticalScrollIndicator={false}
                data={data.location.repositories}
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
                keyExtractor={item => `location-${item.slug}`}
                onEndReached={() => {
                  this.loadMoreContent(data, error, fetchMore);
                }}
                ListFooterComponent={loadMoreLoading && <Loading />}
                ListHeaderComponent={header}
              />
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default LocationRepositories;
