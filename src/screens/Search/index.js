import React, { PureComponent } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import { Routes } from '..';
import Styles from '../../styles';
import { Container, AppText } from '../../components';

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
    };
  }

  getSuggestionType = type => {
    switch (type) {
      case 'DEVELOPER':
        return 'Geliştirici';

      case 'LANGUAGE':
        return 'Dil';

      case 'LOCATION':
        return 'Şehir';

      case 'REPOSITORY':
        return 'Repo';

      default:
        return 'Bilinmiyor';
    }
  };

  pressSuggestionItem = item => {
    const { navigator } = this.props;

    switch (item.type) {
      case 'DEVELOPER':
        return navigator.push({
          ...Routes.Developer,
          title: item.name,
          backButtonTitle: '',
          passProps: { username: item.slug },
        });

      case 'LANGUAGE':
        return navigator.push({
          ...Routes.Language,
          title: item.name,
          backButtonTitle: '',
          passProps: { slug: item.slug },
        });

      case 'LOCATION':
        return navigator.push({
          ...Routes.Location,
          title: item.name,
          backButtonTitle: '',
          passProps: { slug: item.slug },
        });

      case 'REPOSITORY':
        return navigator.push({
          ...Routes.Repository,
          title: item.slug,
          backButtonTitle: '',
          passProps: { slug: item.slug },
        });

      default:
        return navigator.push({
          ...Routes.Developers,
          backButtonTitle: '',
        });
    }
  };

  onChangeText = client => value => {
    if (!value) {
      this.setState({ suggestions: [] });
      return;
    }

    const query = gql`
      query($query: String!) {
        search(query: $query) {
          name
          slug
          type
        }
      }
    `;

    client.query({ query, variables: { query: value } }).then(({ data }) => {
      this.setState({ suggestions: data.search });
      // console.log(data.search);
    });
  };

  render() {
    const { suggestions } = this.state;

    return (
      <ApolloConsumer>
        {client => (
          <ScrollView style={styles.container}>
            <Container>
              <View>
                <AppText style={styles.label}>Geliştirici, şehir, repo veya dil ara</AppText>
                <TextInput style={styles.input} onChangeText={this.onChangeText(client)} />
                <View style={styles.suggestions}>
                  {suggestions.map(item => (
                    <TouchableOpacity
                      onPress={() => this.pressSuggestionItem(item)}
                      key={item.slug}
                      activeOpacity={0.8}
                      style={styles.item}
                    >
                      <AppText style={styles.name}>{item.name}</AppText>
                      <AppText>{this.getSuggestionType(item.type)}</AppText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Container>
          </ScrollView>
        )}
      </ApolloConsumer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: Styles.variables.spacing.normal,
  },
  label: {
    marginBottom: Styles.variables.spacing.xSmall,
  },
  input: {
    borderWidth: 1,
    borderColor: Styles.colors.textMuted,
    backgroundColor: Styles.colors.white,
    padding: 10,
    borderRadius: 4,
  },
  suggestions: {
    marginTop: 10,
  },
  item: {
    marginBottom: Styles.variables.spacing.xSmall,
  },
  name: {
    fontSize: Styles.variables.fontSizes.normal,
    fontWeight: '500',
  },
});

export default Search;
