// function hamburger nav
const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");

menuIcon.addEventListener("click", () => {
  menuList.classList.toggle("hidden");
});

// CALL API

const apiKey = 'fd868951'; // Replace with your API Key
let currentPage = 1;
let totalPages = 1;

const keywords = ['action', 'drama', 'comedy', 'thriller', 'romance', 'sci-fi', 'fantasy', 'horror', 'adventure', 'mystery', 'animation', 'crime', 'family', 'documentary', 'musical', 'historical', 'war', 'western', 'biography', 'suspense', 'supernatural', 'superhero', 'crime thriller', 'romance comedy', 'historical drama', 'sci-fi thriller', 'action adventure', 'psychological thriller', 'coming-of-age', 'epic'];

function getRandomKeyword() {
  return keywords[Math.floor(Math.random() * keywords.length)];
}

// Get or set keyword in localStorage
let currentKeyword = localStorage.getItem('currentKeyword');

if (!currentKeyword) {
  currentKeyword = getRandomKeyword();
  localStorage.setItem('currentKeyword', currentKeyword);
}

function fetchMovies(page) {
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${currentKeyword}&type=movie&page=${page}`;

  $.ajax({
    url: apiUrl,
    method: 'GET',
    success: function(data) {
      if (data.Response === "True") {
        displayMovies(data.Search);
        totalPages = Math.ceil(data.totalResults / 10);

        let paginationHtml = `
          <button id="prev-page" class="btn-prev me-2" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
          <button id="next-page" class="btn-next ms-2" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
        `;

        $('#pagination').html(paginationHtml);

        $('html, body').animate({ scrollTop: 0 }, 'fast');
      } else {
        $('#movie-list').html(`
          <div class="error">
            <h1 class="text-center">${data.Error}</h1>
          </div>
        `);

        $('#pagination').empty();

        $('html, body').animate({ scrollTop: 0 }, 'fast');
      }
    },
    error: function() {
      $('#movie-list').html(`
        <div class="error">
          <h1 class="text-center">Terjadi kesalahan saat mengambil data.</h1>
        </div>
      `);

      $('#pagination').empty();

      $('html, body').animate({ scrollTop: 0 }, 'fast');
    }
  });
}

function displayMovies(movies) {
  const movieContainer = $('#movie-recomandation');
  movieContainer.empty();

  movies.forEach(movie => {
    const movieElement = `
      <div class="col-md-3 mb-3">
        <div class="card">
          <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
          <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
            <a href="#" class="btn btn-primary see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${movie.imdbID}" >See Details</a>
          </div>
        </div>
      </div>
    `;

    movieContainer.append(movieElement);
  });
}

// Event listener for the search button
$('#search-button').on('click', function() {
  currentPage = 1;
  fetchMovies(currentPage);
});

// Event listener for the Previous button
$('#pagination').on('click', '#prev-page', function() {
  if (currentPage > 1) {
    currentPage--;
    fetchMovies(currentPage);
  }
});

// Event listener for the Next button
$('#pagination').on('click', '#next-page', function() {
  if (currentPage < totalPages) {
    currentPage++;
    fetchMovies(currentPage);
  }
});

// Event listener for the page number buttons
$('#pagination').on('click', '.btn-page-number', function() {
  const selectedPage = parseInt($(this).data('page'));
  if (selectedPage !== currentPage) {
    currentPage = selectedPage;
    fetchMovies(currentPage);
  }
});

// Reset genre and page when the page is refreshed
$(window).on('beforeunload', function() {
  localStorage.removeItem('currentKeyword');
});

// Call the function to load movies
fetchMovies(currentPage);

// Ajax Detail

$('#movie-recomandation').on('click', '.see-detail', function () {
  $.ajax({
    url: 'https://www.omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      'apikey': apiKey,
      'i': $(this).data('id')
    },
    success: function (movie) {
      if (movie.Response === "True") {
        const ratings = movie.Ratings.map(rating => 
          `<li>${rating.Source}: <i class="fas fa-star"></i> ${rating.Value}</li>`
        ).join('');

        $('.modal-body').html(`
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="${movie.Poster}" class="img-fluid" alt="${movie.Title} Poster">
              </div>
              <div class="col-md-8">
              <ul class="list-group">
                  <li class="list-group-item"><strong>Movie Title:</strong> ${movie.Title}</li>
                  <li class="list-group-item"><strong>Year:</strong> ${movie.Year}</li>
                  <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                  <li class="list-group-item"><strong>Genres:</strong> ${movie.Genre}</li>
                  <li class="list-group-item"><strong>Type:</strong> ${movie.Type}</li>
                  <li class="list-group-item"><strong>Runtime:</strong> ${movie.Runtime}</li>
                  <li class="list-group-item"><strong>Language:</strong> ${movie.Language}</li>
                  <li class="list-group-item"><strong>Country:</strong> ${movie.Country}</li>
                  <li class="list-group-item"><strong>Certificate:</strong> ${movie.Rated}</li>
                  <li class="list-group-item"><strong>Ratings:</strong>
                      <ul class="list-group">
                          ${ratings}
                      </ul>
                  </li>
                  <li class="list-group-item"><strong>Plot:</strong> ${movie.Plot}</li>
                  <hr>
                  <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                  <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                  <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                  <hr>
              </ul>
          </div>
          </div>
          </div>
        `);
      }
    }
  });
});
