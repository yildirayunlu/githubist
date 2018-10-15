import { Navigation } from 'react-native-navigation';

import Developers from './Developers';
import Cities from './Cities';
import Languages from './Languages';
import Repositories from './Repositories';

// const navigatorStyle = {};
const tabsStyle = {
  tabBarSelectedButtonColor: '#333',
};

export const Routes = {
  Developers: {
    screen: 'app.Developers',
    generator: () => Developers,
    title: 'Developers',
    label: 'Developers',
  },
  Cities: {
    screen: 'app.Cities',
    generator: () => Cities,
    title: 'Cities',
    label: 'Cities',
  },
  Languages: {
    screen: 'app.Languages',
    generator: () => Languages,
    title: 'Languages',
    label: 'Languages',
  },
  Repositories: {
    screen: 'app.Repositories',
    generator: () => Repositories,
    title: 'Repositories',
    label: 'Repositories',
  },
};

export function registerScreens() {
  Object.values(Routes).forEach(route => {
    Navigation.registerComponent(route.screen, route.generator);
  });
}

export function openHomeScreen() {
  Navigation.startTabBasedApp({
    tabs: [Routes.Developers, Routes.Cities, Routes.Languages, Routes.Repositories],
    tabsStyle: { ...tabsStyle },
  });
}
