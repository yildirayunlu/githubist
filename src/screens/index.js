import React from 'react';
import { Navigation } from 'react-native-navigation';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';

import Developers from './Developers';
import DevelopersByTotalStarred from './Developers/tabs/ByTotalStarred';
import DevelopersByFollowers from './Developers/tabs/ByFollowers';
import DevelopersByDate from './Developers/tabs/ByDate';
import Locations from './Locations';
import LocationsByTotalDevelopers from './Locations/tabs/ByTotalDevelopers';
import LocationsByTotalRepositories from './Locations/tabs/ByTotalRepositories';
import Languages from './Languages';
import LanguagesByTotalDevelopers from './Languages/tabs/ByTotalDevelopers';
import LanguagesByTotalRepositories from './Languages/tabs/ByTotalRepositories';
import Repositories from './Repositories';
import RepositoriesByForks from './Repositories/tabs/ByForks';
import RepositoriesByDate from './Repositories/tabs/ByDate';
import Developer from './Developer';
import Location from './Location';

import iconDevelopers from '../../assets/images/icons/developers.png';
import iconLocations from '../../assets/images/icons/locations.png';
import iconLanguages from '../../assets/images/icons/languages.png';
import iconRepositories from '../../assets/images/icons/repositories.png';

// const navigatorStyle = {};
const tabsStyle = {
  tabBarSelectedButtonColor: '#333',
};

const cache = new InMemoryCache();

const localClient = new ApolloClient({
  link: createHttpLink({
    uri: 'https://data.github.ist/graphql',
  }),
  cache,
});

const withProvider = (Component, client = localClient) => {
  return class extends React.Component {
    static options = Component.options;

    render() {
      return (
        <ApolloProvider client={client}>
          <Component {...this.props} />
        </ApolloProvider>
      );
    }
  };
};

export const Routes = {
  Developers: {
    screen: 'app.Developers',
    generator: () => withProvider(Developers),
    title: 'Geliştiriciler',
    label: 'Geliştiriciler',
    icon: iconDevelopers,
  },
  DevelopersByTotalStarred: {
    screen: 'app.DevelopersByTotalStarred',
    generator: () => withProvider(DevelopersByTotalStarred),
    title: "Star'lanma Sayısına Göre",
  },
  DevelopersByFollowers: {
    screen: 'app.DevelopersByFollowers',
    generator: () => withProvider(DevelopersByFollowers),
    title: 'Takipçi Sayısına Göre',
  },
  DevelopersByDate: {
    screen: 'app.DevelopersByDate',
    generator: () => withProvider(DevelopersByDate),
    title: 'İlk Keşfedenler',
  },
  Locations: {
    screen: 'app.Locations',
    generator: () => withProvider(Locations),
    title: 'Şehirler',
    label: 'Şehirler',
    icon: iconLocations,
  },
  LocationsByTotalDevelopers: {
    screen: 'app.LocationsByTotalDevelopers',
    generator: () => withProvider(LocationsByTotalDevelopers),
    title: 'Geliştirici Sayısına Göre',
  },
  LocationsByTotalRepositories: {
    screen: 'app.LocationsByTotalRepositories',
    generator: () => withProvider(LocationsByTotalRepositories),
    title: 'Repo Sayısına Göre',
  },
  Languages: {
    screen: 'app.Languages',
    generator: () => withProvider(Languages),
    title: 'Languages',
    label: 'Languages',
    icon: iconLanguages,
  },
  LanguagesByTotalDevelopers: {
    screen: 'app.LanguagesByTotalDevelopers',
    generator: () => withProvider(LanguagesByTotalDevelopers),
    title: 'Geliştirici Sayısına Göre',
  },
  LanguagesByTotalRepositories: {
    screen: 'app.LanguagesByTotalRepositories',
    generator: () => withProvider(LanguagesByTotalRepositories),
    title: 'Repo Sayısına Göre',
  },
  Repositories: {
    screen: 'app.Repositories',
    generator: () => withProvider(Repositories),
    title: 'Repositories',
    label: 'Repositories',
    icon: iconRepositories,
  },
  RepositoriesByForks: {
    screen: 'app.RepositoriesByForks',
    generator: () => withProvider(RepositoriesByForks),
    title: "Fork'a Göre",
  },
  RepositoriesByDate: {
    screen: 'app.RepositoriesByDate',
    generator: () => withProvider(RepositoriesByDate),
    title: 'İlk Repolar',
  },
  Developer: {
    screen: 'app.Developer',
    generator: () => withProvider(Developer),
    title: 'Developer',
  },
  Location: {
    screen: 'app.Location',
    generator: () => withProvider(Location),
    title: 'Location',
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
