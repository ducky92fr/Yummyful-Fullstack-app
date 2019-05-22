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