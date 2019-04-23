const searchBtn = document.getElementById("btn-search");
const formSearch = document.getElementById("form-search");
const image = document.querySelectorAll(".image-grid");
const name = document.querySelectorAll(".recipe-name");
const type = document.querySelectorAll(".type-dish");
const url = "http://localhost:3000/api";

function searchRecipes(e) {
  e.preventDefault();
  const searchInput = document.getElementById("input-search").value;
  console.log(searchInput);
  axios
    .get(`${url}/search?q=${searchInput}`)
    .then(result => {
      console.log(result);
      // result nous donne une nodelist. Pour chaque élément de la nodelist, il y a une data avec l'objet Recipe dedans et ses éléments. Donc pour simplifier, on crée une var "arrayData" qui sera un array d'objets Recipe
      const arrayData = result.data;
      console.log(arrayData);
      console.log(image);
      console.log(name);
      console.log(type);
      for (let i = 0; i < arrayData.length; i++) {
        image[i].src = arrayData[i].imageURL;
        name[i].innerText = arrayData[i].title;
        type[i].innerText = arrayData[i].type;
      }
    })
    .catch(error => console.log("error"));
}
searchBtn.onclick = formSearch.onsubmit = searchRecipes;
