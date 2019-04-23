const searchBtn = document.getElementById("btn-search");
const formSearch = document.getElementById("form-search");
const image = document.querySelectorAll(".image-grid");
const name = document.querySelectorAll(".recipe-name");
const type = document.querySelectorAll(".type-dish");
const searchInput = document.getElementById("input-search");
const url = "http://localhost:3000/api";

function displayResults(data) {
  console.log("iciiiii");
  let arrayLength;
  data.length <= 9 ? (arrayLength = data.length) : (arrayLength = 9);
  for (let i = 0; i < arrayLength; i++) {
    image[i].src = data[i].imageURL;
    name[i].innerText = data[i].title;
    type[i].textContent = data[i].type;
  }
}
function searchRecipes(e) {
  e.preventDefault();
  axios
    .get(`${url}/search?q=${searchInput.value}`)
    .then(result => {
      displayResults(result.data);
    })
    .catch(error => {
      console.log("error");
    });
}

formSearch.onsubmit = searchRecipes;

// function yHandler() {
//   const wrap = document.getElementById;
// }
