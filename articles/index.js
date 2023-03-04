

let articlesContainer = document.getElementById("articles-container")
let topicInput = document.getElementById("topic")
let topicButton = document.getElementById("topic-submit")
let newsHeading = document.getElementById("news-heading")

var today = new Date();
// Subtract one day from the current date
today.setDate(today.getDate() - 1);
// Get the year, month, and day
var year = today.getFullYear();
var month = (today.getMonth() + 1).toString().padStart(2, '0'); // add 1 to month as it starts from 0, pad with '0' to get two digits
var day = today.getDate().toString().padStart(2, '0'); // pad with '0' to get two digits

// Create a string with the format "yyyy-mm-dd"
var date = year + '-' + month + '-' + day;




const options = { method: 'GET' };



const newsFetcher = async (topic) => {

  newsHeading.innerText = `News Realted To ${topic}`
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?q=${topic}&from=${date}&to=${date}&apiKey=680e5e1f435b4e9ca281624aba6b4d51`, options);
    const data = await response.json();
    const articles = data.articles;
    


    for (let news of articles) {
      let p = `<div class="card m-2" style="width: 15rem;">
    <img src="${news['urlToImage']}"
        class="card-img-top" alt="..." style="height: 10rem;">
    <div class="card-body">
        <h5 class="card-title" id="news-title">
            ${news['title']}
        </h5>
            <a href="${news['url']}" class="btn btn-primary" id="news-source" target="_blank">Open it📰</a>

    </div>
</div>`
      articlesContainer.insertAdjacentHTML("afterbegin", p)
    }
  } catch (err) {
    console.error(err);
  }
}



topicButton.addEventListener("click",()=>{
  articlesContainer.innerHTML = ""
  let inputVal = topicInput.value;

  newsFetcher(inputVal)
})

// Add an event listener to the window object
window.addEventListener("load", function () {
  newsFetcher("Stock Market"); // Call the example function when the page loads
});
