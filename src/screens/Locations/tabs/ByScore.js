import React from 'react';
import LocationList from '../LocationList';

const ByScore = ({ header }) => (
  <LocationList headerComponent={header} orderBy={{ field: 'SCORE', direction: 'DESC' }} />
);

export default ByScore;
