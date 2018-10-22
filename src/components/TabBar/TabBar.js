import React from 'react';
import { TabBar as TabBarBase } from 'react-native-tab-view';
import { StyleSheet } from 'react-native';

import Style from '../../styles';

import { TabBarItem } from '..';

const TabBar = props => (
  <TabBarBase
    {...props}
    renderLabel={({ route }) => <TabBarItem>{route.title}</TabBarItem>}
    scrollEnabled
    style={styles.tabbar}
    indicatorStyle={{ backgroundColor: 'red' }}
  />
);

const styles = StyleSheet.create({
  tabbar: {
    elevation: 0,
    backgroundColor: Style.colors.white,
  },
});

export default TabBar;
