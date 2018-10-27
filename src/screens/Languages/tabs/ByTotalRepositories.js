import React from 'react';
import LanguageList from '../LanguageList';

const ByTotalRepositories = () => (
  <LanguageList orderBy={{ field: 'TOTAL_REPOSITORIES', direction: 'DESC' }} />
);

export default ByTotalRepositories;
