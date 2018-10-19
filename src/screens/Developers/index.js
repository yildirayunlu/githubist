import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import Style from '../../styles';
import { LinkBar, DeveloperCard, LinkBarItem, Container, H4 } from '../../components';

class Developers extends PureComponent {
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
          <H4 style={styles.heading}>Github.ist üzerinde toplam 19,528 geliştirici bulunuyor.</H4>
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
