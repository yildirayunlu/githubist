import React from 'react';
import RepositoryList from '../RepositoryList';

const ByStars = ({ header }) => (
  <RepositoryList headerComponent={header} orderBy={{ field: 'STARS', direction: 'DESC' }} />
);

export default ByStars;
