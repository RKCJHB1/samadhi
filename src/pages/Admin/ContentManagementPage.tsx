import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import ContentManagement from '../../components/admin/ContentManagement';

const ContentManagementPage: React.FC = () => {
  return (
    <PageLayout title="Content Management | Admin">
      <ContentManagement />
    </PageLayout>
  );
};

export default ContentManagementPage;
