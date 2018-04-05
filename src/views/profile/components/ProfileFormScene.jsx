import React from 'react';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import ProfileFormContainer from './ProfileFormContainer';

const ProfileFormScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Profile',
        },
      ]}
    />
    <Card
      title="Your Profile"
    >
      <ProfileFormContainer />
    </Card>
  </div>
);

export default ProfileFormScene;
