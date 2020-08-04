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
  });
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
      // Making the template clone and positioning it in the DOM
      thisHolder = movieHolder.prepend(titleBox.contents().clone());
      // Building the API query URL
      const queryURL = `https://www.omdbapi.com/?t=${searchTerm}&apikey=trilogy`;


        // Placing the Values in the template
        thisHolder.find(".title-img").css("background-image", "url(" + imgSrc + ")");
        thisHolder.find(".title-title").text(title);
        thisHolder.find(".title-genre").text(genre);
        thisHolder.find(".title-rating").text(rating);
        thisHolder.find(".title-review").text(reviews);
        thisHolder.find(".title-plot").text(plot);
      var selectedMov = []







  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    if (response.Response === "False") { alert("No results found"); return }
    else {


      const title = response.Title;
      const genre = response.Genre;
      const imgSrc = response.Poster;
      const rating = response.Rated;
      const plot = response.Plot;
      const reviews = response.Ratings[0].Value;
      var movObj = { movPlot: plot, movReviews: reviews, movTitle: title, movGenre: genre, movRate: rating, movImgSrc: imgSrc }


           thisHolder.find(".title-img").css("background-image", "url(" + imgSrc + ")");
           thisHolder.find(".title-title").text(title);
           thisHolder.find(".title-genre").text(genre);
           thisHolder.find(".title-rating").text(rating);
           thisHolder.find(".title-review").text(reviews);
           thisHolder.find(".title-plot").text(plot);

      function addBut() {
        var selBut = $("<button>");
        selBut.text("Add");
        selBut.on("click", function () {


          selectedMov.push(movObj);


          localStorage.setItem('movies', JSON.stringify(selectedMov));


          renderList();
        });
        $("#newDiv").append(selBut);
      }


      function exist() {
        for (i = 0; i < selectedMov.length; i++) {
          if (title === selectedMov[i].movTitle) { return true }

        }
      }
      if (exist === true) { return }
      else { addBut() }
    }
  });




function renderList() {
  $("#newDiv").html("");
  for (i = 0; i < selectedMov.length; i++) {
    var movBut = $("<button>");
    movBut.text(selectedMov[i].movTitle);
    movBut.attr('data-index', i);
    movBut.attr('value', selectedMov[i]);
    movBut.on("click", function () {
      var Index = this.dataset.index;


      thisHolder.find(".title-img").css("background-image", "url(" + selectedMov[Index].movImgSrc + ")");
      thisHolder.find(".title-title").text(selectedMov[Index].movTitle);
      thisHolder.find(".title-genre").text(selectedMov[Index].movGenre);
      thisHolder.find(".title-rating").text(selectedMov[Index].movRate);
      thisHolder.find(".title-review").text(selectedMov[Index].movReviews);
      thisHolder.find(".title-plot").text(selectedMov[Index].movPlot);
      var removeBut = $("<button>");
      removeBut.text("Remove");
      removeBut.on("click", function () {
        var thisMov = localStorage.getItem("movies");
        var movArray = JSON.parse(thisMov);
        movArray.splice(Index, 1);
        localStorage.setItem("movies", JSON.stringify(movArray));
        selectedMov.splice(Index, 1);
        clear();
        load();

      })
      $("#newDiv").append(removeBut);

    });
    $("#newDiv").append(movBut);

  }
}


function load() {

  if (localStorage.getItem("movies") === null) { return }
  else {
    var tempMov = localStorage.getItem("movies");
    selectedMov = JSON.parse(tempMov);
  }

  renderList();
}

function clear() {
  thisHolder.find(".title-img").html("");
  thisHolder.find(".title-title").text("");
  thisHolder.find(".title-genre").text("");
  thisHolder.find(".title-rating").text("");
  thisHolder.find(".title-review").text("");
  thisHolder.find(".title-plot").text("");

}



