import { Navigation } from 'react-native-navigation';

import Developers from './Developers';
import Locations from './Locations';
import Languages from './Languages';
import Repositories from './Repositories';

import iconDevelopers from '../../assets/images/icons/developers.png';
import iconLocations from '../../assets/images/icons/locations.png';
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
  Locations: {
    screen: 'app.Locations',
    generator: () => Locations,
    title: 'Locations',
    label: 'Locations',
    icon: iconLocations,
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
    tabs: [Routes.Developers, Routes.Locations, Routes.Languages, Routes.Repositories],
    tabsStyle: { ...tabsStyle },
  });
}
