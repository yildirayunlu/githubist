import React from 'react';
import RepositoryList from '../RepositoryList';

const ByDate = ({ header }) => (
  <RepositoryList
    headerComponent={header}
    orderBy={{ field: 'GITHUB_CREATED_AT', direction: 'ASC' }}
  />
);

export default ByDate;
