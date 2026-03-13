# My Movies

A Next.js application for browsing and managing movies, built with TypeScript, Tailwind CSS, and TMDB API integration.

## Features

- **Movie Browsing**: Search and display movies using the TMDB API.
- **Authentication**: User login/logout via an AuthContext (client-side state management).
- **Watchlist Management**: Add/remove movies to/from a personal watchlist (stored in localStorage).
- **Movie Cards**: Reusable components to display movie details, with options to add/remove from watchlist.
- **Responsive Design**: Grid layout for movie cards, optimized for desktop and mobile.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- A TMDB API key (sign up at [TMDB](https://www.themoviedb.org/) and add it to your environment variables)

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd my-movies
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add your TMDB API key:
     ```
     TMDB_API_KEY=your_api_key_here
     ```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Build for production:
   ```bash
   npm run build
   npm start
   # or
   yarn build
   yarn start
   ```

## Project Structure

- `src/app/`: Next.js app router pages (e.g., watchlist page).
- `src/components/`: Reusable components (e.g., MovieCard).
- `src/context/`: Context providers (e.g., AuthContext).
- `src/lib/`: Utility libraries (e.g., TMDB API helpers, watchlist utilities).

## Contributing

Feel free to submit issues or pull requests. Ensure all changes include tests and follow the existing code style.