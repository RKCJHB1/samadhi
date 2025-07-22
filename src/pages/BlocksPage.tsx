import React from 'react';
import { BlocksViewer } from '@/components/BlocksViewer';
import { featureFlags } from '@/utils/featureFlags';

const BlocksPage: React.FC = () => {
  // Only show in development mode
  if (!featureFlags.isDevMode) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Page Not Available</h1>
        <p className="text-gray-600">
          This feature is only available in development mode.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlocksViewer />
    </div>
  );
};

export default BlocksPage;
