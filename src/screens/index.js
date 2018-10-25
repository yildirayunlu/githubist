import React from 'react';
import { Navigation } from 'react-native-navigation';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';

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
  Locations: {
    screen: 'app.Locations',
    generator: () => withProvider(Locations),
    title: 'Şehirler',
    label: 'Şehirler',
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
