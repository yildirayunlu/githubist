import React from 'react';
import LocationList from '../LocationList';

const ByTotalRepositories = () => (
  <LocationList orderBy={{ field: 'TOTAL_REPOSITORIES', direction: 'DESC' }} />
);

export default ByTotalRepositories;
