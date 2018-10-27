import React from 'react';
import LocationList from '../LocationList';

const ByScore = () => <LocationList orderBy={{ field: 'SCORE', direction: 'DESC' }} />;

export default ByScore;
