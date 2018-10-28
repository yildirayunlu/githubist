import React from 'react';
import DeveloperList from '../DeveloperList';

const ByDate = ({ navigator }) => (
  <DeveloperList navigator={navigator} orderBy={{ field: 'GITHUB_CREATED_AT', direction: 'ASC' }} />
);

export default ByDate;
