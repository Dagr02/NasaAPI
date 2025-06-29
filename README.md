# NASA API Project

A web application for consuming NASAs API and displaying the results.
Currently hosted on: https://nasa-api-q5je.vercel.app/ via Vercel

## Project Structure

```
.
├── client/      # React / Vite Front-end
└── server/      # Express / Node Back-end
└── README.md
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
3. Create a .env in /client directory(if doesn't exist) and enter your back-end url:
   ```bash
   VITE_BACK_END_API_URL=your-url-goes-here
   ```
4. Start the development server:
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
3. Get a NASA Api Key at `https://api.nasa.gov/`. 
4. Create a .env in /server directory and enter your nasa api key:
    ```bash
   NASA_API_KEY= PERSONAL_NASA_API_KEY
   ```
5. In server/index.js replace:
   ```bash
   app.use(cors({
      origin: "https://nasa-api-q5je.vercel.app",
   }))
   ```
   with
   ```bash
   app.use(cors())
   ```
6. Start the server:
   ```bash
   npm start
   ```

## Local Development:
- The client application runs on `http://localhost:5173` by default
- The server runs on `http://localhost:3001` by default

## Project Details
This project currently consumes NASAs: Astronomy Picture of the Day(APOD) API, Near Earth Object Web Service(NeoWs) API and Mars Rover Photos API and tries to present the API Data in a nice looking way which is easy to understand. It's deployed on Vercel & incorporates basic github action workflow.
