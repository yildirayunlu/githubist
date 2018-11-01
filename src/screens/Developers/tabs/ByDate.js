import React from 'react';
import DeveloperList from '../DeveloperList';

import { Container } from '../../../components';

const ByDate = ({ navigator }) => (
  <Container>
    <DeveloperList
      navigator={navigator}
      orderBy={{ field: 'GITHUB_CREATED_AT', direction: 'ASC' }}
    />
  </Container>
);

export default ByDate;
