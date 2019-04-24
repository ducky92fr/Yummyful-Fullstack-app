const searchBtn = document.getElementById("btn-search");
const formSearch = document.getElementById("form-search");
const searchInput = document.getElementById("input-search");
const wrap = document.getElementById("wrap");
const titleSearch = document.getElementById("title-search");
const url = "http://localhost:3000";
let deltaElement;
let trackLastIndex = 0;
let arrayResult = [];

function fillMarkup(data, index) {
  const image = data[index].imageURL;
  const title = data[index].title;
  const type = data[index].type;
  const duration = data[index].duration;
  const markup = `
  <div class="recipe">
           <img class="image-grid" src=${image} alt="">
           <h1 class="type-dish">${type}</h1>
           <button class="recipe__love">
               <svg class="header__likes">
                   <use href="../icons.svg#icon-heart-outlined"></use>
               </svg>
           </button>
           <div class="recipe-details">
               <div class="recipe-name">${title}
               </div>
               <div class="duration-column">
                   <svg class="clock-icon">
                       <use href="../icons.svg#icon-stopwatch">
                       </use>
                   </svg>
                   <div class="duration">${duration}</div>
               </div>
           </div>
       </div>
   `;
  wrap.insertAdjacentHTML("beforeend", markup);
}

function displayResults(data) {
  deltaElement = 0;
  wrap.innerHTML = "";
  let loopLength;
  data.length <= 9 ? (loopLength = data.length) : (loopLength = 9);
  for (let i = 0; i < loopLength; i++) {
    fillMarkup(data, i);
  }
  trackLastIndex = loopLength;
  deltaElement = data.length - 9;
  console.log(deltaElement);
  searchInput.value = "";
}
function searchRecipes(e) {
  e.preventDefault();
  axios
    .get(`${url}/api/searchapi?q=${searchInput.value}`)
    .then(result => {
      titleSearch.innerText = "";
      const valueCamelCase =
        searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1);
      result.data.length > 0
        ? (titleSearch.innerText = valueCamelCase)
        : (titleSearch.innerText = "No Result");
      arrayResult = [...result.data];
      window.history.pushState(
        null,
        null,
        `/recipes/search?q=${searchInput.value}`
      );
      displayResults(arrayResult);
    })
    .catch(error => {
      console.log("error");
    });
}

function fetchDataURL() {
  const valueSearch = window.location.search.split("=")[1];
  const valueCamelCase =
    valueSearch.charAt(0).toUpperCase() + valueSearch.slice(1);
  axios
    .get(`${url}/api/searchapi?q=${valueCamelCase}`)
    .then(result => {
      titleSearch.innerText = "";
      result.data.length > 0
        ? (titleSearch.innerText = valueCamelCase)
        : (titleSearch.innerText = "No Result");
      arrayResult = [...result.data];
      displayResults(arrayResult);
    })
    .catch(error => {
      console.log("error");
    });
}

formSearch.onsubmit = searchRecipes;

// Scroll
function scrollPageController() {
  const contentHeight = wrap.offsetHeight;
  let yOffset = window.pageYOffset;
  let y = yOffset + window.innerHeight;
  if (y >= contentHeight && deltaElement > 0) {
    let loopLength;
    console.log(arrayResult);
    deltaElement > 9 ? (loopLength = 9) : (loopLength = deltaElement);
    for (let i = 0; i < loopLength; i++) {
      fillMarkup(arrayResult, trackLastIndex);
      trackLastIndex++;
      deltaElement--;
    }
  }
}
window.onscroll = scrollPageController;
window.onpopstate = fetchDataURL;
window.onload = fetchDataURL;

// const searchBtn = document.getElementById("btn-search");
// const formSearch = document.getElementById("form-search");
// const image = document.querySelectorAll(".image-grid");
// const name = document.querySelectorAll(".recipe-name");
// const type = document.querySelectorAll(".type-dish");
// const duration = document.querySelectorAll(".duration");
// const searchInput = document.getElementById("input-search");
// const url = "http://localhost:3000/api";

// function displayResults(data) {
//   let arrayLength;
//   data.length <= 9 ? (arrayLength = data.length) : (arrayLength = 9);
//   for (let i = 0; i < arrayLength; i++) {
//     console.log(data);
//     image[i].src = data[i].imageURL;
//     name[i].innerText = data[i].title;
//     type[i].textContent = data[i].type;
//     duration[i].textContent = data[i].duration
//       .replace(/\D/g, "")
//       .concat("", "'");
//   }
// }
// function searchRecipes(e) {
//   e.preventDefault();
//   axios
//     .get(`${url}/search?q=${searchInput.value}`)
//     .then(result => {
//       displayResults(result.data);
//       searchInput.value = "";
//     })
//     .catch(error => {
//       console.log("error");
//     });
// }

// formSearch.onsubmit = searchRecipes;
