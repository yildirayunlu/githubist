import React from 'react';
import LocationList from '../LocationList';

const ByTotalRepositories = ({ header }) => (
  <LocationList
    headerComponent={header}
    orderBy={{ field: 'TOTAL_REPOSITORIES', direction: 'DESC' }}
  />
);

export default ByTotalRepositories;
