import React from 'react';
import PropTypes from 'prop-types';
import CompanyFormContainer from './CompanyFormContainer';

const CompanyFormScene = props => (
  <div>
    <CompanyFormContainer companyId={props.params.companyId} />
  </div>
);

CompanyFormScene.propTypes = {
  params: PropTypes.shape({
    companyId: PropTypes.string,
  }),
};

CompanyFormScene.defaultProps = {
  params: null,
};

export default CompanyFormScene;
