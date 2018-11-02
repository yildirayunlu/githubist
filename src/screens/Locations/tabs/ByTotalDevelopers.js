import React from 'react';
import LocationList from '../LocationList';

import { Container } from '../../../components';

const ByTotalDevelopers = ({ navigator }) => (
  <Container>
    <LocationList
      navigator={navigator}
      orderBy={{ field: 'TOTAL_DEVELOPERS', direction: 'DESC' }}
    />
  </Container>
);

export default ByTotalDevelopers;
