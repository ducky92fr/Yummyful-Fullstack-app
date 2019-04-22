document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});






function toggleLikeBtn(){
  const checkBtn = document.querySelector('.recipe__love use').getAttribute("href")
  const iconString = checkBtn.includes("outlined") ? 'icon-heart' : 'icon-heart-outlined';
  document.querySelector('.recipe__love use').setAttribute('href', `../icons.svg#${iconString}`);
  // icons.svg#icon-heart-outlined
};


const btnLike = document.querySelectorAll(".recipe__love")
for(let i = 0; i< btnLike.length;i++){
  btnLike[i].onclick = toggleLikeBtn
}