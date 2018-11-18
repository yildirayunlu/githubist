import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Routes } from '..';
import { Container, List, LanguageCard, Loading, ErrorState } from '../../components';

class DeveloperLanguages extends PureComponent {
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

    if (error || !data || !data.developer || !data.developer.languageUsage) {
      this.setState({ stopScrollListening: true });
      return;
    }

    this.setState({ loadMoreLoading: true }, () => {
      fetchMore({
        variables: {
          offset: data.developer.languageUsage.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          if (fetchMoreResult.developer.languageUsage.length === 0) {
            this.setState({ loadMoreLoading: false, stopScrollListening: true }, () => prev);
          }

          this.setState({ loadMoreLoading: false });

          return {
            ...prev,
            developer: {
              ...prev.developer,
              languageUsage: [
                ...prev.developer.languageUsage,
                ...fetchMoreResult.developer.languageUsage,
              ],
            },
          };
        },
      });
    });
  };

  render() {
    const query = gql`
      query($username: String!, $limit: Int!, $offset: Int!) {
        developer(username: $username) {
          id
          username
          languageUsage(limit: $limit, offset: $offset) {
            language {
              id
              name
              slug
            }
            repositoriesCount
          }
        }
      }
    `;

    const { username, navigator } = this.props;
    const { loadMoreLoading } = this.state;

    return (
      <Query query={query} variables={{ username, limit: 20, offset: 0 }}>
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
                data={data.developer.languageUsage}
                renderItem={({ item, index }) => (
                  <LanguageCard
                    key={item.language.id}
                    rank={index + 1}
                    name={item.language.name}
                    totalRepositories={item.repositoriesCount}
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
                keyExtractor={item => `location-${item.language.slug}`}
                onEndReached={() => {
                  this.loadMoreContent(data, error, fetchMore);
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

export default DeveloperLanguages;
