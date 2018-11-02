import React from 'react';
import RepositoryList from '../RepositoryList';

import { Container } from '../../../components';

const ByForks = () => (
  <Container>
    <RepositoryList orderBy={{ field: 'FORKS', direction: 'DESC' }} />
  </Container>
);

export default ByForks;
