// 0. Preloader
window.addEventListener("load", function() {
    var preloader = document.getElementById('preloader');
    preloader.style.display = 'none'; // Hide preloader
});
  
// 1. Hamburger menu
const nav = document.querySelector(".nav"),
navOpenBtn = document.querySelector(".navOpenBtn"),
navCloseBtn = document.querySelector(".navCloseBtn");
  
navOpenBtn.addEventListener("click", () => {
    nav.classList.add("openNav");
    nav.classList.remove("openSearch");
    searchIcon.classList.replace("uil-times", "uil-search");
});
navCloseBtn.addEventListener("click", () => {
    nav.classList.remove("openNav");
});

// 2. NavBar Drop down
document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector(".dropdown");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const dropdownLink = dropdown.querySelector("a");
  
    // Toggle dropdown visibility on click
    dropdownLink.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default link behavior
        dropdownMenu.classList.toggle("show");
    });
  
    // Close dropdown if clicking outside
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            dropdownMenu.classList.remove("show");
        }
    });
  });