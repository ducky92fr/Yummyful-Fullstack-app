document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

//Button Like
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

const btnLike = document.querySelectorAll(".recipe__love");
for (let i = 0; i < btnLike.length; i++) {
  btnLike[i].onclick = toggleLikeBtn;
}

//Login Modal On/Off

function toggleLoginForm() {
  const formLogin = document.querySelector("#login-form");
  formLogin.classList.contains("is-active")
    ? formLogin.classList.remove("is-active")
    : formLogin.classList.add("is-active");
}

const btnLogin = document.querySelector(".login");
const btnCloseModalLogin = document.querySelector("#login-close");
const backgroundCloseModalLogin = document.querySelector("#login-background");
btnCloseModalLogin.onclick = btnLogin.onclick = backgroundCloseModalLogin.onclick = toggleLoginForm;
// for (let i = 0; i < btnLogin.length; i++) {
//   btnLogin[i].onclick = toggleLoginForm;
// }

//Signup Modal On/Off
function toggleSignupForm() {
  const formSignup = document.querySelector("#signup-form");
  formSignup.classList.contains("is-active")
    ? formSignup.classList.remove("is-active")
    : formSignup.classList.add("is-active");
}

const btnSignup = document.querySelector(".signup");
const btnCloseModalSignup = document.querySelector("#signup-close");
const backgroundCloseModalSignup = document.querySelector("#signup-background");
btnCloseModalSignup.onclick = btnSignup.onclick = backgroundCloseModalSignup.onclick = toggleSignupForm;
