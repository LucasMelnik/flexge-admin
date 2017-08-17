import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FetchSelect from '../../../core/form/FetchSelect';

const SchoolClassDetailForm = props => (
  <Row>
    <Column lgSize={4}>
      <TextInput
        disabled
        label="Class Name"
        value={get(props.values, 'name', '')}
      />
    </Column>
    <Column lgSize={4}>
      <FetchSelect
        url="/teachers"
        disabled
        label="Teacher"
        value={get(props.values, 'teacher', '')}
        resultTransformer={{
          text: 'name',
          value: 'id',
        }}
      />
    </Column>
    <Column lgSize={4}>
      <FetchSelect
        url="/schools"
        disabled
        label="School"
        value={get(props.values, 'school', '')}
        resultTransformer={{
          text: 'name',
          value: 'id',
        }}
      />
    </Column>
  </Row>
);

SchoolClassDetailForm.propTypes = {
  values: PropTypes.object,
};

SchoolClassDetailForm.defaultProps = {
  values: {},
};

export default SchoolClassDetailForm;
