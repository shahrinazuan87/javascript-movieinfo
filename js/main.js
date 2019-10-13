$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    })
});

function getMovies(searchText){
    axios.get('https://www.omdbapi.com?s='+searchText+'&apikey=13596254') //return promise
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" href="#" class="btn btn-primary">Movies Details</a>
                    </div>
                </div>
                `; 
            });

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'moviedetails.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://www.omdbapi.com?i='+movieId+'&apikey=13596254') //return promise
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output =`
                <div class="row">
                    <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                        </ul>
                    </div
                </div>
                <div class="row">
                    <div class="well" style="margin-top: 20px;  margin-left: 30px">
                        <h3>Plot</h3>
                        <p style="color: white">${movie.Plot}</p>
                        <hr>
                        <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="index.html" class="btn btn-warning">Go Back to Search</a>
                    </div>
                </div>
            `;

            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}