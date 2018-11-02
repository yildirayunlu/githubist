import React from 'react';
import RepositoryList from '../RepositoryList';

import { Container } from '../../../components';

const ByDate = () => (
  <Container>
    <RepositoryList orderBy={{ field: 'GITHUB_CREATED_AT', direction: 'ASC' }} />
  </Container>
);

export default ByDate;
