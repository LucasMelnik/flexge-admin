import React from 'react';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';
import KidsCertificatesListContainer from './KidsCertificatesListContainer';
import KidsCertificatesListFilterContainer from './KidsCertificatesListFilterContainer';

const KidsCertificatesListScene = () => (
  <div>
    <Card title="Kids Certificates">
      <KidsCertificatesListFilterContainer />
    </Card>
    <Separator />
    <Card>
      <KidsCertificatesListContainer />
    </Card>
  </div>
);

export default KidsCertificatesListScene;
