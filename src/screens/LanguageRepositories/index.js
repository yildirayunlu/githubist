import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Routes } from '..';
import { Loading, Container, List, ErrorState, RepositoryCard } from '../../components';

class LanguageRepositories extends PureComponent {
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

    if (error || !data || !data.language.repositories) {
      return;
    }

    this.setState({ loadMoreLoading: true }, () => {
      fetchMore({
        variables: {
          offset: data.language.repositories.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          if (fetchMoreResult.language.repositories.length === 0) {
            this.setState({ loadMoreLoading: false, stopScrollListening: true }, () => prev);
          }

          this.setState({ loadMoreLoading: false });

          return {
            ...prev,
            language: {
              ...prev.language,
              repositories: [
                ...prev.language.repositories,
                ...fetchMoreResult.language.repositories,
              ],
            },
          };
        },
      });
    });
  };

  render() {
    const query = gql`
      query($slug: String!, $limit: Int!, $offset: Int!, $orderBy: RepositoryOrder!) {
        language(slug: $slug) {
          id
          name
          slug
          totalRepositories
          totalDevelopers
          repositories(limit: $limit, offset: $offset, orderBy: $orderBy) {
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

    const { header, slug, navigator } = this.props;
    const { loadMoreLoading } = this.state;

    return (
      <Query
        query={query}
        variables={{ slug, limit: 20, offset: 0, orderBy: { field: 'STARS', direction: 'DESC' } }}
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
                data={data.language.repositories}
                renderItem={({ item, index }) => (
                  <RepositoryCard
                    key={index}
                    rank={index + 1}
                    slug={item.slug}
                    description={item.description}
                    language={item.language}
                    stars={item.stars}
                    forks={item.forks}
                    githubCreatedAt={item.githubCreatedAt}
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
                keyExtractor={item => `language-${item.slug}`}
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

export default LanguageRepositories;
