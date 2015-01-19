$(document).ready(function(){
    $('#homepage').addClass('appear');
    $('#toppage').addClass('disappear');
    $('#moviepage').addClass('disappear');
    $('#televisionpage').addClass('disappear');
    $('#documentarypage').addClass('disappear');
    $('#movieFound').addClass('disappear');
    // result.setAttribute('class', 'disappear');
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
    findPoster();
});
input.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        $('#movieFound').removeClass('disappear').addClass('appear');
        $('.refresh').empty();
        findPoster();
    }
})


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

//THIS IS YOUR RT API KEY
// ten5jh5qwb6zsq3c6z5gwhrm

//Rotten Tomatoes API Example with Javascript

// var apikey = "myapikey";
// var baseUrl = "http://api.rottentomatoes.com/api/public/v1.0";
 
// // construct the uri with our apikey
// var moviesSearchUrl = baseUrl + '/movies.json?apikey=' + apikey;
// var query = "Gone with the Wind";
 
// $(document).ready(function() {
 
//   // send off the query
//   $.ajax({
//     url: moviesSearchUrl + '&q=' + encodeURI(query),
//     dataType: "jsonp",
//     success: searchCallback
//   });
// });
 
// // callback for when we get back the results
// function searchCallback(data) {
//  $(document.body).append('Found ' + data.total + ' results for ' + query);
//  var movies = data.movies;
//  $.each(movies, function(index, movie) {
//    $(document.body).append('<h1>' + movie.title + '</h1>');

//    $(document.body).append('<img src="' + movie.posters.thumbnail + '" />');

//  });

// }

