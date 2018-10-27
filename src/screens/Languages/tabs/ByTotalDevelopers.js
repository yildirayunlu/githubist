import React from 'react';
import LanguageList from '../LanguageList';

const ByTotalDevelopers = () => (
  <LanguageList orderBy={{ field: 'TOTAL_DEVELOPERS', direction: 'DESC' }} />
);

export default ByTotalDevelopers;
