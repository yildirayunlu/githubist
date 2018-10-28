import React from 'react';
import DeveloperList from '../DeveloperList';

const ByTotalStarred = ({ navigator }) => (
  <DeveloperList navigator={navigator} orderBy={{ field: 'TOTAL_STARRED', direction: 'DESC' }} />
);

export default ByTotalStarred;
