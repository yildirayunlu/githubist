import React from 'react';
import DeveloperList from '../DeveloperList';

const ByFollowers = ({ header }) => (
  <DeveloperList headerComponent={header} orderBy={{ field: 'FOLLOWERS', direction: 'DESC' }} />
);

export default ByFollowers;
