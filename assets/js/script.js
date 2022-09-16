document.addEventListener('DOMContentLoaded', () => {
    const elementosCarousel = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elementosCarousel, {
        duration: 150,
        dist: -80,
        shift: 5,
        padding: 5,
        numVisible: 10,

    });
});

//HTML variables
var formMovie = document.querySelector('#movieSearch');
var inputMovie = document.querySelector('#movieInput');
var formMusic = document.querySelector('#musicSearch');
var inputMusic = document.querySelector('#musicInput');
var movieSelector = document.querySelector('#movie-selector');
var albumSelector = document.querySelector('#album-selector');

//array for paired selections
var selectedPair = {
    Movie: {
        Title: '',
        imdbLink: '',
        Poster: ''
    },
    Album: {
        Title: '',
        Link: '',
        AlbumCover: ''
    }
};

function displaySelections (selectedPair) {
    console.log(selectedPair);
    console.log("testing");
    $('#selected-movie').src = selectedPair.Movie.Poster;
    $('#selected-album').src = selectedPair.Album.Album;
}

function movieDataDisplay(movie) {
    fetch('http://www.omdbapi.com/?i=' + movie + '&type=movie&apikey=70c6cc67&plot=short')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $('#active-movie-poster').attr('src', data.Poster);
            $('#active-movie-title').html(data.Title);
            $('#active-movie-year').html(data.Year);
            $('#active-movie-plot').html(data.Plot);
            $('#active-movie-imdb').html("<a href = 'https://www.imdb.com/title/" + data.imdbID + "' target = '_blank'>IMDB Data</a>");
        })
}

//display posters in carousel
function posterDisplay(data) {
    console.log(data);
    console.log(data.Search.length);
    $("#movie-carousel").empty();

    for (i = 0; i < data.Search.length; i++) {
        $("#movie-carousel")
            .append(`<a class= 'carousel-item' id = 'item${i}' data-item ='${i}'><img src='${data.Search[i].Poster}'></a>`)
        $('#item' + i)
            .click(function () {
                movieDataDisplay(data.Search[this.dataset.item].imdbID);
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

//movie api fetch
function movieSearch(title) {
    fetch('http://www.omdbapi.com/?s=' + title + '&type=movie&page=1&apikey=70c6cc67')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            posterDisplay(data);
        })
}

//add selected movie to pair
movieSelector.addEventListener('click', function () {
    selectedPair.Movie.Title = document.getElementById('active-movie-title').textContent;
    selectedPair.Movie.imdbLink = document.getElementById('active-movie-imdb').textContent;
    selectedPair.Movie.Poster = document.getElementById('active-movie-poster').src;

    displaySelections(selectedPair);
})


//accepting information from movie title search
formMovie.addEventListener('submit', function (e) {
    e.preventDefault();

    //getting city name
    movie = inputMovie.value.trim();

    //clear form
    inputMovie.value = "";

    //get movies
    movieSearch(movie);
})

// ! display albums information in card -- Incomplete
function albumDataDisplay(albumInfo, y) {
    var spotifyLink = albumInfo[y].data.uri;
    spotifyLink = spotifyLink.split(":").pop();

    $('#active-music-poster').attr('src', albumInfo[y].data.coverArt.sources[0].url);
    $('#active-album-title').html(albumInfo[y].data.name);
    $('#active-artist').html(albumInfo[y].data.artists.items[0].profile.name);
    $('#active-spotify-link').html(`<a id = "selected-spotify-link" href = https://open.spotify.com/album/${spotifyLink} target = '_blank'>Listen on Spotify</a>`);
}

//displaying albums in carousel
function albumDisplay(data) {
    console.log(data);

    $("#music-carousel").empty();

    for (i = 0; i < 10; i++) {
        $("#music-carousel")
            .append('<a class="carousel-item" id = "item' + i + '" data-item =' + i + '><img src=' + data.albums.items[i].data.coverArt.sources[0].url + '></a>')
        $('#item' + i)
            .click(function () {
                albumDataDisplay(data.albums.items, this.dataset.item);
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

//music API fetch
function musicSearch(artist) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8dd9082dcamshb3ce755dcfe2fcbp1d477cjsna72aacf57cc3',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    fetch('https://spotify23.p.rapidapi.com/search/?q=' + artist + '&type=artist&offset=2&limit=10&numberOfTopResults=5', options)
        .then(response => response.json())
        .then(function (data) {
            albumDisplay(data);
        })
        .catch(err => console.error(err));
}

//add selected movie to pair
albumSelector.addEventListener('click', function () {
    selectedPair.Album.Title = document.getElementById('active-album-title').textContent;
    selectedPair.Album.Link = document.getElementById('selected-spotify-link').href;
    selectedPair.Album.AlbumCover = document.getElementById('active-music-poster').src;

    displaySelections(selectedPair);
})

//getting music information from user
formMusic.addEventListener('submit', function (e) {
    e.preventDefault();

    //getting city name
    music = inputMusic.value.trim();

    //clear form
    inputMusic.value = "";

    //get movies
    musicSearch(music);
})