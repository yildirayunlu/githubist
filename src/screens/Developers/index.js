import React, { PureComponent } from 'react';
import { TabView } from 'react-native-tab-view';

import ByScore from './tabs/ByScore';
import ByTotalStarred from './tabs/ByTotalStarred';
import ByDate from './tabs/ByDate';
import ByFollowers from './tabs/ByFollowers';

import { TabBar } from '../../components';

class Developers extends PureComponent {
  constructor(props) {
    super(props);

    /* eslint-disable react/no-unused-state */
    this.state = {
      index: 0,
      routes: [
        { key: 'score', title: 'Sıralama' },
        { key: 'totalStarred', title: "Star'lanma Sayısına Göre" },
        { key: 'followers', title: 'Takipçi Sayısına Göre' },
        { key: 'date', title: 'İlk Keşfedenler' },
      ],
    };
    /* eslint-enable react/no-unused-state */
  }

  renderTabBar = props => <TabBar {...props} />;

  renderScene = sceneProps => {
    const { navigator } = this.props;

    switch (sceneProps.route.key) {
      case 'score':
        return <ByScore navigator={navigator} />;

      case 'totalStarred':
        return <ByTotalStarred navigator={navigator} />;

      case 'followers':
        return <ByFollowers navigator={navigator} />;

      case 'date':
        return <ByDate navigator={navigator} />;

      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderTabBar={this.renderTabBar}
        renderScene={this.renderScene}
        // eslint-disable-next-line react/no-unused-state
        onIndexChange={index => this.setState({ index })}
      />
    );
  }
}

export default Developers;
