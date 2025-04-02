


/* Project: Movie Search App
   Author: Dylan
   Description: A simple web app that fetches movie data from the OMDb API.
*/

//const { response } = require("express");

// TODO: Replace this with your own API key from https://www.omdbapi.com/
const API_KEY = 'b7ca1ca0';

// TODO: These are the main DOM elements we'll be working with
const moviesDiv = document.getElementById('movies');
const detailsDiv = document.getElementById('movie-details');
const favoritesDiv = document.getElementById('favorites');
let currentMovie = null;
let currID = null;
let Data = null;
let favorites = new Map();
// var Favorites = new Set([]);


function searchMovies() {
    //Get the search query from the input field
    const query = document.getElementById('search').value;
    detailsDiv.style.display = "none"
    // TODO: Add correctly formated API Request URL to Fetch method 
    const getData = async()=>{
        try{
            const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
            const responseText = await response.json()
            //console.log(responseText);
            return responseText;
        }catch(error){
            console.log(error);
        }
        
    }
    
        
    const setData = async() => {
        const Data = await getData();
        //console.log("setData Initiated");
        //console.log(Data)

        if (Data.Search != null){
            moviesDiv.style.border = "2px solid black";
            for (let i = 0; i < Data.Search.length; i++){
                const movie = document.createElement("div");
                movie.classList.add("movie");
    
                const poster = document.createElement("img");
                poster.src = Data.Search[i].Poster;
                poster.classList.add("movie_img");
                movie.appendChild(poster);
    
                const title = document.createElement("div");
                var p = document.createElement("p");
                p.innerHTML=Data.Search[i].Title + ' ('+ Data.Search[i].Year+ ')';
                //title.createTextNode(data.Search[i].Title);
                title.appendChild(p);
                movie.appendChild(title);

    
                const detailsButton = document.createElement("button");
                
                detailsButton.id = 'detailsButton';
                detailsButton.textContent= "details";
                //detailsButton.onclick = 'toggleFavorite()'
                movie.appendChild(detailsButton);

                moviesDiv.appendChild(movie);
                detailsButton.onclick = function () {
                    console.log("clicked")
                    currID = Data.Search[i].imdbID
                    currentMovie= Data.Search[i];
                    getMovieDetails(Data.Search[i].imdbID);
                    //toggleFavorite();

                } 

            }
    
        }
    }

    
    setData();

    //TODO: Format fetch response Promise as JSON
        //TODO: Handle JSON format Promise
                // TODO: Clear the current movies display (moviesDiv)
    
                // TODO: If search results exist, loop through them and:
    
                //       1. Create a movie element for each result
                //       2. Add the movie poster (if poster available), title, and year
                //       3. Add a details button that calls getMovieDetails() with the movie imdbID
                //       4. Append each movie element to the moviesDiv       
}



function getMovieDetails(imdbID) {
    //console.log(imdbID);
     // TODO: Add correctly formated API Request URL to Fetch method 
     moviesDiv.style.display = "none";
     detailsDiv.style.display = "block";
     updateFavoriteButtonText();
     document.getElementById("info").innerHTML = '';
     const fetchDetails = async()=>{
        try{
            const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
            const responseText = await response.json()
            console.log(responseText);
            currentMovie = responseText;
            return responseText;
        }catch(error){
            console.log(error);
        }
        
    }
    //fetchDetails();
    

    const setDetails = async() => {
        currentMovie = await fetchDetails();
        currID = currentMovie.imdbID;
        //console.log(currentMovie);

        document.getElementById('title').innerHTML = currentMovie.Title + "(" + currentMovie.Year + ")";
        //var poster = document.getElementById('poster');
        //poster.src = currentMovie.Poster;
        
        

        const infoSection = document.getElementById('info');

        var poster = document.createElement("img")
        poster.src= currentMovie.Poster;
        poster.setAttribute("display", "flex");
        poster.setAttribute("justify-content", "center");
        infoSection.appendChild(poster);

        var plot = document.createElement("p")
        plot.innerHTML= "Plot: " + currentMovie.Plot;
        infoSection.appendChild(plot);

        var director = document.createElement("p")
        director.innerHTML= "Director: " + currentMovie.Director;
        infoSection.appendChild(director);

        var genre = document.createElement("p")
        genre.innerHTML= "Genre: " + currentMovie.Genre;
        infoSection.appendChild(genre);

        var actors = document.createElement("p")
        actors.innerHTML= "Actors: " + currentMovie.Actors;
        infoSection.appendChild(actors);

        var Writers = document.createElement("p")
        Writers.innerHTML= "Writer(s): " + currentMovie.Writer;
        infoSection.appendChild(Writers);

        var Runtime = document.createElement("p")
        Runtime.innerHTML= "Runtime: " + currentMovie.Runtime;
        infoSection.appendChild(Runtime);

        var Rated = document.createElement("p")
        Rated.innerHTML= "Rated: " + currentMovie.Rated;
        infoSection.appendChild(Rated);
        

        
    }

    setDetails();

    //  fetch(/*API Request URL*/)
        //TODO: Format fetch response Promise as JSON
        //TODO: Handle JSON format Promise
            // TODO: When the data returns:
            //       1. Store the movie data in the currentMovie variable
            //       2. Update the movie details section with the title, poster, and info
            //       3. Call updateFavoriteButtonText() to set the correct button text
            //       4. Hide the movies list and show the details view
}

