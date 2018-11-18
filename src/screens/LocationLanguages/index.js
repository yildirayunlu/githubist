import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Routes } from '..';
import { Loading, Container, List, ErrorState, LanguageCard } from '../../components';

class LocationLanguages extends PureComponent {
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

    if (error || !data || !data.location.languageUsage) {
      this.setState({ stopScrollListening: true });
      return;
    }

    this.setState({ loadMoreLoading: true }, () => {
      fetchMore({
        variables: {
          offset: data.location.languageUsage.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          if (fetchMoreResult.location.languageUsage.length === 0) {
            this.setState({ loadMoreLoading: false, stopScrollListening: true }, () => prev);
          }

          this.setState({ loadMoreLoading: false });

          return {
            ...prev,
            location: {
              ...prev.location,
              languageUsage: [
                ...prev.location.languageUsage,
                ...fetchMoreResult.location.languageUsage,
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
        location(slug: $slug) {
          id
          name
          slug
          totalDevelopers
          totalRepositories
          languageUsage(limit: $limit, offset: $offset) {
            language {
              id
              name
              slug
              totalRepositories
              totalDevelopers
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
                data={data.location.languageUsage}
                renderItem={({ item, index }) => (
                  <LanguageCard
                    key={index}
                    rank={index + 1}
                    name={item.language.name}
                    totalRepositories={item.language.totalRepositories}
                    totalDevelopers={item.language.totalDevelopers}
                    onPressLanguage={() => {
                      navigator.push({
                        ...Routes.Language,
                        title: item.language.name,
                        backButtonTitle: '',
                        passProps: { slug: item.language.slug },
                      });
                    }}
                  />
                )}
                numColumns={1}
                keyExtractor={item => `language-${item.language.slug}`}
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

export default LocationLanguages;
