# My Adventure - Interactive Game Management Platform

A Next.js-based web application for managing tabletop RPG adventures, characters, and game worlds. Built with modern web technologies and a focus on user experience.

## Features

- **Authentication System**: Secure user registration and login with Supabase
- **Character Management**: Create and manage RPG characters with custom attributes
- **World Building**: Design and organize game worlds and settings
- **Dashboard**: Comprehensive overview of your gaming sessions and statistics
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React 18, TypeScript
- **Styling**: Tailwind CSS with PostCSS
- **State Management**: Zustand for authentication, React Query for data fetching
- **Database**: Prisma ORM with PostgreSQL
- **Authentication**: Supabase Auth
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- PostgreSQL database
- Supabase account

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd my-adventure
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:

```env
DATABASE_URL="your-postgresql-connection-string"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

4. Set up the database:

```bash
npm run db:setup
# or
yarn db:setup
# or
pnpm db:setup
# or
bun db:setup
```

5. Run database migrations:

```bash
npx prisma migrate dev
```

6. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/           # Authentication routes
│   ├── api/              # API endpoints
│   └── dashboard/        # Main dashboard
├── components/            # Reusable React components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── providers/             # Context providers
├── stores/                # Zustand state stores
├── types/                 # TypeScript type definitions
└── utils/                 # Helper functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:setup` - Initialize database schema

## Database Schema

The application uses Prisma with the following main models:

- **User**: Authentication and user profile information
- **Character**: Player characters with customizable attributes
- **World**: Game world settings and configurations
- **GameSession**: Individual gaming sessions and progress

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.
