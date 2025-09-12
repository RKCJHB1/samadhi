# Deployment Configuration

## Cloudflare Pages Setup

This project is configured to deploy on Cloudflare Pages. Here are the required settings:

### Build Configuration

In your Cloudflare Pages dashboard, set the following build settings:

- **Framework preset**: None (Custom)
- **Build command**: `bun run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave empty)

### Environment Variables

Set these environment variables in your Cloudflare Pages dashboard:

```
NODE_VERSION=18.17.1
VITE_ENABLE_3D_MODEL_VIEWER=false
VITE_ENABLE_AUTH_FEATURES=false
VITE_ENABLE_FUNDRAISING_FEATURES=true
VITE_ENABLE_READING_SECTION=true
VITE_DEV_MODE=false
VITE_PAYFAST_MERCHANT_ID=26034585
VITE_PAYFAST_MERCHANT_KEY=thj27onulhboo
```

### Node.js Version

Ensure Node.js version 18.17.1 is selected in the build settings.

### Build Process

The deployment process will:

1. Clone the repository
2. Install dependencies using `bun install`
3. Run the build command `bun run build`
4. Deploy the contents of the `dist` folder

### Feature Flags

The following features are controlled by environment variables:

- **3D Model Viewer**: Disabled in production (`VITE_ENABLE_3D_MODEL_VIEWER=false`)
- **Authentication**: Disabled in production (`VITE_ENABLE_AUTH_FEATURES=false`)
- **Fundraising**: Enabled in production (`VITE_ENABLE_FUNDRAISING_FEATURES=true`)
- **Reading Section**: Enabled in production (`VITE_ENABLE_READING_SECTION=true`)
- **Mantras**: Hidden in production (controlled by `NODE_ENV`)

### Development vs Production

- **Development**: All features available, mantras tab visible
- **Production**: 3D models and auth hidden, mantras tab hidden, fundraising enabled

### Troubleshooting

If deployment fails:

1. Check that `bun.lockb` is up to date
2. Ensure no `wrangler.toml` file exists (not needed for Pages)
3. Verify environment variables are set correctly
4. Check build logs for specific errors

### Local Testing

To test the production build locally:

```bash
bun run build
bun run preview
```

This will build the project and serve it locally to verify everything works correctly.
