import { Navigation } from 'react-native-navigation';

import Developers from './Developers';
import Cities from './Cities';
import Languages from './Languages';
import Repositories from './Repositories';

import iconDevelopers from '../../assets/images/icons/developers.png';
import iconCities from '../../assets/images/icons/cities.png';
import iconLanguages from '../../assets/images/icons/languages.png';
import iconRepositories from '../../assets/images/icons/repositories.png';

// const navigatorStyle = {};
const tabsStyle = {
  tabBarSelectedButtonColor: '#333',
};

export const Routes = {
  Developers: {
    screen: 'app.Developers',
    generator: () => Developers,
    title: 'Geliştiriciler',
    label: 'Geliştiriciler',
    icon: iconDevelopers,
  },
  Cities: {
    screen: 'app.Cities',
    generator: () => Cities,
    title: 'Cities',
    label: 'Cities',
    icon: iconCities,
  },
  Languages: {
    screen: 'app.Languages',
    generator: () => Languages,
    title: 'Languages',
    label: 'Languages',
    icon: iconLanguages,
  },
  Repositories: {
    screen: 'app.Repositories',
    generator: () => Repositories,
    title: 'Repositories',
    label: 'Repositories',
    icon: iconRepositories,
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