load();

    
},
  

    // Book API call function
    bookAPI: function (searchTerm) {
      thisHolder = bookHolder.prepend(titleBox.contents().clone());
      console.log(`${searchTerm} is the book`);
    },
    // TV API call function
    tvAPI: function (searchTerm) {
      thisHolder = tvHolder.prepend(titleBox.contents().clone());
      console.log(`${searchTerm} is the T.V. show`);

      var tvShows = [];
      // displayMovieInfo function re-renders the HTML to display the appropriate content
      


        var queryURL = `https://api.themoviedb.org/3/search/tv?api_key=0351780339b03ea3cf61554eb7f3d4cb&query=${searchTerm}`;

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {
          console.log(response);
          // Creating a div to hold the TV show
         // var tvDiv = $("<div class='tv'>");
          //title
          var title = response.results[0].original_name;
          console.log(title)

          // Creating an element to have the title displayed
          //var pZero = $("<p>").text("Title: " + title);

          // Displaying the title
          //tvDiv.append(pZero);
          thisHolder.find(".title-title").text(title);
          //need to get genre list
          var genreNumbers = response.results[0].genre_ids;

          //convert genre_numer to genre
          var genreArray = [
            {
              id: 10759,
              genre: "Action & Adventure"
            },
            {
              id: 16,
              genre: "Animation"
            },
            {
              id: 35,
              genre: "Comedy"
            },
            {
              id: 80,
              genre: "Crime"
            },
            {
              id: 99,
              genre: "Documentary"
            },
            {
              id: 18,
              genre: "Drama"
            },
            {
              id: 10751,
              genre: "Family"
            },
            {
              id: 10762,
              genre: "Kids"
            },
            {
              id: 9648,
              genre: "Mystery"
            },
            {
              id: 10763,
              genre: "News"
            },
            {
              id: 10764,
              genre: "Reality"
            },
            {
              id: 10765,
              genre: "Science & Fantasy"
            },
            {
              id: 10766,
              genre: "Soap"
            },
            {
              id: 10767,
              genre: "Talk"
            },
            {
              id: 10768,
              genre: "War & Politics"
            },
            {
              id: 37,
              genre: "Western"
            }
          ]
          function handle_newGenre(genreNumbers) {
            var pOne = $("<p>");
            genreNumbers.forEach(number => {
              const foundObj = genreArray.find(function (genreObj) {
                return genreObj.id === number;
              })
              // Creating an element to have the genre displayed
              if (foundObj)
              {
              pOne.append($("<span>").text(`${foundObj.genre}, `))
              // Displaying the genre

              thisHolder.find(".title-genre").html(pOne);
              
              }
            });
          }
          handle_newGenre(genreNumbers)
          // Storing the rating data
          var rating = response.results[0].vote_average;

          // // Creating an element to have the rating displayed
         

          // // Displaying the rating
          thisHolder.find(".title-rating").text(rating);
         

          // Storing the release year
          //var air_date = response.results[0].first_air_date;

          // Creating an element to hold the release year
          //var pThree = $("<p>").text("Air Date: " + air_date);

          // Displaying the release year
          //tvDiv.append(pThree);

          // Storing the plot
          var plot = response.results[0].overview;

          // Creating an element to hold the plot
          

          // Appending the plot
          
          thisHolder.find(".title-plot").text(plot);
          // Retrieving the URL for the image
          var imgURL = "https://image.tmdb.org/t/p/w200/" + response.results[0].poster_path;

          // Creating an element to hold the image
          //var image = $("<img>").attr("src", imgURL);

          // Appending the image
          //tvDiv.append(image);
          var reviews = response.results[0].popularity;
          thisHolder.find(".title-img").css("background-image","url("+ imgURL +")");
          thisHolder.find(".title-review").text(reviews)
          // Putting the entire movie above the previous movies
         // $("#movies-view").prepend(tvDiv);
        });

      

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < tvShows.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie-btn to our button
          a.addClass("movie-btn");
          // Adding a data-attribute
          a.attr("data-name", tvShows[i]);
          // Providing the initial button text
          a.text(tvShows[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-movie").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var tvShow = $("#movie-input").val().trim();

        // Adding movie from the textbox to our array
        tvShows.push(tvShow);
        console.log(tvShow);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie-btn"
      //$(document).on("click", ".movie-btn", displayMovieInfo);

      // Calling the renderButtons function to display the initial buttons
      renderButtons();


    },
  
  // All code above here for document ready function
  } });