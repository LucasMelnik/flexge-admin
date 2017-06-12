import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';
import Switch from '../../../core/form/Switch';
import Select from '../../../core/form/Select';

import MenuItem from 'material-ui/MenuItem';

const UnitForm = props => (
  <Paper>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <div className="row">
        <div className="col-lg-6">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Unit Name"
            value={get(props.values, 'name', '')}
            onChange={value => props.onChange('name', value)}
            error={get(props.errors, 'name', '')}
          />
        </div>
        <div className="col-lg-6">
          <Switch
            label="Enabled"
            toggled
            onChange={value => props.onChange('', value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Order"
            value={get(props.values, 'order', '')}
            onChange={value => props.onChange('order', value)}
            error={get(props.errors, 'order', '')}
          />
        </div>
        <div className="col-lg-4">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Time (minutes)"
            value={get(props.values, 'time', '')}
            onChange={value => props.onChange('time', value)}
            error={get(props.errors, 'time', '')}
          />
        </div>
        <div className="col-lg-4">
          <Select
            floatingLabel
            fullWidth
            options={[
              { label: 'EASY', value: 0 },
              { label: 'MEDIUM', value: 1 },
              { label: 'HARD', value: 2 },
            ]}
            disabled={props.submitting}
            label="Difficulty"
            value={get(props.values, 'difficulty', '')}
            onChange={value => props.onChange('difficulty', value)}
            error={get(props.errors, 'difficulty', '')}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <Select
            floatingLabel
            fullWidth
            options={[
              { label: '70', value: 70 },
              { label: '75', value: 75 },
              { label: '80', value: 80 },
              { label: '85', value: 85 },
              { label: '90', value: 90 },
            ]}
            disabled={props.submitting}
            label="Score to pass"
            value={get(props.values, 'scoreToPass', '')}
            onChange={value => props.onChange('scoreToPass', value)}
            error={get(props.errors, 'scoreToPass', '')}
          />
        </div>
        <div className="col-lg-4">
          <Select
            floatingLabel
            fullWidth
            options={[
              { label: 'Answering Question', value: 0 },
              { label: 'Dictation', value: 1 },
              { label: 'Gap Fill', value: 2 },
              { label: 'Grammar', value: 3 },
              { label: 'Movie', value: 1 },
              { label: 'Multiple Complete Phrase', value: 1 },
              { label: 'Presentation', value: 1 },
              { label: 'Pronunciation', value: 1 },
              { label: 'Speech Practice', value: 1 },
              { label: 'True / False', value: 1 },
              { label: 'Unscramble Phrase Drag and Drop', value: 1 },
            ]}
            disabled={props.submitting}
            label="Unit Type"
            value={get(props.values, 'scoreToPass', '')}
            onChange={value => props.onChange('scoreToPass', value)}
            error={get(props.errors, 'scoreToPass', '')}
          />
        </div>
      </div>
      <Separator size="xs" />
      <Button
        icon="done"
        secondary
        fullWidth
        disabled={props.submitting || !props.isDirty()}
        type="submit"
        label={props.values.id ? 'Update Unit' : 'Create Unit'}
      />
      <Separator size="xs" />
      <Button
        icon="clear"
        fullWidth
        disabled={props.submitting || !props.isDirty()}
        onClick={props.onReset}
        label="Discard changes"
      />
    </form>
  </Paper>
);

UnitForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

UnitForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
};

export default UnitForm;
