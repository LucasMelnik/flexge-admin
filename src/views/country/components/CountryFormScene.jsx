import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import CountryFormContainer from './CountryFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const CountryFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.params.countryId ? 'Edit Country' : 'Create Country'}`,
        },
      ]}
    />
    <Card
      title={props.params.countryId ? 'Edit Country' : 'Create Country'}
      actions={
        (
          <Button
            icon="arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <CountryFormContainer countryId={props.params.countryId} />
    </Card>
  </div>
);

CountryFormScene.propTypes = {
  params: PropTypes.shape({
    countryId: PropTypes.string,
  }),
};

CountryFormScene.defaultProps = {
  params: null,
};

export default CountryFormScene;
