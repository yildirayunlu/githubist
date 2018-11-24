import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Routes } from '..';
import { Container, List, RepositoryCard, Loading, ErrorState } from '../../components';

class DeveloperRepositories extends PureComponent {
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

    if (error || !data || !data.developer || !data.developer.repositories) {
      this.setState({ stopScrollListening: true });
      return;
    }

    this.setState({ loadMoreLoading: true }, () => {
      fetchMore({
        variables: {
          offset: data.developer.repositories.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          if (fetchMoreResult.developer.repositories.length === 0) {
            this.setState({ loadMoreLoading: false, stopScrollListening: true }, () => prev);
          }

          this.setState({ loadMoreLoading: false });

          return {
            ...prev,
            developer: {
              ...prev.developer,
              repositories: [
                ...prev.developer.repositories,
                ...fetchMoreResult.developer.repositories,
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
          repositories(limit: $limit, offset: $offset, orderBy: { field: STARS, direction: DESC }) {
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
                data={data.developer.repositories}
                renderItem={({ item, index }) => (
                  <RepositoryCard
                    key={item.id}
                    rank={index + 1}
                    slug={item.slug}
                    description={item.description}
                    language={item.language}
                    stars={item.stars}
                    forks={item.forks}
                    onPressRepository={() => {
                      navigator.push({
                        ...Routes.Repository,
                        title: item.slug,
                        backButtonTitle: '',
                        passProps: { slug: item.slug },
                      });
                    }}
                    onPressLangauge={() => {
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
                keyExtractor={item => `repository-${item.id}`}
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

export default DeveloperRepositories;
