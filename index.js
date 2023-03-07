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
        // current rating calculator
        const ratingCal = movie.rating.reduce((a, b) => a + b, 0)
        const ratingsTotal = ratingCal / movie.rating.length
    //  current rating
        const movieRating = document.createElement("p")
        movieRating.className = "rating"
        movieRating.innerText = `Potatoes: ${ratingsTotal} / 11`
    // likes form
        const likesForm = document.createElement("form")
        const likesInput = document.createElement("input")
        likesForm.append(likesInput)
    // input 
        likesForm.addEventListener("submit", (e) => {
            e.preventDefault()
            const movieArray = movie.rating
            movieArray.push(parseInt(likesInput.value))
            console.log(movieArray)
            fetch(`http://localhost:3000/Movies/${movie.id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({rating: movieArray})
            })
            movieRating.innerText = `potatoes: ${Math.trunc(movieArray.reduce((a,b) => a + b,0) / movieArray.length)}`
            likesForm.reset()
        })
        
        
        

        innerDiv.append(runTime, movieRating, likesForm)
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

