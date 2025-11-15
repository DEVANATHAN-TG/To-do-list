# 📝 React + Supabase Todo App

My First React Project 😊

A complete CRUD application built with React and Supabase, Responsive design for mobile and desktop.✅

## Step-By-Step Project Setup

Step 1: Install Node.js and npm

Install Node.js:

- Go to https://nodejs.org/

- Download the LTS (Long Term Support) version

- Run the installer and follow the instructions

- Open your terminal/command prompt and verify installation:

```
node -v
npm -v
```

Step 2: Create a New React App

```
npx create-react-app Project-name
```

Step 3: After Installed Package 🗂 . Once done, navigate to your project:

```
cd my-todo-app
```

Step 4: Run Your App Locally​ 🌐

Start the development server:

```
npm start
```

## Step-by-Step Supabase Set-up

- Go to https://app.supabase.com 🌐

- Click "Sign up" (use GitHub for easier login) 🔐

- Click "New Project" 📁

- Fill in details 📝

- Click "Create new project" 📄


After Create Project -> Go To SQL Editor

```
CREATE TABLE todos (
  id BIGSERIAL PRIMARY KEY,
  text VARCHAR(500) NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access" ON todos FOR ALL USING (true) WITH CHECK (true);
```

Click the play button (▶️) to execute the query

Go To Project Settings -> Click Data API (Copy The Project URL) & Click API Keys (Copy The Anon Public Key)

# Step - By - Step Building the Complete To-do-List App

## Step 1 - Open Terminal

Enter This Command In Terminal

```
>> cd filename
>> npm install @supabase/supabase-js
🔄 -- wait Few Seconds For Install The Module
```

## Step 2 - Create Environment Variables to Your React App

Create a file named .env.local in your project root Eg: (my-todo-app/.env.local)

```
REACT_APP_SUPABASE_URL=your_supabase_url_here (Copy Link In The Supabase Site Project URl Link Replace Here)
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here (Copy API In The Supabase Site Project API Key Replace Here)
```

Create a new file src/supabaseClient.js: [Main Think To Connect The Backend]

```
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

## Step 3 - Build the Main App Component

- Edit The File contents of src/App.js

- Add Beautiful Styling​ src/App.css

## Step 4: Run Your App​
Start the development server again:

```
npm start

Visit http://localhost:3000 to see your app!
```

## 🚀 Features

- ✅ Add, edit, delete, and complete todos
- 🔄 Real-time database with Supabase
- 📱 Responsive design for mobile and desktop
- 💾 Data persists in PostgreSQL database
- 🎨 Beautiful UI with gradient design

## 📋 Prerequisites

- Node.js v14+ and npm
- A Supabase account (free at https://supabase.com)

## 🛠️ Setup Instructions

### 1. Clone the repository
