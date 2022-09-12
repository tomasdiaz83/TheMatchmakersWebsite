var page = 1;

function movieSearch (title) {
    fetch ('http://www.omdbapi.com/?s='+title+'&type=movie&page=1&apikey=70c6cc67')
        .then (function (response) {
            page = 1;
            return response.json();
        })
        .then (function (data) {
            $('#container').empty()
            console.log(data);
            console.log(data.Search[0].Title);
            for(i=0; i < 10; i++) {
                $('#container')
                    .prepend('<img src = '+ data.Search[i].Poster + '>')
                    .prepend('<p>'+data.Search[i].Title+'</p>');

            }
            if (data.totalRestults > 10) {
                $('#container')
                    .append('<button id = next>Next</button>')
                    .append('<button id = next>Next</button>')
            }
            
        })
}

var form = document.querySelector('#movieSearch');
var input = document.querySelector('#search');

form.addEventListener('submit', function(e){
    e.preventDefault();

    //getting city name
    movie = input.value.trim();

    //clear form
    input.value = "";

    //get weather
    movieSearch(movie);
})