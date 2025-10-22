# Warm Cup Café - Deployment Guide

This guide will help you deploy your Warm Cup Café application using Render for the backend and Netlify for the frontend.

## Prerequisites

- GitHub account
- Render account (free tier available)
- Netlify account (free tier available)
- Your project pushed to a GitHub repository

## Backend Deployment (Render)

### 1. Prepare Your Repository

1. Push your project to GitHub
2. Make sure all PHP files are in the root directory
3. Ensure `composer.json` and `render.yaml` are present

### 2. Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `warm-cup-cafe-backend`
   - **Environment**: `PHP`
   - **Build Command**: Leave empty (no build step needed)
   - **Start Command**: `php -S 0.0.0.0:$PORT`
   - **Plan**: Free

### 3. Set Environment Variables

In Render dashboard, go to Environment tab and add:

```
DB_HOST=your-database-host
DB_NAME=your-database-name
DB_USER=your-database-user
DB_PASS=your-database-password
PORT=10000
```

**For Render PostgreSQL (Recommended):**
1. Create a PostgreSQL database in Render
2. Use the provided `DATABASE_URL` environment variable
3. The app will automatically parse this URL

### 4. Database Setup

**Option A: Use Render PostgreSQL**
1. Create a PostgreSQL database in Render
2. Use the provided connection string
3. Update your PHP code to work with PostgreSQL (if needed)

**Option B: Use External MySQL**
1. Use a service like PlanetScale, AWS RDS, or DigitalOcean
2. Set the connection details in environment variables

### 5. Get Your Backend URL

After deployment, Render will provide a URL like:
`https://warm-cup-cafe-backend.onrender.com`

## Frontend Deployment (Netlify)

### 1. Prepare Environment Variables

1. Copy `env.example` to `.env.production`
2. Update `REACT_APP_API_URL` with your Render backend URL:
   ```
   REACT_APP_API_URL=https://warm-cup-cafe-backend.onrender.com
   ```

### 2. Deploy to Netlify

**Method A: Drag & Drop**
1. Run `npm run build` locally
2. Drag the `build` folder to [Netlify Drop](https://app.netlify.com/drop)

**Method B: Git Integration**
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Node version**: `18`

### 3. Set Environment Variables in Netlify

1. Go to Site settings → Environment variables
2. Add:
   ```
   REACT_APP_API_URL=https://warm-cup-cafe-backend.onrender.com
   ```

### 4. Configure Redirects

The `netlify.toml` file is already configured for SPA routing.

## Database Migration

### 1. Create Database Tables

You'll need to run your database setup scripts. You can:

1. **Use the existing setup scripts** by accessing them via your deployed backend
2. **Create a migration script** that runs automatically on deployment
3. **Manually create tables** using your database provider's interface

### 2. Update Database Connection

Make sure your `config/database.php` is updated to work with your production database.

## Testing Your Deployment

### 1. Test Backend
- Visit your Render URL
- Test API endpoints like `/login.php`, `/register.php`
- Check database connectivity

### 2. Test Frontend
- Visit your Netlify URL
- Test user registration and login
- Verify API calls are working

### 3. Test Full Flow
- Register a new user
- Login with the user
- Place an order
- Check admin dashboard

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure CORS headers are set in PHP files
   - Check that frontend URL is allowed

2. **Database Connection Issues**
   - Verify environment variables are set correctly
   - Check database provider's connection limits

3. **Build Failures**
   - Check Node.js version compatibility
   - Ensure all dependencies are in package.json

4. **API Calls Failing**
   - Verify REACT_APP_API_URL is set correctly
   - Check network tab in browser dev tools

### Environment Variables Checklist

**Backend (Render):**
- [ ] DB_HOST or DATABASE_URL
- [ ] DB_NAME
- [ ] DB_USER
- [ ] DB_PASS
- [ ] PORT

**Frontend (Netlify):**
- [ ] REACT_APP_API_URL

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to Git
2. **CORS**: Restrict CORS to your frontend domain in production
3. **Database**: Use strong passwords and restrict access
4. **HTTPS**: Both Render and Netlify provide HTTPS by default

## Monitoring

1. **Render**: Monitor logs in the Render dashboard
2. **Netlify**: Check build logs and function logs
3. **Database**: Monitor connection usage and performance

## Scaling

- **Render**: Upgrade to paid plans for better performance
- **Netlify**: Use Netlify Functions for serverless backend functions
- **Database**: Consider connection pooling for high traffic

## Support

- [Render Documentation](https://render.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

---

**Note**: Remember to update the `REACT_APP_API_URL` in your environment files with your actual Render backend URL before deploying!
