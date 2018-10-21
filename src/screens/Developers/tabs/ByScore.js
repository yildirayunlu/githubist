import React from 'react';
import DeveloperList from '../DeveloperList';

const ByScore = () => <DeveloperList orderBy={{ field: 'SCORE', direction: 'DESC' }} />;

export default ByScore;
