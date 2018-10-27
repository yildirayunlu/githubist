import React from 'react';
import DeveloperList from '../DeveloperList';

const ByFollowers = () => <DeveloperList orderBy={{ field: 'FOLLOWERS', direction: 'DESC' }} />;

export default ByFollowers;
