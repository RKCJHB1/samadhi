# Feature Flags Documentation

This project uses environment-based feature flags to control which features are visible in different environments.

## Environment Files

### `.env.local` (Development - Not committed to git)
- Used for local development only
- Contains development-specific feature flags
- **This file is ignored by git and will not be pushed to GitHub**

### `.env.production` (Production - Committed to git)
- Used for production deployments
- Contains production-ready feature flags
- **This file is committed to git**

## Feature Flags

### `VITE_ENABLE_3D_MODEL_VIEWER`
- **Development**: `true` - 3D model viewer is visible
- **Production**: `false` - 3D model viewer is hidden
- **Purpose**: Keep 3D model viewer only on local development server

### `VITE_ENABLE_AUTH_FEATURES`
- **Development**: `false` - Authentication features hidden
- **Production**: `false` - Authentication features hidden for July 10th launch
- **Purpose**: Hide login/signup features until ready for public release

### `VITE_ENABLE_FUNDRAISING_FEATURES`
- **Development**: `true` - Fundraising features visible
- **Production**: `true` - Fundraising features visible
- **Purpose**: Control fundraising system visibility

## Usage in Code

```typescript
import { featureFlags } from '../utils/featureFlags';

// Conditionally render features
{featureFlags.enable3DModelViewer && (
  <SimpleModelViewer />
)}

// Check if feature is enabled
if (featureFlags.enableAuthFeatures) {
  // Show auth features
}
```

## Development vs Production

### Local Development (localhost:8080/8081)
- 3D Model Viewer: ✅ Visible
- Authentication: ❌ Hidden
- Fundraising: ✅ Visible

### Production Deployment (GitHub Pages/Live Site)
- 3D Model Viewer: ❌ Hidden
- Authentication: ❌ Hidden  
- Fundraising: ✅ Visible

## How It Works

1. **Local Development**: Uses `.env.local` (not committed to git)
2. **Production Build**: Uses `.env.production` (committed to git)
3. **Feature Flags**: Checked at runtime using `featureFlags` utility
4. **Conditional Rendering**: Features only render when flag is `true`

## Adding New Feature Flags

1. Add the flag to both `.env.local` and `.env.production`
2. Add the flag to `src/utils/featureFlags.ts`
3. Use the flag in your components with conditional rendering

## Security Note

- `.env.local` is never committed to git
- Only `.env.production` is committed with production-safe settings
- This ensures development features stay local and don't appear on the live site
