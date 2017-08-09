import React from 'react';
import PropTypes from 'prop-types';
import Block from 'jsxstyle/Block';
import InlineBlock from 'jsxstyle/InlineBlock';
import { browserHistory } from 'react-router';
import Separator from '../../../core/layout/Separator';
import Title from '../../../core/layout/Title';
import Button from '../../../core/form/Button';
import CompanyFormContainer from './CompanyFormContainer';
// import CompanyManagerSceneContainer from '../../company-manager/components/CompanyManagerSceneContainer';

const CompanyFormScene = props => (
  <div>
    <InlineBlock>
      <Title>
        {props.companyId ? (
          'Company Informations'
        ) : (
          'New Company'
        )}
      </Title>
    </InlineBlock>
    <Button
      secondary
      style={{
        position: 'relative',
        float: 'right',
        top: 20,
        right: 20,
      }}
      onClick={() => browserHistory.push('/companies')}
    />
    <Separator size="sm" />
    <CompanyFormContainer />
    {props.companyId && (
      <Block marginTop={20}>
        {/* <CompanyManagerSceneContainer companyId={props.companyId} /> */}
      </Block>
    )}
  </div>
);

CompanyFormScene.propTypes = {
  companyId: PropTypes.string,
};

CompanyFormScene.defaultProps = {
  companyId: null,
};

export default CompanyFormScene;
