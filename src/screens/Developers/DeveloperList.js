import React, { PureComponent } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Style from '../../styles';

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

    const { orderBy, headerComponent } = this.props;
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
                style={styles.container}
                data={data.developers}
                renderItem={({ item, index }) => (
                  <DeveloperCard
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
                // keyExtractor={item => `developers-${orderBy.field}-${item.id}`}
                keyExtractor={(item, index) => `developers-${orderBy.field}-${index}`}
                onEndReached={() => {
                  this.loadMoreContent(loading, data, error, fetchMore);
                }}
                ListFooterComponent={loadMoreLoading && <Loading />}
                ListHeaderComponent={headerComponent}
              />
            </Container>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Style.variables.spacing.normal,
  },
});

export default DeveloperList;
