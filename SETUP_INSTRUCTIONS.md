# Warm Cup Café - Setup Instructions

## Prerequisites
1. **XAMPP** must be installed and running
2. **Node.js** and **npm** must be installed

## Step-by-Step Setup

### 1. Start XAMPP Services
1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** services
3. Ensure MySQL is running on port **3307** (default XAMPP port)

### 2. Database Setup
1. Open your web browser
2. Navigate to: `http://localhost/setup_database.php`
3. This will create the database and tables automatically
4. You should see success messages for database creation

### 3. React Application
1. Open Command Prompt/Terminal in the project directory
2. Run: `npm install` (if not already done)
3. Run: `npm start`
4. The React app will open at: `http://localhost:3000`

### 4. Test the Application
1. **Home Page**: Browse the coffee shop
2. **Register**: Create a new account
3. **Login**: Use your credentials or admin account
4. **Order**: Place a coffee order
5. **Admin**: Login with admin@coffeeshop.com / admin123

## Troubleshooting

### If XAMPP is not running:
- Start XAMPP Control Panel
- Click "Start" for Apache and MySQL
- Wait for green indicators

### If database setup fails:
- Check MySQL is running in XAMPP
- Verify port 3307 is available
- Check XAMPP error logs

### If React app won't start:
- Ensure Node.js is installed: `node --version`
- Ensure npm is installed: `npm --version`
- Try: `npm install` again
- Check for port 3000 conflicts

## Default Admin Account
- **Email**: admin@coffeeshop.com
- **Password**: admin123

## API Endpoints
- Login: `http://localhost/login.php`
- Register: `http://localhost/register.php`
- Order: `http://localhost/order.php`
- Order History: `http://localhost/order_history.php`
- Admin: `http://localhost/admin.php`

## Features Available
✅ Single Page Application with React Router
✅ User Authentication (Login/Register)
✅ Order Management System
✅ Admin Dashboard
✅ Responsive Design
✅ 404 Page Handling
✅ Protected Routes
✅ Programmatic Navigation

Your coffee shop is now ready to serve customers! ☕
