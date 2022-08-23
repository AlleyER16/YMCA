const navbarBtn = document.querySelector(".navbar-btn");

navbarBtn.addEventListener("click", function () {
    document.querySelector(".header").classList.toggle("navbar-open");
});
