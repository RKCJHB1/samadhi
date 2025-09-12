import React from 'react';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import ReadPublicProfilePage from './ReadPublicProfilePage';

export default function ReadPublicProfilePageWrapper() {
  return (
    <ErrorBoundary>
      <ReadPublicProfilePage />
    </ErrorBoundary>
  );
}

