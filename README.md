# Next.js Issue Tracker

A modern issue tracking application built with Next.js, Prisma, and NextAuth.js.

## Features

- User authentication with Google Sign-in
- Create, read, update, and delete issues
- Assign issues to users
- Real-time validation
- Responsive design with Tailwind CSS
- Protected routes with middleware
- Database integration with Prisma

## Tech Stack

- Next.js 15
- TypeScript
- Prisma ORM
- MySQL Database
- NextAuth.js for authentication
- Tailwind CSS
- Zod for validation

## Getting Started

1. Clone the repository

2. `cd next-issue-tracker`

3. Install dependencies:
   `npm install`

4. Set up environment variables: Create a .env file with the following variables:

```
   DATABASE_URL="your-mysql-connection-string"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"
```

5. Run database migrations:
   `npx prisma migrate dev`

6. Start the development server:
   `npm run dev`

## API Endpoints

- GET /api/issues - Get all issues
- POST /api/issues - Create a new issue
- PATCH /api/issues/[id] - Update an issue
- DELETE /api/issues/[id] - Delete an issue
- GET /api/users - Get all users
- Authentication

  The application uses Google OAuth for authentication. Protected routes include:

  -/issues/new
  -/issues/edit/:id

## Database Schema

The application uses the following main models:

- User
- Issue
- VerificationToken

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
