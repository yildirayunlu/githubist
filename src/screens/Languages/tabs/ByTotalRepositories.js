import React from 'react';
import LanguageList from '../LanguageList';

const ByTotalRepositories = ({ header }) => (
  <LanguageList
    headerComponent={header}
    orderBy={{ field: 'TOTAL_REPOSITORIES', direction: 'DESC' }}
  />
);

export default ByTotalRepositories;
