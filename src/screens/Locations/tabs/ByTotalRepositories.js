import React from 'react';
import LocationList from '../LocationList';

import { Container } from '../../../components';

const ByTotalRepositories = ({ navigator }) => (
  <Container>
    <LocationList
      navigator={navigator}
      orderBy={{ field: 'TOTAL_REPOSITORIES', direction: 'DESC' }}
    />
  </Container>
);

export default ByTotalRepositories;
