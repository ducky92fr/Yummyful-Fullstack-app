// import Pagination from './pagination.js'
const formSearch = document.getElementById("form-search");
const searchInput = document.getElementById("input-search");
const wrap = document.getElementById("wrap");
const titleSearch = document.getElementById("title-search");
const randomImgContainer = document.getElementById("random-img-container");
const paginationContainer = document.getElementById('pagination')
const url = document.getElementById("site_url").content;
let imageClicked;


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

function fetchDataAxios(keyword,valueCamelCase) {
  keyword === "all" ? keyword = "" : null
  return axios
  .get(`${url}/api/searchapi?q=${keyword}`)
  .then(result => {
    titleSearch.innerText = "";
    result.data.recipes.length > 0
    ? (titleSearch.innerText = `${keyword === "all" ? "All Recipes" : "Recipes that contains: " + valueCamelCase}`)
    : (titleSearch.innerText = "No Result");
    removeBackgroundImageDisplay()
    displayResults(result.data.recipes);  
    Pagination.Init(result.data.totalPages,1)
  })
  .catch(error => {
    console.log(error);
  });
}

//Search from searchbar with AJAX
function searchRecipes(e) {
  e.preventDefault();
  const valueCamelCase =
        searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1);
  fetchDataAxios(searchInput.value,valueCamelCase)
  window.history.pushState(
      null,
      null,
      `/recipes/search?q=${searchInput.value == false ? "all" : searchInput.value}`
    );
  
}

//This function is used when refresh Page, fetch data from URL,extract keyword from URL
function fetchDataURL() {
  const valueSearch = window.location.search.split("=")[1];
  if (valueSearch) {
    let valueCamelCase =
      valueSearch.charAt(0).toUpperCase() + valueSearch.slice(1);
    valueCamelCase === "All" ? valueCamelCase = "": null
   return fetchDataAxios(valueSearch,valueCamelCase)
  }else {
    addBackgroundImageDisplay()
    wrap.innerHTML=""
  }
}




function fetchDataPagination(e) {
  console.log(e.target.innerText)
  const valueSearch = window.location.search.split("=")[1];
  let valueCamelCase = valueSearch.charAt(0).toUpperCase() + valueSearch.slice(1);
    valueCamelCase === "All" ? valueCamelCase = "": null
    axios
      .get(`${url}/api/searchapi?q=${valueCamelCase}&page=${e.target.innerText}`)
      .then(result => {
        displayResults(result.data.recipes);
      })
      .catch(error => {
        console.log(error);
      });
}

// Get details fo recipe
function getAllRecipeDetails(e) {
  const id = e.target.attributes.idrecipe.value;
  axios
    .get(`${url}/api/getAPI?rID=${id}`)
    .then(result => {
      const {imageURL,title,type,duration,part,ingredients,instructions} = result.data
      const markup = `
      <div class="columns is-desktop " >
          <div class="column"> <img src="${imageURL}" alt="" class="img-recipe"/></div>
          <div class="column has-text-white">Ingredients: ${ingredients}</div>
      </div>
      <div class="columns is-desktop">
        <div class="column">
        <div  class="is-size-5 has-text-white">${title}</div>
        <div class ="has-text-white">${type}</div>
         <div class ="has-text-white">${duration}</div>
         <div class ="has-text-white">For: ${part} portions</div>
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



function removeBackgroundImageDisplay() {
  randomImgContainer.innerHTML=""
}
function addBackgroundImageDisplay() {
  if(!randomImgContainer.innerHTML){  
  const markup  = `<div class="random-img-container-not-hidden">
  <img src="3.jpg" alt="" id="random-image" class="img-not-hidden">
</div>`
  randomImgContainer.insertAdjacentHTML("afterbegin",markup)
}
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

const Pagination = {
  markup: '',
  step:2,
  // converting initialize data
  Extend: function(size,page) {
      Pagination.size = size
      Pagination.page = page ;
  },

  // add pages by number (from [s] to [f])
  Add: function(s, f) {
      for (let i = s; i < f; i++) {
          Pagination.markup += `
          <li>
          <a class="pagination-link" aria-label="Goto page ${i}">${i}</a>
        </li>`;
      }
  },

  // add last page with separator
  Last: function() {
      Pagination.markup += 
      `<li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link" aria-label="Goto page ${Pagination.size}">${Pagination.size}</a></li>`;
  },

  // add first page with separator
  First: function() {
      Pagination.markup += `
      <li>
      <a class="pagination-link" aria-label="Goto page 1">1</a>
    </li>
    <li><span class="pagination-ellipsis">&hellip;</span></li>`;
  },

  // change page
  Click: function(e) {
      Pagination.page = +this.innerHTML;
      fetchDataPagination(e);
      Pagination.Start()
  },

  // binding pages
  Bind: function() {
      const a = paginationContainer.getElementsByTagName('a');
      //check if this is current page
      for (let i = 0; i < a.length; i++) {
          if (+a[i].innerHTML === Pagination.page) a[i].classList.add("is-current")
          a[i].onclick = Pagination.Click
      }
  },

  // find pagination type
  Start: function() {
      if (Pagination.size < Pagination.step * 2 + 6) {
          Pagination.Add(1, Pagination.size + 1);
      }
      else if (Pagination.page < Pagination.step * 2 + 1) {
          Pagination.Add(1, Pagination.step * 2 + 4);
          Pagination.Last();
      }
      else if (Pagination.page > Pagination.size - Pagination.step * 2) {
          Pagination.First();
          Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
      }
      else {
          Pagination.First();
          Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
          Pagination.Last();
      }
      Pagination.Create();
  },


  Create: function() {
    paginationContainer.innerHTML = Pagination.markup;
    Pagination.markup = '';
    Pagination.Bind();
  },

  // init
  Init: function(size,page) {
      Pagination.Extend(size,page);
      Pagination.Create();
      Pagination.Start();
  }
};

document.querySelector(".modal-background").onclick = toggleRecipeDetails;
document.querySelector(".modal-close").onclick = toggleRecipeDetails;

formSearch.onsubmit = searchRecipes;
window.onpopstate = fetchDataURL;
window.onload = fetchDataURL;
