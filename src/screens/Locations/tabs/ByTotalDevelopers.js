import React from 'react';
import LocationList from '../LocationList';

const ByTotalDevelopers = () => (
  <LocationList orderBy={{ field: 'TOTAL_DEVELOPERS', direction: 'DESC' }} />
);

export default ByTotalDevelopers;
