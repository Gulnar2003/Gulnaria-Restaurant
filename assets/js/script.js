// Faylin yuklenmesi bitenden sonra animasiya bitecek
const preloader = document.querySelector("[data-preaload]");
window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);
let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

//Slider hissəsində mouse ilə gəldikdə dayanma:

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

//Sehife yuklenende slide avtomatik isleyir

window.addEventListener("load", autoSlide);
const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});



document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.reservation-form form');

  form.addEventListener('submit', function (event) {
    const inputs = form.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], select');
    let allFieldsFilled = true;

    inputs.forEach(function (input) {
      if (!input.value.trim()) {
        allFieldsFilled = false;
      }
    });

    if (!allFieldsFilled) {
      event.preventDefault();
      alert('Zəhmət olmasa, bütün sahələri doldurun.');
    } else {
      event.preventDefault();
      showConfirmationMessage();
    }
  });

  function showConfirmationMessage() {
    const confirmationMessageContainer = document.createElement('div');
    const confirmationMessage = document.createElement('p');

    confirmationMessage.textContent = 'Rezervasiya uğurla göndərildi';
    confirmationMessageContainer.classList.add('confirmation-message-container');
    confirmationMessage.classList.add('confirmation-message');

    confirmationMessageContainer.appendChild(confirmationMessage);
    document.body.appendChild(confirmationMessageContainer);

    setTimeout(function () {
      confirmationMessageContainer.classList.add('show');
      setTimeout(function () {
        confirmationMessageContainer.classList.remove('show');
        setTimeout(function () {
          confirmationMessageContainer.remove();
          location.reload();
        }, 300);
      }, 3000);
    }, 100);
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const nameInput = document.querySelector('input[name="name"]');

  nameInput.addEventListener('input', function (event) {
    const trueName = /[^a-zA-ZğüşıöçƏĞÜŞIÖÇ\s]/g;
    if (nameInput.value.match(trueName)) {
      nameInput.value = nameInput.value.replace(trueName, '');
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const phoneInput = document.querySelector('input[name="phone"]');

  phoneInput.addEventListener('input', function (event) {
    const truePhone = /[^0-9+\-]/g;
    if (phoneInput.value.match(truePhone)) {
      phoneInput.value = phoneInput.value.replace(truePhone, '');
    }
  });
  phoneInput.addEventListener('keydown', function (event) {
    const key = event.key;
    if (!/[0-9+\-]/.test(key) && event.code !== 'Backspace') {
      event.preventDefault();
    }
  });
});




document.getElementById("subscribeForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var emailInput = document.getElementById("emailInput").value;
  var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailInput.trim() === '' || !emailFormat.test(emailInput)) {
    document.getElementById("successMessage").style.display = "none";
  } else {
    document.getElementById("successMessage").style.display = "block";
  }
});



const subscribeForm = document.getElementById('subscribeForm');
const emailInput = document.getElementById('emailInput');
const successMessage = document.getElementById('successMessage');
const failMessage = document.getElementById('failMessage');
const subscribeBtn = document.getElementById('subscribeBtn');


function subscribe() {
  if (emailInput.value === '') {
    alert('E-mail boş ola bilməz!');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(emailInput.value)) {
    successMessage.style.display = 'block';
    failMessage.style.display = 'none';
  } else {
    successMessage.style.display = 'none';
    failMessage.style.display = 'block';
  }
}
subscribeBtn.addEventListener('click', subscribe);




const searchInput = document.querySelector('#search-input');
const menuItems = document.querySelectorAll('.menu-card');


function searchMenuItems() {
  const searchText = searchInput.value.toLowerCase();

  menuItems.forEach(item => {
    const itemName = item.querySelector('.card-title').innerText.toLowerCase();

    if (itemName.includes(searchText)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

searchInput.addEventListener('input', () => {
  searchMenuItems();
});

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Backspace' || event.key === 'Delete') {
    if (searchInput.value === '') {
      location.reload();
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-button");
  const menuItems = document.querySelectorAll(".grid-list li");

  filterButtons.forEach(button => {
    button.addEventListener("click", function () {
      const filter = button.getAttribute("data-filter");

      menuItems.forEach(item => {
        const itemFilter = item.getAttribute("data-filter");

        if (filter === "all") {
          item.style.display = "block";
        } else {
          if (itemFilter === filter) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        }
      });
    });
  });
});




