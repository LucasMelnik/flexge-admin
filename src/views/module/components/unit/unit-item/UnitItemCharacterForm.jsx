import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../../core/layout/Row';
import Column from '../../../../../core/layout/Column';
import FormButtons from '../../../../../core/form/FormButtons';
import FetchSelect from '../../../../../core/form/FetchSelect';
import Switch from '../../../../../core/form/Switch';

const UnitItemCharacterForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={1}>
        <Switch
          label="Random Characters ?"
          titleOff="False"
          titleOn="True"
          onChange={value => props.onChange('randomCharacters', value)}
          value={get(props.values, 'randomCharacters', false)}
          disabled={props.submitting}
        />
      </Column>
      {!get(props.values, 'randomCharacters', false) && (
        <Column size={2}>
          <FetchSelect
            showSearch
            url="characters"
            disabled={props.submitting}
            label="Character"
            value={get(props.values, 'character', '')}
            onChange={character => props.onChange('character', character)}
            errorText={get(props.errors, 'character', '')}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      )}
    </Row>
    <FormButtons
      confirmLabel="Set Character"
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

UnitItemCharacterForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

UnitItemCharacterForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default UnitItemCharacterForm;
