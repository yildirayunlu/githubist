import React from 'react';
import LanguageList from '../LanguageList';

const ByScore = ({ header }) => (
  <LanguageList headerComponent={header} orderBy={{ field: 'SCORE', direction: 'DESC' }} />
);

export default ByScore;
