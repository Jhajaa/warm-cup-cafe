# Warm Cup Café - React Single Page Application

A modern React-based coffee shop website with routing, authentication, and order management.

## Features

- **Single Page Application (SPA)** with React Router DOM
- **Dynamic Routing** with nested routes and protected routes
- **User Authentication** (Login/Register)
- **Order Management** system
- **Admin Dashboard** for order management
- **Responsive Design** with Bootstrap and custom CSS
- **MySQL Database** integration with XAMPP
- **404 Page** handling
- **Programmatic Navigation**

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header component
│   ├── Header.css          # Header styles
│   └── ProtectedRoute.jsx  # Route protection component
├── pages/
│   ├── Home.jsx           # Home page with featured drinks
│   ├── About.jsx          # About us page
│   ├── Menu.jsx           # Full menu page
│   ├── Login.jsx          # User login page
│   ├── Register.jsx       # User registration page
│   ├── Order.jsx          # Order placement page
│   ├── OrderHistory.jsx   # User order history
│   ├── Admin.jsx          # Admin dashboard
│   └── NotFound.jsx       # 404 error page
├── App.jsx                # Main app component with routing
├── index.jsx              # React entry point
└── index.css              # Global styles
```

## Setup Instructions

### 1. Database Setup (XAMPP)

1. Start XAMPP and ensure MySQL is running on port 3306
2. Run the database setup script:
   ```bash
   http://localhost/itp110/setup_database.php
   ```
3. This will create the `ITP110` database with users and orders tables

### 2. React Application Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. The React app will run on `http://localhost:3000`

### 3. API Endpoints

The following PHP API endpoints are available:

- `POST /itp110/login.php` - User login
- `POST /itp110/register.php` - User registration
- `POST /itp110/order.php` - Place order
- `GET /itp110/order_history.php` - Get user order history (requires auth)
- `GET /itp110/admin.php` - Get all orders and stats (admin only)
- `POST /itp110/admin.php` - Update order status (admin only)

## Routes

- `/` - Home page
- `/about` - About us page
- `/menu` - Full menu page
- `/login` - Login page
- `/register` - Registration page
- `/order` - Order placement page
- `/order-history` - User order history (protected)
- `/admin` - Admin dashboard (admin only)
- `/*` - 404 page (catch-all)

## Authentication

- Users can register and login
- JWT-like tokens are used for authentication
- Protected routes require authentication
- Admin routes require admin privileges

## Admin Access

Default admin credentials:
- Email: `admin@coffeeshop.com`
- Password: `admin123`

## Features Implemented

✅ **Single Page Application** with React Router DOM
✅ **Dynamic Routing** with nested routes
✅ **Protected Routes** for authenticated users
✅ **Programmatic Navigation** using useNavigate
✅ **404 Page** handling with custom NotFound component
✅ **Responsive Design** with Bootstrap and custom CSS
✅ **MySQL Database** integration
✅ **User Authentication** system
✅ **Order Management** system
✅ **Admin Dashboard** with order statistics
✅ **API Integration** with PHP backend

## Technologies Used

- **Frontend**: React 18, React Router DOM 6, Axios, Bootstrap 5
- **Backend**: PHP, MySQL, PDO
- **Database**: MySQL (XAMPP)
- **Styling**: CSS3, Bootstrap 5

## Development Notes

- The app uses a proxy configuration to connect to the PHP backend
- CORS headers are set in PHP files for API access
- Simple token-based authentication is implemented
- All API responses are in JSON format
- The app is fully responsive and mobile-friendly

## Running the Application

1. Start XAMPP MySQL service
2. Run `npm start` in the project directory
3. Open `http://localhost:3000` in your browser
4. The React app will proxy API requests to `http://localhost:80`

## Production Deployment

For production deployment:
1. Run `npm run build` to create production build
2. Deploy the `build` folder to your web server
3. Ensure PHP API endpoints are accessible
4. Update API URLs if needed for production domain
