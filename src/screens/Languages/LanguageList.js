import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Loading, Container, LanguageCard, ErrorState } from '../../components';

class LocationList extends PureComponent {
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

    if (error || !data || !data.languages) {
      return;
    }

    this.setState({ loadMoreLoading: true }, () => {
      fetchMore({
        variables: {
          offset: data.languages.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          if (fetchMoreResult.languages.length === 0) {
            this.setState({ loadMoreLoading: false }, () => prev);
          }

          this.setState({ loadMoreLoading: false });

          return {
            ...prev,
            languages: [...prev.languages, ...fetchMoreResult.languages],
          };
        },
      });
    });
  };

  render() {
    const query = gql`
      query($limit: Int!, $offset: Int!, $orderBy: LocationOrder!) {
        languages(limit: $limit, offset: $offset, orderBy: $orderBy) {
          id
          name
          slug
          totalRepositories
          totalDevelopers
        }
      }
    `;

    const { orderBy, headerComponent } = this.props;
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
            <Container>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data.languages}
                renderItem={({ item, index }) => (
                  <LanguageCard
                    key={index}
                    rank={index + 1}
                    name={item.name}
                    totalRepositories={item.totalRepositories}
                    totalDevelopers={item.totalDevelopers}
                  />
                )}
                numColumns={1}
                keyExtractor={(item, index) => `language-${orderBy.field}-${index}`}
                onEndReached={() => {
                  this.loadMoreContent(data, error, fetchMore);
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

export default LocationList;
