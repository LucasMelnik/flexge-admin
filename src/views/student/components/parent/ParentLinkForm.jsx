import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import AutoComplete from '../../../../core/form/AutoComplete';
import Button from '../../../../core/form/Button';

const ParentForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={6}>
        <AutoComplete
          disabled={props.submitting}
          label="Link Parent to this student"
          value={get(props.values, 'parent', get(props.values, 'parentFilter'))}
          errorText={get(props.errors, 'parent', null)}
          labelPath="name"
          onChange={(value) => {
            props.onChange('parentFilter', value);
            props.onChange('parent', undefined);
            props.onParentsSearch();
          }}
          onSelect={value => props.onChange('parent', value)}
          dataSource={props.parents}
          fetching={props.fetchingParents}
          placeholder="Find a parent by name or email"
        />
        <p
          style={{
            position: 'relative',
            top: -25,
          }}
        >
          * If you have already registered the parent, you can find him by name or email using the field above.
        </p>
      </Column>
      <Column size={2}>
        <div style={{ height: 42 }} />
        <Button
          disabled={props.submitting}
          label="Add Parent to Student"
          icon="link"
          buttonType="submit"
        />
      </Column>
    </Row>
  </form>
);

ParentForm.propTypes = {
  onSubmit: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  fetchingParents: PropTypes.bool,
  parents: PropTypes.arrayOf(PropTypes.object),
  onParentsSearch: PropTypes.func.isRequired,
};

ParentForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  fetchingParents: false,
  parents: [],
  onSubmit: () => alert('submitted'),
};

export default ParentForm;
