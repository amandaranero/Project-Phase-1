

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
        const commentDiv = document.createElement('div')
        commentDiv.className = "comment-section"
        commentDiv.innerHTML = ""
        innerDiv.innerHTML = ""
        innerDiv.className = "inner-div"
        // run time 
        const runTime = document.createElement("p")
        runTime.innerText = `Runtime: ${movie.runTime}`


        //RATING
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


        // form 
        const form = document.createElement("form")
        form.className = "comment-form"
        commentDiv.append(form)
        //form detail
        const addComment = document.createElement("h3")
        addComment.innerText = "Add a comment!"
        form.append(addComment)
        //FORM INSERT COMMENT INPUT
        const commentInput = document.createElement("input")
        commentInput.type = "text"
        commentInput.name = "name"
        commentInput.value = ""
        commentInput.className = "comment-input"
        commentInput.placeholder = "Enter Comment Here"
        form.append(commentInput)
    //     //FORM SUBMIT FOR COMMENT
        const commentSubmit = document.createElement("input")
        commentSubmit.type = "submit"
        commentSubmit.name = "submit"
        commentSubmit.value = "Post Comment"
        commentSubmit.className = "submit"
        form.append(commentSubmit)
        //comment section, first have a header then a paragraph with comment info
        const commentHeader = document.createElement("h4")
        commentHeader.className = "comment-header"
        commentHeader.innerText = "Comments:"
        form.append(commentHeader)
        //
        const commentListContainer = document.createElement("ul")
        form.append(commentListContainer)
        // add for each should be a function
        function movieList (comment){ 
        movie.comment.forEach(comment =>{
        const commentList = document.createElement("li")
        commentList.className = "comment-list"
        commentList.innerText = comment
        commentListContainer.append(commentList)
        })
    }
        // append (should move)
        commentDiv.append(form)
        movieCard.append(commentDiv)
        movieList(movie.comment) //call before because it has only been called submit event
        form.addEventListener("submit", (e)=>{
        e.preventDefault()
        //set a constant comment array that will contain all inputs
        const commentArray = movie.comment
        //push the new comments into the array
        commentArray.push(form.name.value)
        fetch(`http://localhost:3000/movies/${movie.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                //replaces the new array
               comment: commentArray
         })
        })
        .then((resp)=> resp.json())
        .then((comments)=>{
        movieList(comments)
            form.reset()
       })
    })
    })

}


//RUNNING INTO TWO ISSUES:
    //1) if refresh page all comments go away 
    //2) if doing POST comments do not add to the comments section
            //do i need to make an array that can be copied, then using POST add the new comment then appended?
            //similar to what reed had to do?