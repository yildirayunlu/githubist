import React from 'react';
import LanguageList from '../LanguageList';

const ByTotalDevelopers = ({ header }) => (
  <LanguageList
    headerComponent={header}
    orderBy={{ field: 'TOTAL_DEVELOPERS', direction: 'DESC' }}
  />
);

export default ByTotalDevelopers;
