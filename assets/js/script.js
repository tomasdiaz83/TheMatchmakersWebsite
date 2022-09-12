document.addEventListener('DOMContentLoaded', ()=>{
    const elementosCarousel = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elementosCarousel, {
        duration: 150,
        shift: 5,
        padding: 5,
        numVisible: 5,

    });
});

function movieDataDisplay(movieInfo, y) {
    console.log(movieInfo);
    console.log(y);
    console.log(movieInfo[y].Title);
}

function posterDisplay (data) {
    console.log(data);
    console.log(data.Search.length);
    $("#movie-carousel").empty();

    for(i=0; i < data.Search.length; i++) {
        $("#movie-carousel")
            .append('<a class="carousel-item" id = "item'+i+'" data-item ='+i+'><img src='+data.Search[i].Poster+'></a>')
        $('#item'+i)
            .click(function() {
                movieDataDisplay(data.Search, this.dataset.item);
            })
    }

    elementosCarousel = document.querySelectorAll('.carousel');
    instances = M.Carousel.init(elementosCarousel, {
            duration: 150,
            shift: 5,
            padding: 5,
            numVisible: 5,

    });

    // if (data.totalRestults > 10) {
    //     $('#container')
    //         .append('<button id = next>Next</button>')
    //         .append('<button id = next>Next</button>')
    // }     
}

function movieSearch (title) {
    fetch ('http://www.omdbapi.com/?s='+title+'&type=movie&page=1&apikey=70c6cc67')
        .then (function (response) {
            page = 1;
            return response.json();
        })
        .then (function (data) {
            posterDisplay(data);
            
        })
}

var form = document.querySelector('#movieSearch');
var input = document.querySelector('#movieInput');

form.addEventListener('submit', function(e){
    e.preventDefault();

    //getting city name
    movie = input.value.trim();

    //clear form
    input.value = "";

    //get movies
    movieSearch(movie);
})