# Turso Database Setup Guide

This guide will help you set up Turso database and upload your 3D blocks CSV data.

## Prerequisites

1. Node.js installed on your system
2. A Turso account (sign up at https://turso.tech)
3. The Turso CLI installed

## Step 1: Install Turso CLI

### Windows (PowerShell)
```powershell
irm https://get.turso.tech/install.ps1 | iex
```

### macOS/Linux
```bash
curl -sSfL https://get.turso.tech/install.sh | bash
```

### Alternative: Using npm
```bash
npm install -g @turso/cli
```

## Step 2: Authenticate with Turso

```bash
turso auth login
```

This will open your browser to authenticate with Turso.

## Step 3: Create a Database

```bash
# Create a new database
turso db create blocks-db

# Get the database URL
turso db show blocks-db --url

# Create an auth token
turso db tokens create blocks-db
```

## Step 4: Configure Environment Variables

Update your `.env.local` file with your Turso credentials:

```env
# Turso Database Configuration
VITE_TURSO_DATABASE_URL=libsql://your-database-url.turso.io
VITE_TURSO_AUTH_TOKEN=your_auth_token_here

# For the upload script (without VITE_ prefix)
TURSO_DATABASE_URL=libsql://your-database-url.turso.io
TURSO_AUTH_TOKEN=your_auth_token_here
```

## Step 5: Upload Your CSV Data

Run the upload script:

```bash
npm run upload-blocks
```

This script will:
- Create the necessary database tables and indexes
- Parse your CSV file (`public/pics/turso_ready_blocks.csv`)
- Upload all blocks to the database in batches
- Show progress and statistics

## Step 6: Verify the Upload

You can verify the upload using the Turso CLI:

```bash
# Connect to your database
turso db shell blocks-db

# Check the data
.tables
SELECT COUNT(*) FROM blocks;
SELECT status, COUNT(*) FROM blocks GROUP BY status;
.quit
```

## Database Schema

The blocks table has the following structure:

```sql
CREATE TABLE blocks (
  block_id INTEGER PRIMARY KEY,
  pos_x REAL NOT NULL,
  pos_y REAL NOT NULL,
  pos_z REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  owner_name TEXT,
  purchase_date TEXT,
  custom_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Using the Blocks Viewer

Once your data is uploaded, you can use the BlocksViewer component in your React app:

1. The component is available at `/blocks` (development only)
2. View statistics of available/purchased blocks
3. Search for specific blocks by ID
4. Purchase blocks (updates ownership)
5. Browse available and purchased blocks

## API Functions

The following functions are available in `src/db/sqlite.ts`:

- `getBlock(blockId)` - Get a specific block by ID
- `getBlocksByStatus(status)` - Get blocks by status ('available', 'purchased', etc.)
- `updateBlockOwnership(blockId, ownerName, customMessage)` - Purchase a block
- `getBlockStats()` - Get count statistics by status
- `initializeDatabase()` - Initialize the database schema

## Troubleshooting

### Upload Script Issues

1. **Missing environment variables**: Make sure `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are set
2. **CSV file not found**: Ensure `public/pics/turso_ready_blocks.csv` exists
3. **Network issues**: Check your internet connection and Turso service status

### Database Connection Issues

1. **Invalid URL/Token**: Verify your credentials are correct
2. **Database not found**: Make sure the database exists in your Turso account
3. **Permission denied**: Ensure your auth token has the necessary permissions

### Performance Considerations

- The upload script processes data in batches of 1000 for optimal performance
- Indexes are created on commonly queried fields (status, position, owner)
- The React component limits displayed results to 100 items for performance

## Next Steps

1. Integrate the blocks data with your 3D model viewer
2. Add payment processing for block purchases
3. Implement user authentication for ownership tracking
4. Add more advanced filtering and search capabilities

## Support

- Turso Documentation: https://docs.turso.tech
- Turso Discord: https://discord.gg/turso
- GitHub Issues: Create an issue in your repository for project-specific problems
