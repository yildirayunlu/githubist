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
import LocationList from './LocationList';

class Locations extends PureComponent {
  renderHeader = () => {
    const query = gql`
      query {
        turkey {
          totalLocations
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
                {`Github.ist'de ${data.turkey.totalLocations} şehir bulunuyor.`}
              </ScreenHeading>
              <TabBar>
                <TabBarItem isActive>Sıralama</TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.LocationsByTotalDevelopers,
                      backButtonTitle: '',
                    });
                  }}
                >
                  Geliştirci Sayısına Göre
                </TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.LocationsByTotalRepositories,
                      backButtonTitle: '',
                    });
                  }}
                >
                  Repo Sayısına Göre
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
        <LocationList
          header={this.renderHeader}
          navigator={navigator}
          orderBy={{ field: 'SCORE', direction: 'DESC' }}
        />
      </Container>
    );
  }
}

export default Locations;
