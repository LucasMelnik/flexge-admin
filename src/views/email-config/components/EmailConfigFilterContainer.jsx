import React from 'react';
import { observer } from 'mobx-react';
import EmailConfigFilter from './EmailConfigFilter';
import EmailConfigFilterService from '../services/EmailConfigFilterService';

const EmailConfigFilterContainer = () => (
  <EmailConfigFilter
    value={EmailConfigFilterService.schoolId || ''}
    onChange={EmailConfigFilterService.handleFilterChange}
  />
);

export default observer(EmailConfigFilterContainer);
