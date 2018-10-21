import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import Style from '../../styles';
import { LinkBar, LocationCard, LinkBarItem, Container, Heading } from '../../components';

class Locations extends PureComponent {
  constructor(props) {
    super(props);

    const { navigator } = this.props;
    navigator.setStyle({
      largeTitle: true,
    });
  }

  render() {
    return (
      <ScrollView>
        <Container>
          <Heading.H4 style={styles.heading}>
            Github.ist üzerinde toplam 81 şehir bulunuyor.
          </Heading.H4>
          <View style={styles.linkBar}>
            <LinkBar>
              <LinkBarItem isActive itemPressed={() => {}}>
                Sıralama
              </LinkBarItem>
              <LinkBarItem itemPressed={() => {}}>Geliştirci Sayısına Göre</LinkBarItem>
              <LinkBarItem itemPressed={() => {}}>Repo Sayısına Göre</LinkBarItem>
            </LinkBar>
          </View>

          <View style={styles.developerList}>
            <LocationCard
              rank={1}
              name="İstanbul"
              slug="istanbul"
              totalRepositories="12569"
              totalDevelopers="853"
              language="Javascript"
            />
          </View>
        </Container>
      </ScrollView>
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

export default Locations;
