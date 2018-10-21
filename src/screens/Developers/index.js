import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ByScore from './tabs/ByScore';
import Style from '../../styles';
import {
  LinkBar,
  LinkBarItem,
  AppText,
  Loading,
  Container,
  Heading,
  ErrorState,
} from '../../components';

class Developers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'score',
    };

    const { navigator } = this.props;
    navigator.setStyle({
      largeTitle: true,
    });
  }

  renderContent = () => {
    const { tab } = this.state;

    switch (tab) {
      case 'score':
        return <ByScore />;
      case 'star':
        return <AppText>Star Component</AppText>;
      default:
        return <AppText>default</AppText>;
    }
  };

  render() {
    const query = gql`
      query {
        turkey {
          totalDevelopers
        }
      }
    `;

    const { tab } = this.state;

    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }

          if (error || !data || !data.turkey) {
            return <ErrorState />;
          }

          return (
            <ScrollView>
              <Container>
                <Heading.H4 style={styles.heading}>
                  {`Github.ist üzerinde toplam ${
                    data.turkey.totalDevelopers
                  } geliştirici bulunuyor.`}
                </Heading.H4>
                <View style={styles.linkBar}>
                  <LinkBar>
                    <LinkBarItem
                      itemPressed={() => {
                        this.setState({ tab: 'score' });
                      }}
                      isActive={tab === 'score'}
                    >
                      Sıralama
                    </LinkBarItem>
                    <LinkBarItem
                      itemPressed={() => {
                        this.setState({ tab: 'star' });
                      }}
                      isActive={tab === 'star'}
                    >
                      Star&apos;lanma Sayısına Göre
                    </LinkBarItem>
                    <LinkBarItem
                      itemPressed={() => {
                        this.setState({ tab: 'follower' });
                      }}
                      isActive={tab === 'follower'}
                    >
                      Takipçi Sayısına Göre
                    </LinkBarItem>
                    <LinkBarItem
                      itemPressed={() => {
                        this.setState({ tab: 'date' });
                      }}
                      isActive={tab === 'date'}
                    >
                      İlk Keşfedenler
                    </LinkBarItem>
                  </LinkBar>
                </View>

                <View style={styles.developerList}>{this.renderContent()}</View>
              </Container>
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: Style.variables.spacing.xLarge,
  },
  linkBar: {
    marginBottom: Style.variables.spacing.large,
  },
  developerList: {},
});

export default Developers;
