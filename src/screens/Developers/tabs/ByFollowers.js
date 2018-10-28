import React from 'react';
import DeveloperList from '../DeveloperList';

const ByFollowers = ({ navigator }) => (
  <DeveloperList navigator={navigator} orderBy={{ field: 'FOLLOWERS', direction: 'DESC' }} />
);

export default ByFollowers;
