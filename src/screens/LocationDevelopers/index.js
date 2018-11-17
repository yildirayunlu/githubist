import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Routes } from '..';
import { Loading, Container, List, ErrorState, DeveloperCard } from '../../components';

class LocationDevelopers extends PureComponent {
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

    if (error || !data || !data.location.developers) {
      return;
    }

    this.setState({ loadMoreLoading: true }, () => {
      fetchMore({
        variables: {
          offset: data.location.developers.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          if (fetchMoreResult.location.developers.length === 0) {
            this.setState({ loadMoreLoading: false, stopScrollListening: true }, () => prev);
          }

          this.setState({ loadMoreLoading: false });

          return {
            ...prev,
            location: {
              ...prev.location,
              developers: [...prev.location.developers, ...fetchMoreResult.location.developers],
            },
          };
        },
      });
    });
  };

  render() {
    const query = gql`
      query($slug: String!, $limit: Int!, $offset: Int!, $orderBy: DeveloperOrder!) {
        location(slug: $slug) {
          id
          name
          slug
          totalDevelopers
          totalRepositories
          developers(limit: $limit, offset: $offset, orderBy: $orderBy) {
            id
            name
            username
            avatarUrl
            totalStarred
            followers
            company
            location {
              name
              slug
            }
            stats {
              repositoriesCount
            }
          }
        }
      }
    `;

    const { header, slug, navigator } = this.props;
    const { loadMoreLoading } = this.state;

    return (
      <Query
        query={query}
        variables={{ slug, limit: 20, offset: 0, orderBy: { field: 'SCORE', direction: 'DESC' } }}
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
                data={data.location.developers}
                renderItem={({ item, index }) => (
                  <DeveloperCard
                    onPressUser={() => {
                      navigator.push({
                        ...Routes.Developer,
                        title: item.name,
                        passProps: { username: item.username },
                      });
                    }}
                    onPressLocation={() => {
                      navigator.push({
                        ...Routes.Location,
                        title: item.location.name,
                        passProps: { slug: item.location.slug },
                      });
                    }}
                    key={item.id}
                    rank={index + 1}
                    name={item.name}
                    username={item.username}
                    profilePicture={item.avatarUrl}
                    company={item.company}
                    totalStarred={item.totalStarred}
                    followers={item.followers}
                    location={item.location.name}
                    repositoriesCount={item.stats.repositoriesCount}
                  />
                )}
                numColumns={1}
                keyExtractor={item => `developer-${item.username}`}
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

export default LocationDevelopers;
