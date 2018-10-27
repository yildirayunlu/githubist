import React from 'react';
import DeveloperList from '../DeveloperList';

const ByTotalStarred = () => (
  <DeveloperList orderBy={{ field: 'TOTAL_STARRED', direction: 'DESC' }} />
);

export default ByTotalStarred;
