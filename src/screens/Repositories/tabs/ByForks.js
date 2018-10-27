import React from 'react';
import RepositoryList from '../RepositoryList';

const ByForks = () => <RepositoryList orderBy={{ field: 'FORKS', direction: 'DESC' }} />;

export default ByForks;
