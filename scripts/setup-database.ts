#!/usr/bin/env tsx

import { execSync } from 'child_process';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

async function setupDatabase() {
  console.log('🚀 Setting up database...');

  try {
    // Check if DATABASE_URL is set
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl || databaseUrl === 'your_supabase_database_url_here') {
      console.error('❌ DATABASE_URL not set in .env.local');
      console.log('Please add your Supabase database URL to .env.local');
      console.log(
        'You can find it in your Supabase dashboard under Settings > Database'
      );
      process.exit(1);
    }

    console.log('📋 Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });

    console.log('🗄️  Pushing schema to database...');
    execSync('npx prisma db push', { stdio: 'inherit' });

    console.log('✅ Database setup complete!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Check your Supabase dashboard to see the tables');
    console.log('2. Set up Row Level Security (RLS) policies');
    console.log('3. Create your first user and test the connection');
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
