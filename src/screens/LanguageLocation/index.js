import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Routes } from '..';
import { Loading, Container, List, ErrorState, LocationCard } from '../../components';

class LanguageLocation extends PureComponent {
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

    if (error || !data || !data.language.locationUsage) {
      return;
    }

    this.setState({ loadMoreLoading: true }, () => {
      fetchMore({
        variables: {
          offset: data.language.locationUsage.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          if (fetchMoreResult.language.locationUsage.length === 0) {
            this.setState({ loadMoreLoading: false, stopScrollListening: true }, () => prev);
          }

          this.setState({ loadMoreLoading: false });

          return {
            ...prev,
            language: {
              ...prev.language,
              locationUsage: [
                ...prev.language.locationUsage,
                ...fetchMoreResult.language.locationUsage,
              ],
            },
          };
        },
      });
    });
  };

  render() {
    const query = gql`
      query($slug: String!, $limit: Int!, $offset: Int!) {
        language(slug: $slug) {
          id
          name
          slug
          locationUsage(limit: $limit, offset: $offset) {
            location {
              id
              name
              slug
            }

            repositoriesCount
          }
        }
      }
    `;

    const { header, slug, navigator } = this.props;
    const { loadMoreLoading } = this.state;

    return (
      <Query query={query} variables={{ slug, limit: 20, offset: 0 }}>
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
                data={data.language.locationUsage}
                renderItem={({ item, index }) => (
                  <LocationCard
                    key={index}
                    rank={index + 1}
                    name={item.location.name}
                    totalRepositories={item.repositoriesCount}
                    onPressLocation={() => {
                      navigator.push({
                        ...Routes.Location,
                        title: item.location.name,
                        backButtonTitle: '',
                        passProps: { slug: item.location.slug },
                      });
                    }}
                  />
                )}
                numColumns={1}
                keyExtractor={item => `location-${item.location.slug}`}
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

export default LanguageLocation;
