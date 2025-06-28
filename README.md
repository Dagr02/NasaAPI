# NASA API Project

A web application for consuming NASAs API and displaying the results.

## Project Structure

```
.
├── client/      # Frontend React application
└── server/      # Backend server
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm package manager

### Client Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Server Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Get a NASA Api Key at `https://api.nasa.gov/`. 
5. Create a .env in /server directory and enter:
    ```bash
   NASA_API_KEY= PERSONAL_NASA_API_KEY
   ```

## Development
- The client application runs on `http://localhost:5173` by default
- The server runs on `http://localhost:3001` by default

## Project Details
This project currently consumes NASAs: Astronomy Picture of the Day(APOD) API, Near Earth Object Web Service(NeoWs) API and Mars Rover Photos API and tries to present the API Data in a nice looking way which is easy to understand. 