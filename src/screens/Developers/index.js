import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Style from '../../styles';
import { LinkBar, DeveloperCard, LinkBarItem, Loading, Container, Heading } from '../../components';

class Developers extends PureComponent {
  constructor(props) {
    super(props);

    const { navigator } = this.props;
    navigator.setStyle({
      largeTitle: true,
    });
  }

  render() {
    const query = gql`
      query {
        turkey {
          totalDevelopers
        }
      }
    `;

    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }

          // todo
          if (error || !data || !data.turkey) {
            console.error(error);
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
                    <LinkBarItem isActive itemPressed={() => {}}>
                      Sıralama
                    </LinkBarItem>
                    <LinkBarItem itemPressed={() => {}}>Star&apos;lanma Sayısına Göre</LinkBarItem>
                    <LinkBarItem itemPressed={() => {}}>Takipçi Sayısına Göre</LinkBarItem>
                    <LinkBarItem itemPressed={() => {}}>İlk Keşfedenler</LinkBarItem>
                  </LinkBar>
                </View>

                <View style={styles.developerList}>
                  <DeveloperCard
                    rank={1}
                    name="Yıldıray ÜNLÜ"
                    username="yildirayunlu"
                    profilePicture="https://avatars1.githubusercontent.com/u/3484713?v=4"
                    company="Macellan"
                    totalStarred={1420}
                    followers={20}
                    location="İstanbul"
                    repositoriesCount={10}
                  />
                </View>
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
