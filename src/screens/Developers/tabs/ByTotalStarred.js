import React from 'react';
import DeveloperList from '../DeveloperList';

const ByTotalStarred = ({ header }) => (
  <DeveloperList headerComponent={header} orderBy={{ field: 'TOTAL_STARRED', direction: 'DESC' }} />
);

export default ByTotalStarred;
