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

// 2. Impact Stats
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".impact-stats .stat h2");
  const duration = 5000;

  counters.forEach((counter, index) => {
    const text = counter.textContent;
    const targetNumber = parseInt(text.replace(/[^\d]/g, ''));
    const isCurrency = text.includes("£");
    let start = 0;
    const increment = targetNumber / (duration / 16.66);

    const updateCounter = () => {
      start += increment;
      if (start >= targetNumber) {
        counter.textContent = formatNumber(targetNumber, isCurrency, index === 0);
      } else {
        counter.textContent = formatNumber(start, isCurrency, index === 0);
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  });

  function formatNumber(number, isCurrency, addK) {
    const formatted = Math.round(number).toLocaleString();
    if (isCurrency) {
      return addK ? `£ ${formatted}K` : `£ ${formatted}`;
    }
    return formatted;
  }
});




// 3. Slider for News Section
new Swiper('.card-wrapper', {
  loop: true,
  spaceBetween: 30,

  // Pagination bullets
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
  },

  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },

  // Responsive breakpoints
  breakpoints: {
      0: {
          slidesPerView: 1
      },
      768: {
          slidesPerView: 2
      },
      1024: {
          slidesPerView: 3
      }
  }
});

// 4. FAQ Section
let li = document.querySelectorAll(".faq-text li");
for (var i = 0; i < li.length; i++) {
  li[i].addEventListener("click", (e)=>{
    let clickedLi;
    if(e.target.classList.contains("question-arrow")){
      clickedLi = e.target.parentElement;
    }else{
      clickedLi = e.target.parentElement.parentElement;
    }
   clickedLi.classList.toggle("showAnswer");
  });
}


