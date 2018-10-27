import React from 'react';
import LanguageList from '../LanguageList';

const ByScore = () => <LanguageList orderBy={{ field: 'SCORE', direction: 'DESC' }} />;

export default ByScore;
