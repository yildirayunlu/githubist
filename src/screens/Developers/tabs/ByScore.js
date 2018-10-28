import React from 'react';
import DeveloperList from '../DeveloperList';

const ByScore = ({ navigator }) => (
  <DeveloperList navigator={navigator} orderBy={{ field: 'SCORE', direction: 'DESC' }} />
);

export default ByScore;
