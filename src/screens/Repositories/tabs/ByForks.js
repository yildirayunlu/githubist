import React from 'react';
import RepositoryList from '../RepositoryList';

const ByForks = ({ header }) => (
  <RepositoryList headerComponent={header} orderBy={{ field: 'FORKS', direction: 'DESC' }} />
);

export default ByForks;
