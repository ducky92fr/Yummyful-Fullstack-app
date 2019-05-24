const imageClicked = document.querySelectorAll(".image-grid");
const btnLike = document.querySelectorAll(".recipe__love");
const searchInput = document.getElementById("input-search");
const wrap = document.getElementById("wrap");
const titleSearch = document.getElementById("title-search");
const randomImgContainer = document.getElementById("random-img-container");
const paginationContainer = document.getElementById("pagination");
const url = document.getElementById("site_url").content;

function displayResults(arrayRecipes) {
  wrap.innerHTML = "";
  let loopLength;
  arrayRecipes.length < 9
    ? (loopLength = arrayRecipes.length)
    : (loopLength = 9);
  for (let i = 0; i < loopLength; i++) {
    fillMarkup(arrayRecipes, i);
  }

  const imageClicked = document.querySelectorAll(".image-grid");
  const btnLike = document.querySelectorAll(".recipe__love");
  for (let i = 0; i < loopLength; i++) {
    imageClicked[i].onclick = getAllRecipeDetails;
    btnLike[i].onclick = toggleLikeBtn;
  }
}
function fillMarkup(data, index) {
  const image = data[index].imageURL;
  const title = data[index].title;
  const type = data[index].type;
  const id = data[index]._id;
  const duration = data[index].duration.replace(/\D/g, "").concat("", "'");
  const markup = `
      <div class="recipe">
        <img class="image-grid" idRecipe="${id}" src="${image}" alt="" />
        <h1 class="type-dish">${type}</h1>
        <button class="recipe__love" idrecipebtn="${id}">
          <i class=" heart far fa-heart fa-2x"></i>
        </button>
        <div class="recipe-details">
          <div class="recipe-name">${title}</div>
          <div class="duration-column">
            <i class="far fa-clock"></i>
            <div class="duration">${duration}</div>
          </div>
        </div>
      </div>

   `;
  wrap.insertAdjacentHTML("beforeend", markup);
}

function getAllFavorite(e) {
  axios
    .get(`${url}/api/favorite/get`)
    .then(result => {
      displayResults(result.data.recipes);
      Pagination.Init(result.data.totalPages, 1);
    })
    .catch(error => {
      console.log(error);
    });
}

function fetchDataPagination(e) {
  axios
    .get(`${url}/api/favorite/get?page=${e.target.innerText}`)
    .then(result => {
      console.log(result);
      displayResults(result.data.recipes);
      Pagination.Init(result.data.totalPages, +e.target.innerText);
    })
    .catch(error => {
      console.log(error);
    });
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

function toggleLikeBtn(e) {
  const elementTarget = e.target.closest(".recipe__love");
  const id = elementTarget.attributes.idrecipebtn.value;
  const heartIcon = elementTarget.childNodes[1];
  if (heartIcon.classList.contains("heart")) {
    heartIcon.classList.remove("heart");
  } else {
    heartIcon.classList.add("heart");
  }
  axios
    .post(`${url}/api/favorite/addremove?rID=${id}`)
    .then(() => console.log("update done"))
    .catch(err => console.log(err));
}

function getAllRecipeDetails(e) {
  const id = e.target.attributes.idrecipe.value;
  axios
    .get(`${url}/api/getAPI?rID=${id}`)
    .then(result => {
      const {
        imageURL,
        title,
        type,
        duration,
        part,
        ingredients,
        instructions
      } = result.data;
      const markup = `
        <div class="columns is-desktop ">
          <div class="column"><img src="${imageURL}" alt="" class="img-recipe" /></div>
          <div class="column has-text-white">Ingredients: ${ingredients}</div>
        </div>
        <div class="columns is-desktop">
          <div class="column">
            <div class="is-size-5 has-text-white">${title}</div>
            <div class="has-text-white">${type}</div>
            <div class="has-text-white">${duration}</div>
            <div class="has-text-white">For: ${part} portions</div>
            <div class="has-text-white">Instructions: ${instructions}</div>
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
const Pagination = {
  markup: "",
  step: 2,
  // converting initialize data
  Extend: function(size, page) {
    Pagination.size = size;
    Pagination.page = page;
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
    Pagination.markup += `
    <li><span class="pagination-ellipsis">&hellip;</span></li>
    <li>
      <a class="pagination-link" aria-label="Goto page ${Pagination.size}">${
      Pagination.size
    }</a>
    </li>
`;
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
    Pagination.Start();
  },

  // binding pages
  Bind: function() {
    const a = paginationContainer.getElementsByTagName("a");
    //check if this is current page
    for (let i = 0; i < a.length; i++) {
      if (+a[i].innerHTML === Pagination.page) a[i].classList.add("is-current");
      a[i].onclick = Pagination.Click;
    }
  },

  // find pagination type
  Start: function() {
    if (Pagination.size < Pagination.step * 2 + 6) {
      Pagination.Add(1, Pagination.size + 1);
    } else if (Pagination.page < Pagination.step * 2 + 1) {
      Pagination.Add(1, Pagination.step * 2 + 4);
      Pagination.Last();
    } else if (Pagination.page > Pagination.size - Pagination.step * 2) {
      Pagination.First();
      Pagination.Add(
        Pagination.size - Pagination.step * 2 - 2,
        Pagination.size + 1
      );
    } else {
      Pagination.First();
      Pagination.Add(
        Pagination.page - Pagination.step,
        Pagination.page + Pagination.step + 1
      );
      Pagination.Last();
    }
    Pagination.Create();
  },

  Create: function() {
    paginationContainer.innerHTML = Pagination.markup;
    Pagination.markup = "";
    Pagination.Bind();
  },

  // init
  Init: function(size, page) {
    Pagination.Extend(size, page);
    Pagination.Create();
    Pagination.Start();
  }
};
document.querySelector(".modal-background").onclick = toggleRecipeDetails;
document.querySelector(".modal-close").onclick = toggleRecipeDetails;

window.onload = getAllFavorite;
