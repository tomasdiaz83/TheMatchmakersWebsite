document.addEventListener('DOMContentLoaded', ()=>{
    const elementosCarousel = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elementosCarousel, {
        duration: 150,
        shift: 5,
        padding: 5,
        numVisible: 5,

    });
});


function movieSearch (title) {
    fetch ('http://www.omdbapi.com/?s='+title+'&type=movie&page=1&apikey=70c6cc67')
        .then (function (response) {
            page = 1;
            return response.json();
        })
        .then (function (data) {
            console.log(data);
            
            $("#movie-carousel").empty();

            for(i=0; i < 10; i++) {
                $("#movie-carousel")
                    .append('<a class="carousel-item"><img src='+data.Search[i].Poster+'></a>')                
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

    //get weather
    movieSearch(movie);
})