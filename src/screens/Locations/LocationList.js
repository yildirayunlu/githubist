import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Routes } from '..';
import { Loading, List, LocationCard, ErrorState } from '../../components';

class LocationList extends PureComponent {
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
            this.setState({ stopScrollListening: true, loadMoreLoading: false }, () => prev);
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

    const { orderBy, header, navigator } = this.props;
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
              showsVerticalScrollIndicator={false}
              data={data.locations}
              renderItem={({ item, index }) => (
                <LocationCard
                  key={index}
                  rank={index + 1}
                  name={item.name}
                  totalRepositories={item.totalRepositories}
                  totalDevelopers={item.totalDevelopers}
                  language={
                    item.languageUsage.length > 0 ? item.languageUsage[0].language.name : undefined
                  }
                  onPressLocation={() => {
                    navigator.push({
                      ...Routes.Location,
                      title: item.name,
                      backButtonTitle: '',
                      passProps: { slug: item.slug },
                    });
                  }}
                  onPressLanguage={() => {
                    navigator.push({
                      ...Routes.Language,
                      title: item.languageUsage[0].language.name,
                      backButtonTitle: '',
                      passProps: { slug: item.languageUsage[0].language.slug },
                    });
                  }}
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
          );
        }}
      </Query>
    );
  }
}

export default LocationList;
