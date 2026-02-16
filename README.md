# FinTrack

Full-stack personal finance tracker built with Laravel (REST API) and React.  
Designed to manage income and expenses, organize financial data, and provide interactive analytics dashboards.

---

## Features

- Income & expense tracking
- Category-based transaction management
- Interactive dashboards and charts
- RESTful API architecture
- Authentication and session management
- Scalable and clean project structure

---

## Tech Stack

### Backend
- Laravel
- MySQL
- REST API
- Queue and caching support

### Frontend
- React
- Axios
- Chart.js or Recharts
- Component-based UI architecture

---

## Project Structure

fintrack/
 ├── backend/   # Laravel API
 ├── frontend/  # React application
 └── README.md

---

## Installation

### 1. Clone Repository

git clone https://github.com/alricium/fintrack.git  
cd fintrack

---

### 2. Backend Setup

cd backend  
cp .env.example .env  
composer install  
php artisan key:generate  
php artisan migrate  
php artisan serve  

Backend runs at:  
http://127.0.0.1:8000

---

### 3. Frontend Setup

cd frontend  
cp .env.example .env  
npm install  
npm start  

Frontend runs at:  
http://localhost:5173

---

## API Configuration

Frontend .env:

REACT_APP_API_URL=http://127.0.0.1:8000/api

---

## Roadmap

- Advanced financial analytics
- Budget planning module
- Export reports (PDF/CSV)
- Role-based authentication
- Performance optimizations

---

## Purpose

This project demonstrates:

- Full-stack architecture design
- API development best practices
- Data visualization implementation
- Clean and maintainable code structure

---

## License

MIT