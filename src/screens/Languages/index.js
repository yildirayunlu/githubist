import React, { PureComponent } from 'react';
import { TabView } from 'react-native-tab-view';

import ByScore from './tabs/ByScore';
import ByTotalDevelopers from './tabs/ByTotalDevelopers';
import ByTotalRepositories from './tabs/ByTotalRepositories';

import { TabBar } from '../../components';

class Languages extends PureComponent {
  constructor(props) {
    super(props);

    /* eslint-disable react/no-unused-state */
    this.state = {
      index: 0,
      routes: [
        { key: 'score', title: 'Sıralama' },
        { key: 'totalDevelopers', title: 'Geliştirici Sayısına Göre' },
        { key: 'totalRepositories', title: 'Repo Sayısına Göre' },
      ],
    };
    /* eslint-enable react/no-unused-state */
  }

  renderTabBar = props => <TabBar {...props} />;

  renderScene = sceneProps => {
    switch (sceneProps.route.key) {
      case 'score':
        return <ByScore />;

      case 'totalDevelopers':
        return <ByTotalDevelopers />;

      case 'totalRepositories':
        return <ByTotalRepositories />;

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

export default Languages;
