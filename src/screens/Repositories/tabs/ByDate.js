import React from 'react';
import RepositoryList from '../RepositoryList';

const ByDate = () => <RepositoryList orderBy={{ field: 'GITHUB_CREATED_AT', direction: 'ASC' }} />;

export default ByDate;
