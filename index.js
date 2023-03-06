document.addEventListener( "DOMContentLoaded", () => {
    fetch('http://localhost:3000/Movies')
    .then(response => response.json())
    .then(data => data.forEach(movie =>  renderMovie(movie)))
})

function renderMovie(movie){
    const movieCards = document.getElementById("movie-cards")
    const innerDiv = document.createElement("div")
// create div
    const movieCard = document.createElement("div")
// name
    const movieName = document.createElement("h1")
    movieName.innerText = movie.name
// img
    const movieImg = document.createElement("img")
    movieImg.src = movie.image
    movieImg.alt = `${movie.name} image`

    movieCard.append(movieName, movieImg, innerDiv)
    movieCards.append(movieCard)

    //  drop down stuff
    movieImg.addEventListener("click", ()=> {
        innerDiv.innerHTML = ""
        innerDiv.className = "inner-div"
        // run time 
        const runTime = document.createElement("p")
        runTime.innerText = `Runtime: ${movie.runTime}`
    //  current rating
        const movieRating = document.createElement("p")
        movieRating.className = "rating"
        movieRating.innerText = `Potatoes: ${movie.rating}`
    //  likeButton increas 
        const ratingIncreas = document.createElement("button")
        ratingIncreas.className = "rating-increas"
        ratingIncreas.innerText = "+"
    //  rating decrease
        const ratingDecrease = document.createElement("button")
        ratingDecrease.className = "rating-decrease"
        ratingDecrease.innerText = "-"
        innerDiv.append(runTime, movieRating, ratingIncreas, ratingDecrease)
    //  comment section div
        const commentDiv = document.createElement('div')
        commentDiv.className = "comment-section"
        // form 
        const form = document.createElement("form")
        form.className = "comment-form"
        form.innerText = "form"
        // append
        commentDiv.append(form)
        movieCard.append(commentDiv)
    
    })

}

