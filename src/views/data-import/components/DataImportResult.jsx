import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'antd';
import get from 'lodash/get';
import Tabs from '../../../core/layout/Tabs';
import DataImportResultList from './DataImportResultList';

const DataImportResult = props => (
  <Tabs
    tabs={[
      {
        key: 'company',
        title: (
          <Badge
            offset={[0, 7]}
            count={get(props.data, 'companies', []).filter(x => x.errors && x.errors.length).length}
          >
            Companies
          </Badge>
        ),
        content: <DataImportResultList data={get(props.data, 'companies', [])} />,
      },
      {
        key: 'schools',
        title: (
          <Badge
            offset={[0, 7]}
            count={get(props.data, 'schools', []).filter(x => x.errors && x.errors.length).length}
          >
            Schools
          </Badge>
        ),
        content: <DataImportResultList data={get(props.data, 'schools', [])} />,
      },
      {
        key: 'user',
        title: (
          <Badge
            offset={[0, 7]}
            count={get(props.data, 'users', []).filter(x => x.errors && x.errors.length).length}
          >
            Users
          </Badge>
        ),
        content: <DataImportResultList data={get(props.data, 'users', [])} />,
      },
      {
        key: 'schoolclass',
        title: (
          <Badge
            offset={[0, 7]}
            count={get(props.data, 'schoolClasses', []).filter(x => x.errors && x.errors.length).length}
          >
            School Classes
          </Badge>
        ),
        content: <DataImportResultList data={get(props.data, 'schoolClasses', [])} />,
      },
      {
        key: 'student',
        title: (
          <Badge
            offset={[0, 7]}
            count={get(props.data, 'students', []).filter(x => x.errors && x.errors.length).length}
          >
            Students
          </Badge>
        ),
        content: <DataImportResultList data={get(props.data, 'students', [])} />,
      },
    ]}
  />
);

DataImportResult.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default DataImportResult;
