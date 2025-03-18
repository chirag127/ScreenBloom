# ScreenBloom: Social Media Detox

ScreenBloom is a mobile application designed to help users replace mindless scrolling with mindfulness. The app tracks the time saved by not using distracting apps and allows users to allocate that time to meaningful goals.

## Features

### Time Swap

-   Track minutes saved from not using blocked apps
-   Allocate saved time to personal goals (reading, exercise, meditation, etc.)
-   Monitor progress toward goal completion

### Mini-Games

-   Breathing exercises and mindfulness activities
-   Unlock inspirational quotes by completing exercises
-   Track streaks and achievements

### App Blockers

-   Customizable app blocking with schedules
-   Soothing nature visuals when attempting to access blocked apps
-   Personalized messages to encourage mindfulness

## Tech Stack

### Backend

-   **Framework**: Express.js
-   **Database**: MongoDB
-   **Authentication**: JWT (JSON Web Tokens)
-   **API**: RESTful API design

### Frontend

-   **Framework**: React Native with Expo
-   **Navigation**: React Navigation
-   **State Management**: Context API
-   **UI Components**: Custom components with theming support
-   **API Client**: Axios

## Project Structure

```
├── backend/                  # Express.js backend
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   ├── middleware/           # Express middleware
│   ├── server.js             # Server entry point
│   └── seed.js               # Database seeding script
│
├── frontend/                 # React Native frontend
│   ├── src/
│   │   ├── assets/           # Images and other static assets
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React Context providers
│   │   ├── navigation/       # React Navigation setup
│   │   ├── screens/          # App screens
│   │   ├── services/         # API services
│   │   └── utils/            # Utility functions
│   ├── App.js                # Main app component
│   └── index.js              # Entry point
│
└── README.md                 # Project documentation
```

## Getting Started

### Prerequisites

-   Node.js (v14 or later)
-   MongoDB
-   Expo CLI

### Backend Setup

1. Navigate to the backend directory:

    ```
    cd backend
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Create a `.env` file based on `.env.example` and configure your MongoDB connection:

    ```
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/screenbloom
    JWT_SECRET=your_jwt_secret_key_here
    ```

4. Seed the database with initial data:

    ```
    npm run seed
    ```

5. Start the server:
    ```
    npm run dev
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```
    cd frontend
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Start the Expo development server:

    ```
    npm start
    ```

4. Use the Expo Go app on your mobile device to scan the QR code, or run on an emulator/simulator.

## Features in Detail

### Authentication

-   User registration and login
-   JWT-based authentication
-   Profile management

### Time Tracking

-   Automatic tracking of time saved from not using blocked apps
-   Goal creation and management
-   Progress visualization

### App Blocking

-   Customizable blocking schedules
-   Personalized blocking messages
-   Nature-inspired visuals during blocking

### Mindfulness Exercises

-   Breathing exercises (Box Breathing, 4-7-8 Breathing)
-   Meditation sessions
-   Gratitude practices

### Achievements and Motivation

-   Streak tracking for daily app usage
-   Unlockable inspirational quotes
-   Achievement badges

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

-   Inspired by the need for mindful technology use
-   Thanks to all contributors who have helped shape this project
