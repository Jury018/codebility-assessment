# Fullstack Todo Application

A modern, secure todo application built with Next.js, featuring OAuth authentication and real-time data persistence.

## Implementation Notes

### Key Technical Decisions

- **Tailwind CSS v4**: Migrated to the latest Tailwind v4 with `@tailwindcss/postcss` and CSS-based configuration using `@theme` directive
- **Supabase**: Chosen for authentication (OAuth with Google) and PostgreSQL database for reliable data persistence
- **TypeScript**: Full type safety across the application
- **Server Components**: Leveraging Next.js 15 App Router for optimal performance

### Security Enhancements

Beyond basic requirements, implemented comprehensive security features:
- **CSRF Protection**: Custom token-based validation for all state-changing operations
- **Input Sanitization**: HTML entity escaping to prevent XSS attacks
- **UUID Validation**: Secure ID format validation for all database operations
- **Secure Sessions**: HTTP-only cookies with proper secure flags
- **Input Validation**: Client and server-side validation with length limits (500 chars) and forbidden pattern detection

### Mobile Responsiveness

Fully responsive design with specific mobile optimizations:
- Touch-friendly controls (delete buttons always visible on mobile, no hover required)
- Responsive typography using Tailwind's breakpoint system (`text-sm sm:text-base md:text-lg`)
- Adaptive layouts that stack on mobile and spread on larger screens
- Optimized spacing and padding for different screen sizes
- Mobile viewport configuration for optimal rendering

### Additional Features

- **Smooth Animations**: Custom CSS animations for fade-in, slide-in/out, and gradient text effects
- **Dark Mode Support**: Full dark mode implementation with proper color contrast
- **Real-time Updates**: Optimistic UI updates with rollback on error
- **Loading States**: Spinner animations for all async operations
- **Error Handling**: User-friendly error messages with retry functionality
- **Character Counter**: Real-time feedback on input length limits

### Design System

Custom color palette derived from brand colors:
- Primary Red: `#C40C0C`
- Primary Orange: `#FF6500`
- Primary Brown: `#CC561E`
- Primary Gold: `#F6CE71`

### Known Limitations

- OAuth currently supports Google only (easily extensible to other providers)
- Rate limiting is implemented but could be enhanced with Redis for distributed systems
- Offline support not implemented (could be added with service workers)

## Features

- **Secure Authentication**: OAuth integration with Google via Supabase
- **Real-time Updates**: Instant todo synchronization
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Security First**: CSRF protection, input sanitization, and rate limiting
- **Type-Safe**: Built with TypeScript for enhanced reliability

## Tech Stack

- **Framework**: Next.js 15
- **Authentication**: Supabase Auth (OAuth)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fullstack
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update with your Supabase credentials

4. Run database migrations:
   - Execute the SQL in `supabase/migrations/20260206_create_todos_table.sql` in your Supabase SQL editor

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Required environment variables (see `.env.example`):

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/          # API routes
│   │   ├── auth/         # Auth callback handlers
│   │   ├── login/        # Login page
│   │   └── todos/        # Todo management pages
│   └── lib/              # Utility functions
│       ├── supabase/     # Supabase client configs
│       ├── csrf.ts       # CSRF protection
│       └── sanitize.ts   # Input sanitization
├── supabase/             # Database migrations
└── public/               # Static assets
```

## Security Features

- **CSRF Protection**: Token-based CSRF validation for all state-changing operations
- **Input Sanitization**: XSS prevention through HTML entity escaping
- **Rate Limiting**: Request throttling to prevent abuse
- **UUID Validation**: Secure ID format validation
- **Secure Sessions**: HTTP-only cookies with secure flags

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT
