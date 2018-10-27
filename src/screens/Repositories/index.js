import React, { PureComponent } from 'react';
import { TabView } from 'react-native-tab-view';

import ByDate from './tabs/ByDate';
import ByForks from './tabs/ByForks';
import ByStars from './tabs/ByStars';

import { TabBar } from '../../components';

class Locations extends PureComponent {
  constructor(props) {
    super(props);

    /* eslint-disable react/no-unused-state */
    this.state = {
      index: 0,
      routes: [
        { key: 'stars', title: "Star'a Göre" },
        { key: 'forks', title: "Fork'lara Göre" },
        { key: 'date', title: 'İlk Repolar' },
      ],
    };
    /* eslint-enable react/no-unused-state */
  }

  renderTabBar = props => <TabBar {...props} />;

  renderScene = sceneProps => {
    switch (sceneProps.route.key) {
      case 'stars':
        return <ByStars />;

      case 'forks':
        return <ByForks />;

      case 'date':
        return <ByDate />;

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

export default Locations;
