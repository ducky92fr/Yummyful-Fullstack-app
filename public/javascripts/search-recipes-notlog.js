const searchBtn = document.getElementById("btn-search");
const formSearch = document.getElementById("form-search");
const searchInput = document.getElementById("input-search");
const wrap = document.getElementById("wrap");
const titleSearch = document.getElementById("title-search");
const url = document.getElementById("site_url").content;
let imageClicked;
let btnLike;



function searchRecipes(e) {
  e.preventDefault();
  axios
    .get(`${url}/api/searchapi?q=${searchInput.value}`)
    .then(result => {
      titleSearch.innerText = "";
      const valueCamelCase =
        searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1);
      result.data.recipes.length > 0
        ? (titleSearch.innerText = `${searchInput.value == false ? "All Recipes" : "Recipes that contains: " + valueCamelCase}`)
        : (titleSearch.innerText = "No Result");
      window.history.pushState(
        null,
        null,
        `/recipes/search?q=${searchInput.value == false ? "all" : searchInput.value}`
      );
      toggleBackgroundImageDisplay();
      displayResults(result.data.recipes);
    })
    .catch(error => {
      console.log("error");
    });
}

function displayResults(arrayRecipes) {
  wrap.innerHTML = "";
  let loopLength;
  arrayRecipes.length < 9 ? loopLength = arrayRecipes.length : loopLength = 9
  for (let i = 0; i < loopLength; i++) {
    fillMarkup(arrayRecipes, i);
  }

  imageClicked = document.querySelectorAll(".image-grid");
  for (let i = 0; i < loopLength; i++) {
    imageClicked[i].onclick = getAllRecipeDetails;
  }
  searchInput.value = "";
}


function fillMarkup(data,index) {
  const image = data[index].imageURL;
  const title = data[index].title;
  const type = data[index].type;
  const id = data[index]._id;
  const duration = data[index].duration.replace(/\D/g, "").concat("", "'");
  const markup = `
  <div class="recipe">
           <img class="image-grid" idRecipe=${id} src=${image} alt="">
           <h1 class="type-dish">${type}</h1>
           <a href="/user">
           <button class="recipe__love">
           <i class="far fa-heart fa-2x heartgreen"></i>
           </button>
           </a>
           <div class="recipe-details">
               <div class="recipe-name">${title}
               </div>
               <div class="duration-column">
                   <i class="far fa-clock"></i>
                   <div class="duration">${duration}</div>
               </div>
           </div>
       </div>
   `;
  wrap.insertAdjacentHTML("beforeend", markup);
}






function toggleBackgroundImageDisplay() {
  const randomImg = document.getElementById("random-image");
  const randomImgContainer = document.getElementById("random-img-container");
    randomImg.classList.remove("img-not-hidden");
    randomImgContainer.classList.remove("random-img-container-not-hidden");
    randomImg.classList.add("img-hidden");
    randomImgContainer.classList.add("random-img-container-hidden");
}


function fetchDataURL() {
  const valueSearch = window.location.search.split("=")[1];
  if (valueSearch) {
    const valueCamelCase =
      valueSearch.charAt(0).toUpperCase() + valueSearch.slice(1);
    axios
      .get(`${url}/api/searchapi?q=${valueCamelCase}`)
      .then(result => {
        titleSearch.innerText = "";
        result.data.recipes.length > 0
          ? (titleSearch.innerText = valueCamelCase)
          : (titleSearch.innerText = "No Result");
        arrayResult = [...result.data.recipes];
        toggleBackgroundImageDisplay()
        displayResults(arrayResult);
      })
      .catch(error => {
        console.log("error");
      });
  }
}

formSearch.onsubmit = searchRecipes;



function getAllRecipeDetails(e) {
  const id = e.target.attributes.idrecipe.value;
  axios
    .get(`${url}/api/getAPI?rID=${id}`)
    .then(result => {
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

    })
    .catch(err => console.log(err));
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

window.onpopstate = fetchDataURL;
window.onload = fetchDataURL;
