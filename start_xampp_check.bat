@echo off
echo Starting Warm Cup Cafe Setup...
echo.

echo Checking if XAMPP is running...
netstat -an | findstr :80 >nul
if %errorlevel% == 0 (
    echo Apache is running on port 80
) else (
    echo Apache is NOT running. Please start XAMPP Control Panel and start Apache.
    pause
    exit /b 1
)

netstat -an | findstr :3307 >nul
if %errorlevel% == 0 (
    echo MySQL is running on port 3307
) else (
    echo MySQL is NOT running. Please start XAMPP Control Panel and start MySQL.
    pause
    exit /b 1
)

echo.
echo XAMPP services are running!
echo.
echo Next steps:
echo 1. Open browser and go to: http://localhost/setup_database.php
echo 2. Run: npm start
echo 3. Open: http://localhost:3000
echo.
echo Admin login: admin@coffeeshop.com / admin123
echo.
pause
