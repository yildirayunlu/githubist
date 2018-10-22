import React from 'react';
import DeveloperList from '../DeveloperList';

const ByScore = ({ header }) => (
  <DeveloperList headerComponent={header} orderBy={{ field: 'SCORE', direction: 'DESC' }} />
);

export default ByScore;
