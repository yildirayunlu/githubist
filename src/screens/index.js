import React from 'react';
import { Navigation } from 'react-native-navigation';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';

import Config from '../../config';

// Developers
import Developers from './Developers';
import DevelopersByTotalStarred from './Developers/tabs/ByTotalStarred';
import DevelopersByFollowers from './Developers/tabs/ByFollowers';
import DevelopersByDate from './Developers/tabs/ByDate';
import DeveloperRepositories from './DeveloperRepositories';
import DeveloperLanguages from './DeveloperLanguages';
import Developer from './Developer';

// Locations
import Locations from './Locations';
import LocationsByTotalDevelopers from './Locations/tabs/ByTotalDevelopers';
import LocationsByTotalRepositories from './Locations/tabs/ByTotalRepositories';
import LocationRepositories from './LocationRepositories';
import LocationDevelopers from './LocationDevelopers';
import LocationLanguages from './LocationLanguages';
import Location from './Location';

// Languages
import Languages from './Languages';
import LanguagesByTotalDevelopers from './Languages/tabs/ByTotalDevelopers';
import LanguagesByTotalRepositories from './Languages/tabs/ByTotalRepositories';
import Language from './Language';
import LanguageRepositories from './LanguageRepositories';
import LanguageDevelopers from './LanguageDevelopers';
import LanguageLocation from './LanguageLocation';

// Respositories
import Repositories from './Repositories';
import RepositoriesByForks from './Repositories/tabs/ByForks';
import RepositoriesByDate from './Repositories/tabs/ByDate';
import Repository from './Repository';

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
    uri: Config.API_URL,
  }),
  cache,
});

const withProvider = (Component, client = localClient) =>
  class extends React.Component {
    static options = Component.options;

    render() {
      return (
        <ApolloProvider client={client}>
          <Component {...this.props} />
        </ApolloProvider>
      );
    }
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
  DeveloperRepositories: {
    screen: 'app.DeveloperRepositories',
    generator: () => withProvider(DeveloperRepositories),
    title: 'Meşhur Repoları',
  },
  DeveloperLanguages: {
    screen: 'app.DeveloperLanguages',
    generator: () => withProvider(DeveloperLanguages),
    title: 'Dil Kullanımı',
  },
  Developer: {
    screen: 'app.Developer',
    generator: () => withProvider(Developer),
    title: 'Developer',
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
  LocationRepositories: {
    screen: 'app.LocationRepositories',
    generator: () => withProvider(LocationRepositories),
    title: 'Meşhur Repolar',
  },
  Location: {
    screen: 'app.Location',
    generator: () => withProvider(Location),
    title: 'Location',
  },
  LocationDevelopers: {
    screen: 'app.LocationDevelopers',
    generator: () => withProvider(LocationDevelopers),
    title: 'Meşhur Geliştiriciler',
  },
  LocationLanguages: {
    screen: 'app.LocationLanguages',
    generator: () => withProvider(LocationLanguages),
    title: 'Dil Kullanımı',
  },

  Languages: {
    screen: 'app.Languages',
    generator: () => withProvider(Languages),
    title: 'Diller',
    label: 'Diller',
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
  Language: {
    screen: 'app.Language',
    generator: () => withProvider(Language),
    title: 'Language',
  },
  LanguageRepositories: {
    screen: 'app.LanguageRepositories',
    generator: () => withProvider(LanguageRepositories),
    title: 'Meşhur Repolar',
  },
  LanguageDevelopers: {
    screen: 'app.LanguageDevelopers',
    generator: () => withProvider(LanguageDevelopers),
    title: 'Geliştirici Kullanımı',
  },
  LanguageLocation: {
    screen: 'app.LanguageLocation',
    generator: () => withProvider(LanguageLocation),
    title: 'Şehir Dağılımı',
  },

  Repositories: {
    screen: 'app.Repositories',
    generator: () => withProvider(Repositories),
    title: 'Repolar',
    label: 'Repolar',
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
  Repository: {
    screen: 'app.Repository',
    generator: () => withProvider(Repository),
    title: 'Repository',
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
