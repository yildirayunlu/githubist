import React from 'react';
import LanguageList from '../LanguageList';

import { Container } from '../../../components';

const ByTotalRepositories = () => (
  <Container>
    <LanguageList orderBy={{ field: 'TOTAL_REPOSITORIES', direction: 'DESC' }} />
  </Container>
);

export default ByTotalRepositories;
