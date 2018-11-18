import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Routes } from '..';
import { Loading, Container, List, ErrorState, DeveloperCard } from '../../components';

class LanguageDevelopers extends PureComponent {
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

    if (error || !data || !data.language) {
      return;
    }

    this.setState({ loadMoreLoading: true }, () => {
      fetchMore({
        variables: {
          offset: data.language.developerUsage.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          if (fetchMoreResult.language.developerUsage.length === 0) {
            this.setState({ loadMoreLoading: false, stopScrollListening: true }, () => prev);
          }

          this.setState({ loadMoreLoading: false });

          return {
            ...prev,
            language: {
              ...prev.language,
              developerUsage: [
                ...prev.language.developerUsage,
                ...fetchMoreResult.language.developerUsage,
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
          developerUsage(limit: $limit, offset: $offset) {
            developer {
              id
              name
              username
              avatarUrl
              company
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
                data={data.language.developerUsage}
                renderItem={({ item, index }) => (
                  <DeveloperCard
                    onPressUser={() => {
                      navigator.push({
                        ...Routes.Developer,
                        title: item.developer.name,
                        backButtonTitle: '',
                        passProps: { username: item.developer.username },
                      });
                    }}
                    onPressLocation={() => {
                      navigator.push({
                        ...Routes.Location,
                        title: item.developer.location.name,
                        backButtonTitle: '',
                        passProps: { slug: item.developer.location.slug },
                      });
                    }}
                    key={item.developer.id}
                    rank={index + 1}
                    name={item.developer.name}
                    username={item.developer.username}
                    profilePicture={item.developer.avatarUrl}
                    company={item.developer.company}
                    repositoriesCount={item.repositoriesCount}
                    repoText={`${data.language.name} Reposu`}
                  />
                )}
                numColumns={1}
                keyExtractor={item => `developer-${item.developer.username}`}
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

export default LanguageDevelopers;
