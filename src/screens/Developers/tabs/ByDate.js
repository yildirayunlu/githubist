import React from 'react';
import DeveloperList from '../DeveloperList';

const ByDate = ({ header }) => (
  <DeveloperList
    headerComponent={header}
    orderBy={{ field: 'GITHUB_CREATED_AT', direction: 'ASC' }}
  />
);

export default ByDate;
