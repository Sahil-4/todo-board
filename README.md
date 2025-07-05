# Real-Time Collaborative To-Do Board

### Project overview

Web-based collaborative to-do board application where multiple users can

- log in
- manage tasks
- see changes happen in real time

similar to a minimal Trello board with live sync.

### Tech stack used

#### Frontend

- react
- react-router-dom
- axios
- context-API
- @dnd-kit
- framer-motion
- socket.io-client

#### Backend

- node
- expressjs
- mongoose
- socket.io
- cors
- bcrypt
- jsonwebtoken
- dotenv

#### Database Collections (MongoDB)

- Users (_id, username, password, createdAt, updatedAt)
- Tasks (_id, title, description, priority, status, assignedTo, createdBy, createdAt, updatedAt)
- Logs (_id, action, user, resourceId, timestamp)

### Setup and installation instructions

- Clone repository

```bash
git clone git@github.com/sahil-4/todo-board
```

- Install dependencies (backend)

```bash
# Navigate to backend folder
cd backend

# install node modules
npm install
```

- Compile code (backend)

```bash
npm run build
```

- Start backend/express app

```bash
npm run start
```

- Install dependencies (frontend)

```bash
# Navigate to frontend folder
cd frontend

# install node modules
npm install
```

- Compile code (frontend)

```bash
npm run build
```

- Start frontend/react app

```bash
npm run preview
```

### Features list and usage guide

#### Authentication

- Register :

- Login :

#### Task management API

- Get all tasks :

- Create new task :

- Update existing task :

- Delete existing task :

- Assign task to user :

#### Logging API

- Get logs : 

### Explanations

#### Smart Assign

#### Conflict Handling logic

### Links

- Live (frontend) :
- Live (backend) :
- Demo Video :
