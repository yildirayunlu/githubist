import React from 'react';
import LocationList from '../LocationList';

const ByTotalDevelopers = ({ header }) => (
  <LocationList
    headerComponent={header}
    orderBy={{ field: 'TOTAL_DEVELOPERS', direction: 'DESC' }}
  />
);

export default ByTotalDevelopers;
