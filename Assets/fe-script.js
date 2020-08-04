$(document).ready(function () {

  // Frontend Variables
  const allCards = $(".all-cards");
  //This queries all search fields
  const titleSearch = $(".title-search");
  // Variables for search results containers
  const titleBox = $(".title-box"); // This is the template for the search results container
  // These are the locations where we will place the correct results
  const movieHolder = $(".movie-title-box-holder");
  const bookHolder = $(".book-title-box-holder");
  const tvHolder = $(".tv-title-box-holder");
  let storedMovies;
  let storedTV;
  let storedBooks;

  // Card Switcher
  $(".destination").on("click", function (event) {
    // Turn off all the cards
    allCards.addClass("hide-card");
    // Retrieve the data-destination of the clicked element
    const dataDestination = $(this).attr("data-destination");
    // Use data-destination to query the correct card
    const destination = $(`#${dataDestination}`);
    // Then remove the hide-card class
    destination.removeClass("hide-card");

    loadObject[dataDestination]();
  });

  const loadObject = {
    homecard: function () {
      return
    },
    moviecard: function () {
      storedMovies = JSON.parse(localStorage.getItem("movies"));
      if (!storedMovies) {
        return
      };
      buildMovieCards(storedMovies)
    },
    bookcard: function () {
      storedBooks = JSON.parse(localStorage.getItem("books"));
      if (!storedBooks) {
        return
      };
      buildBookCards(storedBooks)
    },
    tvcard: function () {
      storedTV = JSON.parse(localStorage.getItem("tv"));
      if (!storedTV) {
        return
      };
      buildTVCards(storedTV)
    }
  };

  function buildMovieCards(storedMovies) {
let i=0;
    storedMovies.forEach(function (index) {
      const thisHolder = titleBox.contents().clone().attr("id", index.movTitle);
      thisHolder.find(".title-img").css("background-image", "url(" + index.movImgSrc + ")");
      thisHolder.find(".title-title").text(index.movTitle);
      thisHolder.find(".title-genre").text(index.movGenre);
      thisHolder.find(".title-rating").text(index.movRate);
      thisHolder.find(".title-review").text(index.movReviews);
      thisHolder.find(".title-plot").text(index.movPlot);
      thisHolder.find(".memory-buttons").attr("data-memory", index.movTitle);

      movieHolder.prepend(thisHolder);
      i++;
    });

    
    const addButt = $(".add-butt");
    const subButt = $(".sub-butt");
const clickListener = $(".individual-title");

    clickListener.on("click", function (event) {
      let thisIndex = ($(this).attr("data-index"));
      const thisClick = $(event.target);
      if(thisClick.hasClass("add-butt")) {
        alert("This title already exists");
      } else if (thisClick.hasClass("sub-butt")) {
        console.log(thisIndex);
        storedMovies.splice(thisIndex, 1);
        localStorage.setItem('movies', JSON.stringify(storedMovies));
        buildMovieCards(storedMovies);
      }
      return;

    })

  };

  function buildBookCards(storedBooks) {
let i=0;
    storedBooks.forEach(function (index) {
      const thisHolder = titleBox.contents().clone().attr("id", index.title);
      thisHolder.find(".title-img").css("background-image", "url(" + index.imgBk + ")");
      thisHolder.find(".title-title").text(index.title);
      thisHolder.find(".title-genre").text(index.genre);
      thisHolder.find(".title-rating").text(index.year);
      thisHolder.find(".title-review").text(index.author);
      thisHolder.find(".title-plot").text(index.movPlot);
      thisHolder.find(".memory-buttons").attr("data-memory", index.title);

      bookHolder.prepend(thisHolder);
      i++;
    });

    const addButt = $(".add-butt");
    const subButt = $(".sub-butt");
    const clickListener = $(".individual-title");

    clickListener.on("click", function (event) {
      let thisIndex = ($(this).attr("data-index"));
      const thisClick = $(event.target);
      if(thisClick.hasClass("add-butt")) {
        alert("This title already exists");
      } else if (thisClick.hasClass("sub-butt")) {
        console.log(thisIndex);
        storedMovies.splice(thisIndex, 1);
        localStorage.setItem('movies', JSON.stringify(storedMovies));
        buildMovieCards(storedMovies);
      }
      return;

    })

  };

  function buildTVCards(storedTV) {
let i=0;
    storedTV.forEach(function (index) {
      const thisHolder = titleBox.contents().clone().attr("id", index.tvTitle);
      thisHolder.find(".title-img").css("background-image", "url(" + index.tvImg + ")");
      thisHolder.find(".title-title").text(index.tvTitle);
      thisHolder.find(".title-genre").text(index.tvGenre);
      thisHolder.find(".title-rating").text(index.tvRate);
      thisHolder.find(".title-review").text(index.tvReviews);
      thisHolder.find(".title-plot").text(index.tvPlot);
      thisHolder.find(".memory-buttons").attr("data-memory", index.tvTitle);

      tvHolder.prepend(thisHolder);
      i++
    });

    const addButt = $(".add-butt");
    const subButt = $(".sub-butt");

    const clickListener = $(".individual-title");

    clickListener.on("click", function (event) {
      let thisIndex = ($(this).attr("data-index"));
      const thisClick = $(event.target);
      if(thisClick.hasClass("add-butt")) {
        alert("This title already exists");
      } else if (thisClick.hasClass("sub-butt")) {
        console.log(thisIndex);
        storedMovies.splice(thisIndex, 1);
        localStorage.setItem('movies', JSON.stringify(storedMovies));
        buildMovieCards(storedMovies);
      }
      return;

    })

  };

  // *** Search form - collect search and direct to correct API
  // Collects search term from currently displayed card
  titleSearch.submit(function (event) {
    event.preventDefault();
    const _this = $(this);
    // This collects the search term from that field
    const searchTerm = _this.children("input").val();
    // This determines which card we're getting the search from and is used to invoke the correct function
    const searchAPI = _this.children().attr("id");
    // Invoking the correct function
    apiObject[searchAPI](searchTerm);
    // Clearing the search field
    _this.children("input").val("")
  });

  const apiObject = {

    // Movie API call function
    movieAPI: function (searchTerm) {

      // Building the API query URL
      const queryURL = `https://www.omdbapi.com/?t=${searchTerm}&apikey=trilogy`;


   

      $.get(queryURL, function (response) {


        if (response.Response === "False") { alert("No results found"); return }
        else {


          var movObj = { movPlot: response.Plot, movReviews: response.Ratings[0].Value, movTitle: response.Title, movGenre: response.Genre, movRate: response.Rated, movImgSrc: response.Poster }
          // Making the template clone 
          const thisHolder = titleBox.contents().clone().attr("id", searchTerm);

          // Populating the title box
          thisHolder.find(".title-img").css("background-image", "url(" + response.Poster + ")");
          thisHolder.find(".title-title").text(response.Title);
          thisHolder.find(".title-genre").text(response.Genre);
          thisHolder.find(".title-rating").text(response.Rated);
          thisHolder.find(".title-review").text(response.Ratings[0].Value);
          thisHolder.find(".title-plot").text(response.Plot);
          thisHolder.find(".memory-buttons").attr("data-memory", response.Title);

          movieHolder.prepend(thisHolder);
          const addButt = $(".add-butt");

          addButt.on("click", function (event) {
            thisSaveButt = $(this).parent().attr("data-memory");
            storedMovies = JSON.parse(localStorage.getItem("movies"));
            if (!storedMovies) {
              storedMovies = [];
              storedMovies.push(movObj);
              localStorage.setItem('movies', JSON.stringify(storedMovies));

              return;
            }
            let exists = false;
            storedMovies.forEach(function (index) {

              if (thisSaveButt === index.movTitle) {
                alert("This title already exists in your list");
                exists = true
                return;
              }
            });
            if (!exists) {
              storedMovies.push(movObj);
              localStorage.setItem('movies', JSON.stringify(storedMovies));
            }

          });

        }
      });

    },






    // Book API call function
    bookAPI: function (searchTerm) {

      queryURL = `http://openlibrary.org/search.json?title=${searchTerm}`
      $.get(queryURL, function (response) {


        if (response.Response === "False") { alert("No results found"); return }
        else {



 // Making the template clone 
 const thisHolder = titleBox.contents().clone().attr("id", searchTerm);
 var imgSrc = "http://covers.openlibrary.org/b/isbn/"+response.docs[0].isbn[0]+"-M.jpg"
 var bookObj ={title:response.docs[0].title,author:response.docs[0].author_name[0],year:response.docs[0].publish_year[0],genre:response.docs[0].subject[0], imgBk:imgSrc};

 thisHolder.find(".title-title").text(bookObj.title);
 thisHolder.find(".title-genre").text(bookObj.genre);
 thisHolder.find(".title-img").css("background-image", "url(" + bookObj.imgBk + ")");
 thisHolder.find(".title-review").text(bookObj.author)
 thisHolder.find(".title-rating").text(bookObj.year);
thisHolder.find(".memory-buttons").attr("data-memory", response.Title);

bookHolder.prepend(thisHolder);
const addButt = $(".add-butt");

addButt.on("click", function (event) {
  thisSaveButt = $(this).parent().attr("data-memory");
  storedBooks = JSON.parse(localStorage.getItem("books"));
  if (!storedBooks) {
    storedBooks = [];
    storedBooks.push(bookObj);
    localStorage.setItem('books', JSON.stringify(storedBooks));

    return;
  }
  let exists = false;
  storedBooks.forEach(function (index) {

    if (thisSaveButt === index.title) {
      alert("This title already exists in your list");
      exists = true
      return;
    }
  });
  if (!exists) {
    storedBooks.push(bookObj);
    localStorage.setItem('books', JSON.stringify(storedBooks));
  }

});

}
});

},



    
    // TV API call function
    tvAPI: function (searchTerm) {
     
      var queryURL = `https://api.themoviedb.org/3/search/tv?api_key=0351780339b03ea3cf61554eb7f3d4cb&query=${searchTerm}`;

      $.get(queryURL, function (response) {


        if (response.Response === "False") { alert("No results found"); return }
        else {
          console.log(response);
          var tvObj = {tvTitle:response.results[0].original_name, tvGenre:response.results[0].genre_ids, tvReviews:response.results[0].popularity, tvRating:response.results[0].vote_average, tvPlot:response.results[0].overview, tvImg:"https://image.tmdb.org/t/p/w500/"+response.results[0].poster_path}
          const thisHolder = titleBox.contents().clone().attr("id", searchTerm);
          thisHolder.find(".title-img").css("background-image", "url(" + tvObj.tvImg + ")");
          thisHolder.find(".title-title").text(tvObj.tvTitle);
          thisHolder.find(".title-genre").text(tvObj.tvGenre);
          thisHolder.find(".title-rating").text(tvObj.tvRating);
          //thisHolder.find(".title-review").text(tvObj.tvReviews);
          thisHolder.find(".title-plot").text(tvObj.tvPlot);
          thisHolder.find(".memory-buttons").attr("data-memory", tvObj.tvRating);

          tvHolder.prepend(thisHolder);
          const addButt = $(".add-butt");

          addButt.on("click", function (event) {
            thisSaveButt = $(this).parent().attr("data-memory");
            storedTV = JSON.parse(localStorage.getItem("tv"));
            if (!storedTV) {
              storedTV = [];
              storedTV.push(tvObj);
              localStorage.setItem('tv', JSON.stringify(storedTV));

              return;
            }
            let exists = false;
            storedTV.forEach(function (index) {

              if (thisSaveButt === index.tvTitle) {
                alert("This title already exists in your list");
                exists = true
                return;
              }
            });
            if (!exists) {
              storedTV.push(tvObj);
              localStorage.setItem('tv', JSON.stringify(storedTV));
            }

          });

        }
      });

    },
  }
  });

 