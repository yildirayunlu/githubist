import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import { LinkBar, LinkBarItem, AppText } from '../../components';

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
      <View>
        <Text>Github.ist üzerinde toplam 19,528 geliştirici bulunuyor.</Text>
        <LinkBar>
          <LinkBarItem itemPressed={() => {}}>Sıralama</LinkBarItem>
          <LinkBarItem itemPressed={() => {}}>Star&apos;lanma Sayısına Göre</LinkBarItem>
          <LinkBarItem itemPressed={() => {}}>Takipçi Sayısına Göre</LinkBarItem>
          <LinkBarItem itemPressed={() => {}}>İlk Keşfedenler</LinkBarItem>
        </LinkBar>
      </View>
    );
  }
}

export default Developers;
