# Full-Stack Task: Web-Based Task Manager (React + Node.js)

## Tech Stack

 - Frontend: React
 - Backend: Node.js + Express
 - Database: MongoDB

### Backend

```
cd backend
npm init
npm i express mongoose cors
npm i --save-dev dotenv nodemon

# Set your Mongo URI in .env
# Create .env file in backend folder:
# MONGODB_URL=your_mongodb_connection_string
# PORT=3000

npm run dev
```

### Frontend

```
cd frontend
npm install
npm i react-icons
npm i tailwindcss @tailwindcss/vite
npm run dev
```
### Features

- Add new tasks
- View all tasks
- Delete tasks
- Toggle task completion

### Bonus Features

- Filter tasks: All, Complete, Incomplete

### Known Issues

- No pagination or "load more"
- No authentication
- No input validation