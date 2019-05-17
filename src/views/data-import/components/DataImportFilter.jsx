import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import FetchSelect from '../../../core/form/FetchSelect';

export default class DataImportFilter extends Component {
  static propTypes = {
    values: PropTypes.object,
    errors: PropTypes.object,
    submitting: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
  };

  static defaultProps = {
    values: {},
    errors: {},
    submitting: false,
  };

  render() {
    return (
      <Row>
        <Column size={4}>
          <FetchSelect
            url="/distributors"
            disabled={this.props.submitting}
            label="Select a distributor to import the data"
            value={get(this.props.values, 'distributor', '')}
            onChange={(value) => {
              this.props.onChange('distributor', value);
              this.props.onFilter();
            }}
            description={get(this.props.errors, 'distributor', null)}
            fieldValidation={get(this.props.errors, 'distributor', null) && 'error'}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      </Row>
    );
  }
}
