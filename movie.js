$(document).ready(function(){
    $('#homepage').addClass('appear');
    $('#toppage').addClass('disappear');
    $('#moviepage').addClass('disappear');
    $('#televisionpage').addClass('disappear');
    $('#documentarypage').addClass('disappear');
    $('#movieFound').addClass('disappear');
    pageNavigation();

})

function pageNavigation(){
    $(".navLink").click(function(){
        $('.page').removeClass('appear').addClass('disappear');
        // removeActive();
        // $(this).addClass('buttonon');
        // $('.bc').removeClass('active');
        // $('.bc').addClass('notactive');
        var newPage = $(this).attr('id')+'page';
        $("#"+newPage).removeClass('disappear').addClass('appear'); 
    });
}

function removeActive(){
    $('.navigation').removeClass('buttonon');
}


var body = document.querySelector('body');
var submit = document.querySelector('#movieFind');
var input = document.querySelector('#movieInput');
var result = document.querySelector('#movieFound');
var movieInfo = document.querySelector('#movieInfo');


// Declared variables for the home page
var img = document.querySelector('img');
var title = document.querySelector('#title');
var cast = document.querySelector('#actors');
var directors = document.querySelector('#directors');
var writers = document.querySelector('#writers');
var genre = document.querySelector('#genre');
var year = document.querySelector('#year');
var movierating = document.querySelector('#year');
var imdbrating = document.querySelector('#year');
var rotten = document.querySelector('#rtstuff');


// Declared variables for the rankings page
var rank = document.querySelector('#topRank');
var listmovieInfo = document.querySelector('#listmovieInfo');
var listtitle = document.querySelector('#listtitle');
var listcast = document.querySelector('#listactors');
var listdirectors = document.querySelector('#listdirectors');
var listwriters = document.querySelector('#listwriters');
var listgenre = document.querySelector('#listgenre');



//run the find poster function on click or enter
submit.addEventListener('click', function() {
    $('#movieFound').removeClass('disappear').addClass('appear');
    $('.refresh').empty();

    if ()
    findPoster();
    boom();
    moveBar();
});
input.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        $('#movieFound').removeClass('disappear').addClass('appear');
        $('.refresh').empty();
        findPoster();
        boom();
        moveBar();
    }
})

function moveBar(){
    $('#movieSearch').css('top', '5%');

}

$('.movieRank').click(function(){
    var movie = $(this).text()
    console.log(this);
    console.log(movie);
    $('.refresh').empty();

    var movie_url = encodeURI(movie)
    var url = "http://omdbapi.com/?t=" + movie_url
    var xhr = new XMLHttpRequest();
    
    xhr.addEventListener('load', function(e) {

        var d = xhr.responseText
        var parsed = JSON.parse(d)

        //bringing in the list of movie stuff
        var castName = parsed.Actors.split(',');
        var directorName = parsed.Director.split(',');
        var writerName = parsed.Writer.split(',');
        var genreType = parsed.Genre.split(',');

        for (i=0; i<castName.length; i++){
            var li = document.createElement("li");
            li.innerText = castName[i];
            listcast.appendChild(li);
        };

        for (i=0; i<directorName.length; i++){
            var li = document.createElement("li");
            li.innerText = directorName[i];
            listdirectors.appendChild(li);
        };

        for (i=0; i<writerName.length; i++){
            var li = document.createElement("li");
            li.innerText = writerName[i];
            listwriters.appendChild(li);
        };

        for (i=0; i<genreType.length; i++){
            var li = document.createElement("li");
            li.innerText = genreType[i];
            listgenre.appendChild(li);
        };


        // img.src = parsed.Poster;

        listtitle.innerText = parsed.Title;
        listmovieInfo.appendChild(listtitle);
        listmovieInfo.appendChild(listcast);
        listmovieInfo.appendChild(listdirectors);
        listmovieInfo.appendChild(listwriters);
        listmovieInfo.appendChild(listgenre);

        console.log(parsed)
    })
    xhr.open("GET", url);
    xhr.send();
})



function findPoster() {
    var movie = input.value

    var movie_url = encodeURI(movie)
    var url = "http://omdbapi.com/?t=" + movie_url
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function(e) {

        var d = xhr.responseText
        var parsed = JSON.parse(d)

        //bringing in the list of movie stuff
        var castName = parsed.Actors.split(',');
        var directorName = parsed.Director.split(',');
        var writerName = parsed.Writer.split(',');
        var genreType = parsed.Genre.split(',');

        for (i=0; i<castName.length; i++){
            var li = document.createElement("li");
            li.innerText = castName[i];
            cast.appendChild(li);
        };

        for (i=0; i<directorName.length; i++){
            var li = document.createElement("li");
            li.innerText = directorName[i];
            directors.appendChild(li);
        };

        for (i=0; i<writerName.length; i++){
            var li = document.createElement("li");
            li.innerText = writerName[i];
            writers.appendChild(li);
        };

        for (i=0; i<genreType.length; i++){
            var li = document.createElement("li");
            li.innerText = genreType[i];
            genre.appendChild(li);
        };


        img.src = parsed.Poster;
        title.innerText = parsed.Title;


        movieInfo.appendChild(title);
        movieInfo.appendChild(cast);
        movieInfo.appendChild(directors);
        movieInfo.appendChild(writers);
        movieInfo.appendChild(genre);
        console.log(parsed);
    })
    xhr.open("GET", url);
    xhr.send();
}

// THIS IS YOUR RT API KEY
//tutuzpx6jygc5wretb22bqnj

// Rotten Tomatoes API Example with Javascript
// where in this api example code does it allow me to get multiple movies based off similar titles
//is it part of the ajax data type function?


var apikey = "tutuzpx6jygc5wretb22bqnj";
var baseUrl = "http://api.rottentomatoes.com/api/public/v1.0";
 
// construct the uri with our apikey
var moviesSearchUrl = baseUrl + '/movies.json?apikey=' + apikey;
// var query = "Gone with the Wind";
 
function boom() {
 
    var query = input.value;     
    console.log(query);
  // send off the query
  $.ajax({
    url: moviesSearchUrl + '&q=' + encodeURI(query),
    //is it better to use json or jsonp datatype?
    dataType: "jsonp",
    success: searchCallback
  });
};
 
// callback for when we get back the results
function searchCallback(data) {
    var query = input.value; 
    //the data makes an array with objects inside
    console.log("this is the data   " + data);

    // var parsed = JSON.parse(data);
    // console.log("DOES PARSED WORK?   " + parsed)

 // $(document.body).append('Found ' + data.total + ' results for ' + query);
 var movies = data.movies;

    console.log("The MOVIES   " + movies)

//the for each loops through the entire object and grabs all movies with the same/similar title
 $.each(movies, function(index, movie) {

    //code below is printing a new li with a link tag inside every time this loops
        var li = document.createElement("li");
        li.innerHTML = "<a href=''>" + movie.title + "</a>";
        rotten.appendChild(li);

    console.log(movies)

    // the below jQuery came with the example
    
    
   $(document.body).append('<h1>' + movie.title + '</h1>');

   $(document.body).append('<img src="' + movie.posters.thumbnail + '" />');
 });
}

//how do you want to format your home page? 
//if the object has more than one movie then loop through it and create a list
// if the object only has one movie than print out the stuff.
//how do you want to combine the omdb and rotten tomatoes api information?
//make each li clickable just like what we did with the other list?

// function homeSearch(data){
//     var query = input.value;


// }

















