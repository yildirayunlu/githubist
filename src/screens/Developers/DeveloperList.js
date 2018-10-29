import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Routes } from '..';
import { Loading, Container, DeveloperCard, ErrorState } from '../../components';

class DeveloperList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loadMoreLoading: false,
    };
  }

  loadMoreContent = (loading, data, error, fetchMore) => {
    if (loading) {
      return;
    }

    if (error || !data || !data.developers) {
      return;
    }

    this.setState({ loadMoreLoading: true }, () => {
      fetchMore({
        variables: {
          offset: data.developers.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          if (fetchMoreResult.developers.length === 0) {
            this.setState({ loadMoreLoading: false }, () => prev);
          }

          this.setState({ loadMoreLoading: false });

          return {
            ...prev,
            developers: [...prev.developers, ...fetchMoreResult.developers],
          };
        },
      });
    });
  };

  render() {
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

    const { orderBy, navigator } = this.props;
    const { loadMoreLoading } = this.state;

    return (
      <Query query={query} variables={{ limit: 10, offset: 0, orderBy }}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) {
            return <Loading />;
          }

          if (error || !data) {
            return <ErrorState />;
          }

          return (
            <Container>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data.developers}
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
                        passProps: { location: item.location.slug },
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
                keyExtractor={(item, index) => `developers-${orderBy.field}-${index}`}
                onEndReached={() => {
                  this.loadMoreContent(loading, data, error, fetchMore);
                }}
                ListFooterComponent={loadMoreLoading && <Loading />}
              />
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default DeveloperList;
