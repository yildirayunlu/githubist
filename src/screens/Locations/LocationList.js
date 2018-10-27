import React, { PureComponent } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Style from '../../styles';

import { Loading, Container, LocationCard, ErrorState } from '../../components';

class LocationList extends PureComponent {
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

    if (error || !data || !data.locations) {
      return;
    }

    this.setState({ loadMoreLoading: true }, () => {
      fetchMore({
        variables: {
          offset: data.locations.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          if (fetchMoreResult.locations.length === 0) {
            this.setState({ loadMoreLoading: false }, () => prev);
          }

          this.setState({ loadMoreLoading: false });

          return {
            ...prev,
            locations: [...prev.locations, ...fetchMoreResult.locations],
          };
        },
      });
    });
  };

  render() {
    const query = gql`
      query($limit: Int!, $offset: Int!, $orderBy: LocationOrder!) {
        locations(limit: $limit, offset: $offset, orderBy: $orderBy) {
          id
          name
          slug
          totalDevelopers
          totalRepositories
          languageUsage(limit: 1) {
            language {
              name
              slug
            }
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
                data={data.locations}
                renderItem={({ item, index }) => (
                  <LocationCard
                    key={index}
                    rank={index + 1}
                    name={item.name}
                    // slug={item.slug}
                    totalRepositories={item.totalRepositories}
                    totalDevelopers={item.totalDevelopers}
                    language={
                      item.languageUsage.length > 0
                        ? item.languageUsage[0].language.name
                        : undefined
                    }
                  />
                )}
                numColumns={1}
                keyExtractor={(item, index) => `location-${orderBy.field}-${index}`}
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

export default LocationList;
