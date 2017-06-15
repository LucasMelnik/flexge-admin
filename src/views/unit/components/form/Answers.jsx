import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../../core/form/TextInput';
import Button from '../../../../core/form/Button';
import Separator from '../../../../core/layout/Separator';
import Switch from '../../../../core/form/Switch';
import Table from '../../../../core/content/Table';

const Answers = props => (
  <div>
    <div className="row">
      <div className="col-lg-6">
        <TextInput
          floatingLabel
          fullWidth
          disabled={props.submitting}
          label="Unit Name"
          value={get(props.values, 'answer', '')}
          onChange={value => props.onChange('answer', value)}
          error={get(props.errors, 'answer', '')}
        />
      </div>
      <div className="col-lg-1">
        <Switch
          label="Correct"
          toggled
          onChange={value => props.onChange('', value)}
        />
      </div>
      <div className="col-lg-5">
        <Button
          icon="done"
          secondary
          disabled={props.submitting || !props.isDirty()}
          type="submit"
          label={'Save'}
        />
      </div>
    </div>
    <div className="row">
      <Table
        columns={[
          {
            label: 'Answer',
            path: 'answer',
          },
          {
            label: 'Correct',
            path: 'correct',
          },
          {
            label: 'Actions',
            path: '',
          },
        ]}
      />
    </div>
    <Separator size="xs" />
  </div>
);

Answers.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

Answers.defaultProps = {
  values: {},
  errors: {},
  isDirty: () => false,
  onChange: () => false,
};

export default Answers;
