document.addEventListener('DOMContentLoaded', ()=>{
    const elementosCarousel = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elementosCarousel, {
        duration: 150,
        shift: 5,
        padding: 5,
        numVisible: 5,

    });
});

//variables
var formMovie = document.querySelector('#movieSearch');
var inputMovie = document.querySelector('#movieInput');
var formMusic = document.querySelector('#musicSearch');
var inputMusic = document.querySelector('#musicInput');
//search for movies
function movieSearch (title) {
    fetch ('http://www.omdbapi.com/?s='+title+'&type=movie&page=1&apikey=70c6cc67')
        .then (function (response) {
            return response.json();
        })
        .then (function (data) {
            posterDisplay(data);
            
        })
}

//display posters in carousel
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
}

// ! display movie information -- Incomplete
function movieDataDisplay(movieInfo, y) {
    console.log(movieInfo);
    console.log(y);
    console.log(movieInfo[y].Title);
}

//accepting information from movie title search
formMovie.addEventListener('submit', function(e){
    e.preventDefault();

    //getting city name
    movie = inputMovie.value.trim();

    //clear form
    inputMovie.value = "";

    //get movies
    movieSearch(movie);
})

function albumDisplay(data) {
    console.log(data);
    
    $("#music-carousel").empty();

    for(i=0; i < 10; i++) {
        $("#music-carousel")
            .append('<a class="carousel-item" data-item ='+i+'><img src='+data.albums.items[i].data.coverArt.sources[0].url+'></a>')
        $('#item'+i)
            .click(function() {
                
            })
    }

    elementosCarousel = document.querySelectorAll('.carousel');
    instances = M.Carousel.init(elementosCarousel, {
            duration: 150,
            shift: 5,
            padding: 5,
            numVisible: 5,

    });
}

//music API testing
function musicSearch (artist) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8dd9082dcamshb3ce755dcfe2fcbp1d477cjsna72aacf57cc3',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    
    fetch('https://spotify23.p.rapidapi.com/search/?q='+artist+'&type=artist&offset=2&limit=10&numberOfTopResults=5', options)
        .then(response => response.json())
        .then(function (data) {
            albumDisplay(data);   
        })
        .catch(err => console.error(err));
}

formMusic.addEventListener('submit', function(e){
    e.preventDefault();

    //getting city name
    music = inputMusic.value.trim();

    //clear form
    inputMusic.value = "";

    //get movies
    musicSearch(music);
})