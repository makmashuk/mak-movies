# 🎬 Mak Movies

A modern movie discovery app built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Firebase** — powered by the TMDB API.

---

## ✨ Features

### 🔐 Authentication
- Email & password sign up and login via **Firebase Auth**
- Protected routes — watchlist requires login, redirects to `/login` if unauthenticated
- User session persisted across page refreshes
- User avatar with dropdown menu in the header

### 🏠 Home Page
- **Hero banner slider** — top 5 popular movies with auto-play, dot indicators, and smooth **Framer Motion** crossfade transitions
- Fixed banner with scrollable content panels sliding over it
- Multiple movie sections: Trending, Top Rated, Popular, Upcoming

### 🎞️ Movie Panels
- Horizontally scrollable movie rows per category
- Each panel independently fetches its own data

### 🃏 Movie Cards
- Poster with hover reveal overlay
- Color-coded vote badge (green / yellow / red)
- Genre pills, release year, vote count
- Bookmark icon to add/remove from watchlist directly from the card

### 🔍 Search
- Search movies by title via TMDB search API
- **Autocomplete suggestions** dropdown with 350ms debounce as you type
- Clear button to reset search
- Results count, empty state, and error state with animations
- Full movie cards in results grid

### 🎬 Movie Detail Page
- Full backdrop hero banner with gradient overlays
- Poster, title, tagline, genres, rating, runtime, release year, language
- Stats grid: release date, runtime, rating, vote count, budget, revenue
- Add / remove from watchlist button
- Back navigation
- Animated skeleton loading state

### 📋 Watchlist
- Persisted to **localStorage**
- Add or remove movies from any card or the detail page
- Animated grid with stagger on load, scale-out on remove
- Empty state with "Browse Movies" CTA
- Movie count display


## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/makmashuk/mak-movies.git
cd mak-movies
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# TMDB
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

**Firebase** — create a project at [console.firebase.google.com](https://console.firebase.google.com) and enable **Email/Password** authentication.

**TMDB** — get a free API key at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🗂️ Project Structure

```
app/
  page.tsx                  # Home page
  movie/
    [id]/page.tsx           # Movie detail page
    search/page.tsx         # Search page
  watchlist/page.tsx        # Watchlist page
  login/page.tsx
  signup/page.tsx
  layout.tsx

components/
  Home/
    BannerSlider.tsx        # Hero banner with framer motion
    MoviesPanel.tsx         # Scrollable movie row
  Header.tsx
  Footer.tsx
  MovieCard.tsx             # Card used in panels and watchlist
  MovieSearchCard.tsx       # Card used in search results

hooks/
  useWatchlist.ts           # Shared watchlist state and actions

lib/
  tmdb.ts                   # TMDB API functions + GENRE_MAP
  util.ts                   # getMovieImageUrl, getGenreNames, formatRuntime, etc.
  watchlist.util.ts         # localStorage read/write helpers

context/
  AuthContext.tsx           # Firebase auth context

interface/
  movie.ts                  # Shared Movie type
```

---

## 🧰 Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations and transitions |
| Firebase Auth | User authentication |
| TMDB API | Movie data |
| Lucide React | Icons |
| React Toastify | Toast notifications |

---

## 👤 Author

Made with ♥ by **makmashuk**