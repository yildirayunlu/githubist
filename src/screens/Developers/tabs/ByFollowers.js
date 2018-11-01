import React from 'react';
import DeveloperList from '../DeveloperList';
import { Container } from '../../../components';

const ByFollowers = ({ navigator }) => (
  <Container>
    <DeveloperList navigator={navigator} orderBy={{ field: 'FOLLOWERS', direction: 'DESC' }} />
  </Container>
);

export default ByFollowers;
