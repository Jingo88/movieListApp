var body = document.querySelector('body');
var submit = document.querySelector('button');
var input = document.querySelector('input');
var img = document.querySelector('img');
var title = document.querySelector('#title');

//run the find poster function on click or enter
submit.addEventListener('click', function() {
    findPoster();
});
input.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        findPoster();
    }
})

function findPoster() {
    var movie = input.value
    var movie_url = encodeURI(movie)
    var url = "http://omdbapi.com/?t=" + movie_url
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(e) {
        var d = xhr.responseText
        var parsed = JSON.parse(d)

        img.src = parsed.Poster;
        title.innerText = parsed.Title;
        body.appendChild(title);
        console.log(parsed);
    })
    xhr.open("GET", url);
    xhr.send();
}