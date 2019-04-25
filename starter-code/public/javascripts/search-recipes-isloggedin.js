const searchBtn = document.getElementById("btn-search");
const formSearch = document.getElementById("form-search");
const searchInput = document.getElementById("input-search");
const wrap = document.getElementById("wrap");
const titleSearch = document.getElementById("title-search");
const url = document.getElementById("site_url").content;
let deltaElement = 0;
let trackLastIndex = 0;
let arrayResult = [];
let imageClicked;
let btnLike;

function fillMarkup(data, index) {
  const image = data[index].imageURL;
  const title = data[index].title;
  const type = data[index].type;
  const id = data[index]._id;
  const duration = data[index].duration.replace(/\D/g, "").concat("", "'");
  const markup = `
  <div class="recipe">
           <img class="image-grid" idRecipe=${id} src=${image} alt="">
           <h1 class="type-dish">${type}</h1>
           <button class="recipe__love">
               <svg class="header__likes" idRecipe=${id}>
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
  imageClicked = document.querySelectorAll(".image-grid");
  btnLike = document.querySelectorAll(".recipe__love");
  for (let i = 0; i < imageClicked.length; i++) {
    imageClicked[i].onclick = getAllRecipeDetails;
    btnLike[i].onclick = toggleLikeBtn;
  }
  trackLastIndex = loopLength;
  deltaElement = data.length - 9;
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
        ? (titleSearch.innerText = `Recipes that contain: ${valueCamelCase}`)
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
  console.log(valueSearch)
  if (valueSearch) {
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
}

formSearch.onsubmit = searchRecipes;

// Scroll
function scrollPageController() {
  const contentHeight = wrap.offsetHeight;
  let yOffset = window.pageYOffset;
  let y = yOffset + window.innerHeight;
  if (y >= contentHeight && deltaElement > 0) {
    let loopLength;
    console.log(deltaElement);
    deltaElement > 9 ? (loopLength = 9) : (loopLength = deltaElement);
    for (let i = 0; i < loopLength; i++) {
      fillMarkup(arrayResult, trackLastIndex);
      imageClicked = document.querySelectorAll(".image-grid");
      btnLike = document.querySelectorAll(".recipe__love");
      imageClicked[trackLastIndex].onclick = getAllRecipeDetails;
      btnLike[trackLastIndex].onclick = toggleLikeBtn;
      trackLastIndex++;
      deltaElement--;
    }
  }
}

// //get recipe-details

function getAllRecipeDetails(e) {
  const id = e.target.attributes.idrecipe.value;

  axios
    .get(`${url}/api/getAPI?rID=${id}`)
    .then(result => {
      console.log(result.data);
      const image = result.data.imageURL;
      const title = result.data.title;
      const type = result.data.type;
      const duration = result.data.duration;
      const portion = result.data.part;
      const ingredients = result.data.ingredients;
      const instructions = result.data.instructions;
      const markup = `

      <div class="columns is-desktop " >
          <div class="column"> <img src="${image}" alt="" class="img-recipe"/></div>
          <div class="column has-text-white">Ingredients: ${ingredients}</div>
      </div>
    <div class="columns is-desktop">
        <div class="column">
        <div  class="is-size-5 has-text-white">${title}</div>
        <div class ="has-text-white">${type}</div>
         <div class ="has-text-white">${duration}</div>
         <div class ="has-text-white">For: ${portion} portions</div>
         <div class ="has-text-white">Instructions: ${instructions}</div>
      </div>
    </div>
   `;
      document
        .getElementById("modal-recipe")
        .insertAdjacentHTML("afterbegin", markup);

      document.querySelector(".modal").classList.add("is-active");

      // Travailler avec DOM. Selectionner
    })
    .catch();
}

function toggleRecipeDetails() {
  const modal = document.querySelector(".modal");
  if (modal.classList.contains("is-active")) {
    modal.classList.remove("is-active");
    document.getElementById("modal-recipe").innerHTML = "";
  } else {
    modal.classList.add("is-active");
  }
}

document.querySelector(".modal-background").onclick = toggleRecipeDetails;
document.querySelector(".modal-close").onclick = toggleRecipeDetails;

function toggleLikeBtn(event) {
  let elementTarget = event.target.closest(".header__likes");
  let html = elementTarget.innerHTML;
  if (html.includes("icon-heart-outlined")) {
    html = html.replace("icon-heart-outlined", "icon-heart");
    elementTarget.innerHTML = html;
  } else {
    html = html.replace("icon-heart", "icon-heart-outlined");
    elementTarget.innerHTML = html;
  }
}

window.onscroll = scrollPageController;
window.onpopstate = fetchDataURL
window.onload = fetchDataURL;
