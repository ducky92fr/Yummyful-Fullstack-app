const formSearch = document.getElementById("form-search");
const searchInput = document.getElementById("input-search");
const wrap = document.getElementById("wrap");
const titleSearch = document.getElementById("title-search");
const randomImgContainer = document.getElementById("random-img-container");
const paginationContainer = document.getElementById('pagination')
const url = document.getElementById("site_url").content;
const imageClicked = document.querySelectorAll(".image-grid");
const btnLike = document.querySelectorAll(".recipe__love");
 

  for (let i = 0; i < imageClicked.length; i++) {
    imageClicked[i].onclick = getAllRecipeDetails;
    btnLike[i].onclick = toggleLikeBtn;
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

document.querySelector(".modal-background").onclick = toggleRecipeDetails;
document.querySelector(".modal-close").onclick = toggleRecipeDetails;