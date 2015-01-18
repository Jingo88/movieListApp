var body = document.querySelector('body');
var submit = document.querySelector('button');
var input = document.querySelector('input');
var img = document.querySelector('img');
var title = document.querySelector('#title');
var cast = document.querySelector('#actors');
var directors = document.querySelector('#directors');
var writers = document.querySelector('#writers');
var genre = document.querySelector('#genre');
var rank = document.querySelector('#topRank');
var category = document.querySelector('.category');

//run the find poster function on click or enter
submit.addEventListener('click', function() {
    findPoster();
});
input.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        findPoster();
    }
})

category.addEventListener('click', function(){
    topHundred();
})

function topHundred(){
    var movie = input.value

    var movie_url = encodeURI(movie)
    var url = "http://omdbapi.com/?t=" + movie_url
    var xhr = new XMLHttpRequest();
    
    xhr.addEventListener('load', function(e) {

    })
    xhr.open("GET", url);
    xhr.send();
}



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

        body.appendChild(title);
        body.appendChild(cast);
        body.appendChild(directors);
        body.appendChild(writers);
        body.appendChild(genre);
        console.log(parsed);
    })
    xhr.open("GET", url);
    xhr.send();
}