import React from 'react';
import RepositoryList from '../RepositoryList';

const ByStars = () => <RepositoryList orderBy={{ field: 'STARS', direction: 'DESC' }} />;

export default ByStars;
