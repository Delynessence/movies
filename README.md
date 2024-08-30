---

# Movie Search Application

## Overview

This application allows users to search for movies using the OMDB API. It features pagination to navigate through search results, displays detailed movie information in a modal, and provides an option to view a larger version of the movie poster.

## Features

- **Search Movies**: Users can search for movies by entering a title into the search input field.
- **Pagination**: Allows navigation through multiple pages of search results using "Previous" and "Next" buttons.
- **Movie Details**: Clicking on a movie's "See Details" button displays a modal with detailed information about the movie.
- **Large Poster View**: Users can click on the movie poster in the details modal to view it in a larger size.

## How It Works

1. **Initialization**:
   - The application sets up event listeners for user interactions such as searching for movies and navigating through pages.
   - It manages the current page number for pagination.

2. **Fetching Movies**:
   - When a search is performed or a pagination button is clicked, the application sends a request to the OMDB API to retrieve movie data based on the search query and page number.
   - The results are displayed in a grid format.

3. **Search and Pagination**:
   - Users can initiate a search by clicking the search button or pressing Enter. This fetches movies starting from the first page.
   - Pagination controls allow users to move between pages of search results.

4. **Movie Details**:
   - Clicking the "See Details" button for a movie opens a modal with detailed information about the selected movie, including title, year, genre, and plot.
   - Additional information such as director, writer, and actors is also displayed.

## Dependencies

- **jQuery**: Used for handling AJAX requests and DOM manipulation.
- **Bootstrap**: Provides styling and modal functionality.
- **Font Awesome**: Used for displaying icons (e.g., stars for ratings).

## Usage

1. **Searching**:
   - Enter a movie title in the search input field.
   - Click the "Search" button or press Enter to view search results.

2. **Pagination**:
   - Use the "Previous" and "Next" buttons to navigate through pages of search results.

3. **Viewing Details**:
   - Click the "See Details" button on any movie to view more information about it.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---
