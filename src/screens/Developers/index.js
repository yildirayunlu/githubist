import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';

import { LinkBar, LinkBarItem, Container, Heading } from '../../components';

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
          <Heading h4>Github.ist üzerinde toplam 19,528 geliştirici bulunuyor.</Heading>
          <LinkBar>
            <LinkBarItem isActive itemPressed={() => {}}>
              Sıralama
            </LinkBarItem>
            <LinkBarItem itemPressed={() => {}}>Star&apos;lanma Sayısına Göre</LinkBarItem>
            <LinkBarItem itemPressed={() => {}}>Takipçi Sayısına Göre</LinkBarItem>
            <LinkBarItem itemPressed={() => {}}>İlk Keşfedenler</LinkBarItem>
          </LinkBar>
        </Container>
      </ScrollView>
    );
  }
}

export default Developers;
