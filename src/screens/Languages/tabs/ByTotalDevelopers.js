import React from 'react';
import LanguageList from '../LanguageList';

import { Container } from '../../../components';

const ByTotalDevelopers = () => (
  <Container>
    <LanguageList orderBy={{ field: 'TOTAL_DEVELOPERS', direction: 'DESC' }} />
  </Container>
);

export default ByTotalDevelopers;
