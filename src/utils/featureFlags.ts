// Feature flags utility for controlling feature visibility
// This allows us to enable/disable features based on environment

export const featureFlags = {
  // 3D Model Viewer - only enabled in development
  enable3DModelViewer: import.meta.env.VITE_ENABLE_3D_MODEL_VIEWER === 'true',
  
  // Authentication features - disabled for July 10th launch
  enableAuthFeatures: import.meta.env.VITE_ENABLE_AUTH_FEATURES === 'true',
  
  // Fundraising features - enabled
  enableFundraisingFeatures: import.meta.env.VITE_ENABLE_FUNDRAISING_FEATURES === 'true',
  
  // Development mode
  isDevMode: import.meta.env.VITE_DEV_MODE === 'true',
} as const;

// Helper function to check if we're in development
export const isDevelopment = () => {
  return import.meta.env.DEV || featureFlags.isDevMode;
};

// Helper function to check if we're in production
export const isProduction = () => {
  return import.meta.env.PROD && !featureFlags.isDevMode;
};

// Helper function to check if a feature is enabled
export const isFeatureEnabled = (feature: keyof typeof featureFlags): boolean => {
  return featureFlags[feature] as boolean;
};

// Log feature flags in development
if (isDevelopment()) {
  console.log('🚀 Feature Flags:', featureFlags);
}
