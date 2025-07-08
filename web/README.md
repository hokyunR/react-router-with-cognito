# React Router with AWS Cognito Authentication

A modern, production-ready template for building full-stack React applications using React Router with AWS Cognito OAuth2 authentication.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 🔐 AWS Cognito OAuth2 Authentication
- 🛡️ Protected routes and session management
- 👤 User information display
- 📖 [React Router docs](https://reactrouter.com/)

## Authentication Setup

This application uses AWS Cognito for authentication. You'll need to set up the following environment variables:

### Required Environment Variables

Create a `.env` file in the web directory with the following variables:

```bash
# AWS Cognito Configuration
CLIENT_ID=your_cognito_client_id
DOMAIN=https://your-cognito-domain.auth.region.amazoncognito.com
REDIRECT_URI=http://localhost:5173/auth/callback

# Session Secret (optional for development, required for production)
SESSION_SECRET=your-random-session-secret
```

### AWS Cognito Setup

1. **Create a User Pool** in AWS Cognito Console
2. **Configure App Integration**:
   - Set OAuth 2.0 flows: `Authorization code grant`
   - Set OAuth scopes: `openid`, `email`, `profile`
   - Set Callback URLs: `http://localhost:5173/auth/callback` (for development)
   - Set Sign out URLs: `http://localhost:5173/` (for development)
3. **Create an App Client**:
   - Enable "Use Cognito Hosted UI"
   - Don't generate a client secret (public client)
4. **Configure the Domain** for the hosted UI

### Environment Variables Explanation

- `CLIENT_ID`: Your Cognito App Client ID
- `DOMAIN`: Your Cognito hosted UI domain (e.g., `https://my-app.auth.us-east-1.amazoncognito.com`)
- `REDIRECT_URI`: Where users are redirected after successful login
- `SESSION_SECRET`: Random string for securing cookies (generate with `openssl rand -base64 32`)

### Example Values

```bash
# Development
CLIENT_ID=1a2b3c4d5e6f7g8h9i0j
DOMAIN=https://my-app.auth.us-east-1.amazoncognito.com
REDIRECT_URI=http://localhost:5173/auth/callback
SESSION_SECRET=abcd1234efgh5678ijkl9012mnop3456

# Production
CLIENT_ID=1a2b3c4d5e6f7g8h9i0j
DOMAIN=https://my-app.auth.us-east-1.amazoncognito.com
REDIRECT_URI=https://yourdomain.com/auth/callback
SESSION_SECRET=your-production-secret
```

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Authentication Flow

1. **Login**: Users click "로그인" and are redirected to Cognito hosted UI
2. **Callback**: After successful authentication, users are redirected to `/auth/callback`
3. **Session**: Access tokens are stored in secure HTTP-only cookies
4. **Protected Routes**: Routes like `/projects/show` require authentication
5. **Logout**: Users can logout, which revokes tokens and clears session

## Application Structure

### Authentication Routes

- `/login` - Redirects to Cognito hosted UI
- `/callback` - Handles OAuth callback and creates session
- `/logout` - Revokes tokens and destroys session

### Protected Routes

- `/projects/show` - Example of a protected route that requires authentication

### Public Routes

- `/` - Home page (shows different content based on auth status)

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

```bash
CLIENT_ID=your_production_client_id
DOMAIN=https://your-production-domain.auth.region.amazoncognito.com
REDIRECT_URI=https://yourdomain.com/auth/callback
SESSION_SECRET=your-secure-random-secret
NODE_ENV=production
```

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container with environment variables
docker run -p 3000:3000 \
  -e CLIENT_ID=your_client_id \
  -e DOMAIN=your_domain \
  -e REDIRECT_URI=your_redirect_uri \
  -e SESSION_SECRET=your_secret \
  my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Security Features

- 🔒 HTTP-only cookies for token storage
- 🛡️ CSRF protection via SameSite cookies
- 🔐 Secure session management
- ⏰ Automatic token expiration
- 🚪 Proper token revocation on logout

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router and AWS Cognito.