function goBack() {
    // TODO: Hide the details view and show the movies list again
    detailsDiv.style.display = "none";
    moviesDiv.style.display = "flex";
    updateFavoriteButtonText()
    //detailsDiv.
}

/* Extra Challenge if time allows add "Favorites" feature*/

function getFavorites(){
    const favoritesID = JSON.parse(localStorage.getItem("Favorites"));
    if (favoritesID === null){
        return new Array();
    }
    //console.log(favoritesID);
    return favoritesID;
}

function removeFavorite(val, favoritesID){
    var newFavoritesID = [];
    for (let i = 0; i < favoritesID.length; i++){
        if (favoritesID[i] != val){
            newFavoritesID.push(favoritesID[i])
        }
    }
    return newFavoritesID;
}

function containsCurrentMovie(val, favoritesID){
    for (let i = 0; i < favoritesID.length; i++){
        if (favoritesID[i] == val){
            return true;
        }
    }
    return false;
}



function toggleFavorite() {
    // TODO: Get the current favorites from localStorage
    var favoritesID = getFavorites();
    //console.log(favoritesID)

    
    // TODO: Check if the current movie is already in favorites (use imdbID as unique identifier)
    // TODO: If it exists, remove it from favorites
    //       If it doesn't exist, add it to favorites
    if (containsCurrentMovie(currID, favoritesID)){
        favoritesID = removeFavorite(currID, favoritesID);
    }else{
        favoritesID.push(currID);
        if (!favorites.has(currID)){
            favorites[currID] = currentMovie;
        }
        
    }
    localStorage.setItem("Favorites", JSON.stringify(favoritesID));
    favoritesID = [];
    updateFavoriteButtonText();
    renderFavorites();

    
    // TODO: Save the updated favorites back to localStorage
    
    // TODO: Update the favorite button text and re-render the favorites list
}

function updateFavoriteButtonText() {
    console.log("updateFavoritesButton start")
    var favoritesID = getFavorites();
    
    // TODO: Get the current favorites from localStorage
    if (containsCurrentMovie(currID, favoritesID)){
        document.getElementById("favorite-btn").innerHTML = "Remove from Favorites"
    }else{
        document.getElementById("favorite-btn").innerHTML = "Add to Favorites"
    }
    // TODO: Check if the current movie is in favorites
    console.log("updateFavoritesButton end")
    // TODO: Update the favorite button text based on whether the movie is in favorites
}

function renderFavorites() {

    
    // TODO: Clear the current favorites display
    //document.getElementById("favorites").removeChild
    // TODO: Get all favorites from localStorage

    var favoritesID = getFavorites();
    favoritesDiv.innerHTML = "";


    

    const getFavoriteData = async()=>{
        try{
            var favData = new Array();
            for (let i = 0; i < favoritesID.length; i++){
                if (!favorites.has(favoritesID[i])){
                    var fetchString = (`https://www.omdbapi.com/?apikey=${API_KEY}&i=${favoritesID[i]}`);
                    const response = await fetch(fetchString);
                    const responseText = await response.json()
                    favorites[favoritesID[i]] = responseText;
        
                }
                

                favData.push(favorites[favoritesID[i]])
        
            }
            console.log("favoritesID:")
            console.log(favoritesID);
            console.log("favorites:")
            console.log(favorites);
            console.log("favData:")
            console.log(favData);
            return favData;
        }catch(error){
            console.log(error);
        }
        
    }

    const setFavoriteData = async()=> {
        try{
            const favData = await getFavoriteData();


            favData.forEach(  item => {

                const movie = document.createElement("div");
                movie.classList.add("movie");
    
                const poster = document.createElement("img");
                poster.src = item.Poster;
                poster.classList.add("movie_img");
                movie.appendChild(poster);
    
                const title = document.createElement("div");
                var p = document.createElement("p");
                p.innerHTML=item.Title + ' ('+ item.Year+ ')';
                //title.createTextNode(data.Search[i].Title);
                title.appendChild(p);
                movie.appendChild(title);

    
                const detailsButton = document.createElement("button");
                
                detailsButton.id = 'detailsButton';
                detailsButton.textContent= "details";
                detailsButton.onclick = "toggleFavorite()"
                movie.appendChild(detailsButton);

                favoritesDiv.appendChild(movie);
                detailsButton.onclick = function () {
                    //console.log("clicked")
                    getMovieDetails(item.imdbID);

            } 
            
            });


        }catch(error){
            console.log(error);
        }
    }
    
    setFavoriteData();
    // TODO: For each favorite movie:
    //       1. Create a movie element
    //       2. Add the movie poster, title, and year
    //       3. Add a details button that calls getMovieDetails() with the movie ID
    //       4. Append each movie element to the favoritesDiv
}

// TODO: Call renderFavorites when the page loads to display any saved favorites
document.addEventListener('DOMContentLoaded', renderFavorites);
document.addEventListener('DOMContentLoaded', updateFavoriteButtonText)
