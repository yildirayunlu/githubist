import React from 'react';
import DeveloperList from '../DeveloperList';
import { Container } from '../../../components';

const ByTotalStarred = ({ navigator }) => (
  <Container>
    <DeveloperList navigator={navigator} orderBy={{ field: 'TOTAL_STARRED', direction: 'DESC' }} />
  </Container>
);

export default ByTotalStarred;
