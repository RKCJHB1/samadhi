import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import ContentManagement from '../../components/admin/ContentManagement';
import AdminNav from '@/components/admin/AdminNav';

const ContentManagementPage: React.FC = () => {
  return (
    <PageLayout title="Content Management | Admin">
      <AdminNav />
      <ContentManagement />
    </PageLayout>
  );
};

export default ContentManagementPage;
