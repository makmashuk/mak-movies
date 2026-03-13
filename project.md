Story:
Mr. Anthony Russo (Russo brothers) is an independent filmmaker and movie buff who wants to
build a simple, beautiful web app where users can search for movies, view details, and save
their favorites in a watchlist. He wants a fast and responsive front-end that can run in any
modern browser and on mobile devices. The app will fetch movie data from a public API like
TMDB or OMDb.
Since he is not technical, he has hired you, a React developer, to build a functional prototype.
He will later use this app as a reference to pitch the full idea to investors.

Requirements: Tools & Tech Stack
You should use the following tools:
● React
● CSS, Tailwind, or any CSS-in-JS solution (your choice)
● Git + GitHub for version control and submission

Task: Build the Movie Watchlist App
You will build a small React app with the following core features and pages:

0. User Authentication (New Section)
● Allow users to sign up and log in using email and password.
● You may use:
○ Firebase Authentication
○ Or a mock solution with hardcoded users or fake API (for frontend-only
approach).

● Once logged in, store session in localStorage or use Firebase's session persistence.
● Only authenticated users should access the Watchlist page.
● Show a simple navbar link to “Login / Logout”.

1. Movie Search Page (/search)
● A search bar to search for movies by title.
● Fetch and display search results from TMDB API or OMDb API.
● Show each movie’s:
○ Poster
○ Title
○ Year
○ "Details" button
○ “+ Watchlist” button
● Handle empty results, loading state, and API errors gracefully.

2. Movie Details Page (/movie/:id)
● When a user clicks “Details”, show a dedicated page for the movie.
● Display:
○ Poster
○ Title
○ Genres
○ Plot summary
○ Release date
○ Ratings
● Include buttons to:
○ Add/Remove from Watchlist
○ Go back to Search Page

3. Watchlist Page (/watchlist)
● Show all movies the logged-in user has added to their watchlist.
● Display at least:
○ Poster
○ Title
○ Year
○ “Remove” button
● Watchlist should persist per user.
○ If using Firebase: store in Firestore by user ID.
○ If mocking: store in localStorage under a user_id key.

4. Navigation

● Top or bottom nav bar with links to:
○ Search
○ Watchlist (only for logged-in users)
○ Login / Logout
🔗 Public APIs to Use
You can use either of the following (both are free):
🟦 TMDB API
● Docs: https://developer.themoviedb.org/docs
● Get a free API key by signing up at https://www.themoviedb.org
● Sample call:
https://api.themoviedb.org/3/search/movie?api_key=YOUR_KEY&query=
batman

🟨 OMDb API
● Website: http://www.omdbapi.com/
● Get a free key: http://www.omdbapi.com/apikey.aspx
● Sample call: http://www.omdbapi.com/?apikey=YOUR_KEY&s=batman

Who to Submit
● A public GitHub repo containing your code.
● A README.md with:
○ Instructions to run the project.
○ Basic documentation.
○ Demo video Google Drive link.

Note: While functionality is important, we place a strong emphasis on design,
responsiveness, and overall user experience in our evaluation. Clean layout, thoughtful UI
choices, and smooth interactivity will make a strong impression.
For inspiration on interactivity and visual polish, you may explore Webflow. Here are a few
interactive elements worth noting from the example site:

● Smooth page transitions and hover effects
● Animated navigation menus
● Scroll-triggered animations
● Microinteractions on buttons and cards
● Responsive layouts adapting seamlessly across devices

We encourage you to bring in your own creativity and make the app visually engaging.