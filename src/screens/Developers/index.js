import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Routes } from '..';
import {
  Container,
  Loading,
  ErrorState,
  ScreenHeading,
  TabBar,
  TabBarItem,
} from '../../components';
import DeveloperList from './DeveloperList';

class Developers extends PureComponent {
  renderHeader = () => {
    const query = gql`
      query {
        turkey {
          totalDevelopers
        }
      }
    `;

    const { navigator } = this.props;

    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }

          if (error || !data) {
            return <ErrorState />;
          }

          return (
            <View>
              <ScreenHeading>
                {`Github.ist üzerinde toplam ${data.turkey.totalDevelopers} geliştirici bulunuyor.`}
              </ScreenHeading>
              <TabBar>
                <TabBarItem isActive>Sıralama</TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.DevelopersByTotalStarred,
                      backButtonTitle: '',
                    });
                  }}
                >
                  Star&apos;lanma Sayısına Göre
                </TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.DevelopersByFollowers,
                      backButtonTitle: '',
                    });
                  }}
                >
                  Takipçi Sayısına Göre
                </TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.DevelopersByDate,
                      backButtonTitle: '',
                    });
                  }}
                >
                  İlk Keşfedenler
                </TabBarItem>
              </TabBar>
            </View>
          );
        }}
      </Query>
    );
  };

  render() {
    const { navigator } = this.props;

    return (
      <Container>
        <DeveloperList
          header={this.renderHeader}
          navigator={navigator}
          orderBy={{ field: 'SCORE', direction: 'DESC' }}
        />
      </Container>
    );
  }
}

export default Developers;
