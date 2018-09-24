import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Select from '../../../../core/form/Select';

const ContentDetailFilter = props => (
  <Select
    disabled={props.fetching}
    value={get(props.values, 'type')}
    onChange={(value) => {
      props.onChange('type', value);
      props.onFilter();
    }}
    options={[
      {
        value: 1,
        label: 'Your Challenge',
      },
      {
        value: 2,
        label: 'First Review',
      },
      {
        value: 3,
        label: 'Second Review',
      },
    ]}
  />
);

ContentDetailFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default ContentDetailFilter;
