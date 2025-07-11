import resetCss from "./styles/reset.css";
import css from "./styles/style.css";
// Import Images
import godofwar from "./assets/images/godofwar.jpg";
import alanwake from "./assets/images/alanwake.jpg";
import pop from "./assets/images/pop.jpg";
import rdr from "./assets/images/rdr2.jpg";
import tlo from "./assets/images/tlo2.jpg";
// Slide Creator Class
class Slide {
  constructor(title, description, imageSrc) {
    this.title = title;
    this.description = description;
    this.imageSrc = imageSrc;
  }
  setNewTitle(text) {
    this.title = text;
  }
  setNewDesc(para) {
    this.description = para;
  }
  setNewImage(src) {
    this.imageSrc = src;
  }
}

// My Slides stored here
let mySlides = [];

// Global Main Function
(() => {
  const imageWrapper = document.getElementById("homeImageSlider");
  const slides = imageWrapper.querySelectorAll(".slide");
  const totalSlides = slides.length;
  const slideWidth = (() => {
    if (screen.width > 400) {
      return 1000;
    } else {
      return screen.width;
    }
  })();
  let currentSlide = 2;
  slidesBuilder();
  setImageOnDom();
  changeBackground();
  toggleNavbar();
  // Slide Move by Click
  (function () {
    function moveSlide(direction) {
      // Check if we are on first or last Slide
      currentSlide += direction;
      if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
      } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
      }
      const offset = (2 - currentSlide) * slideWidth; // 2 is our Main Slide on page oppening, so it should be 0px in transform, so we calculate each slide based on that middle slide which is 2
      imageWrapper.style.transform = `translateX(${offset}px)`;
      removeActiveClass();
      slides[currentSlide].classList.add("active-slide");
      changeBackground();
      // Change Title/description base on active slide
      (() => {
        const title = document.querySelector(".game-name");
        const description = document.querySelector(".game-description");
        title.style.opacity = "0";
        description.style.opacity = "0";
        title.textContent = mySlides[currentSlide].title;
        description.textContent = mySlides[currentSlide].description;
        setTimeout(() => {
          title.style.opacity = "1";
          description.style.opacity = "1";
        }, 400);
      })();
    }
    document.addEventListener("click", (e) => {
      if (e.target.closest(".left-slide-button")) {
        moveSlide(-1);
      }
      if (e.target.closest(".right-slide-button")) {
        moveSlide(1);
      }
    });
    setInterval(() => {
      moveSlide(1);
    }, 5000);
  })();
})();

// Generate 5 Slides (for now uses default image and slides)
function slidesBuilder() {
  for (let i = 1; i <= 5; i++) {
    const slide = new Slide();
    mySlides.push(slide);
  }
  defaultSlidesCreator();
}

// Default Slides from local Host Details Creator (title, desc,src image)
function defaultSlidesCreator() {
  // God of War Ragnarok
  mySlides[0].setNewTitle("GOD OF WAR : RAGNAROK");
  mySlides[0].setNewDesc(
    "God of War Ragnarök is a 2022 action-adventure game developed by Santa Monica Studio and published by Sony Interactive Entertainment"
  );
  mySlides[0].setNewImage(godofwar);
  // The Last of us 2
  mySlides[1].setNewTitle("The Last of Us : Part 2");
  mySlides[1].setNewDesc(
    "The Last of Us Part II is a 2020 action-adventure game developed by Naughty Dog and published by Sony Interactive Entertainment."
  );
  mySlides[1].setNewImage(tlo);
  // Prince of Persia
  mySlides[2].setNewTitle("Prince of Persia: The Forgotten Sands");
  mySlides[2].setNewDesc(
    "Prince of Persia: The Forgotten Sands refers to a group of 2010 action-adventure games developed and published by Ubisoft."
  );
  mySlides[2].setNewImage(pop);
  // RDR2
  mySlides[3].setNewTitle("Red Dead Redemption 2");
  mySlides[3].setNewDesc(
    "Red Dead Redemption 2 is a 2018 action-adventure game developed and published by Rockstar Games."
  );
  mySlides[3].setNewImage(rdr);
  // Alan Wake 2
  mySlides[4].setNewTitle("Alan Wake 2");
  mySlides[4].setNewDesc(
    "Alan Wake 2 is a 2023 survival horror video game developed by Remedy Entertainment and published by Epic Games Publishing."
  );
  mySlides[4].setNewImage(alanwake);
}

function setImageOnDom() {
  for (let i = 1; i <= 5; i++) {
    const slide = document.querySelector(`#homeImageSlider .slide-${i}`);
    const img = slide.querySelector("img");
    img.setAttribute("src", `${mySlides[i - 1].imageSrc}`);
  }
}

function removeActiveClass() {
  document.querySelectorAll(".slide").forEach((slide) => {
    slide.classList.remove("active-slide");
  });
}

function changeBackground() {
  const slides = document.querySelectorAll(".slide");
  if (screen.width > 400) {
    slides.forEach((slide, index) => {
      if (slide.classList.contains("active-slide")) {
        const container = document.getElementById("container");
        container.style.background = `url("${mySlides[index].imageSrc}")`;
        container.style.backgroundSize = "cover";
      }
    });
  }
}

function toggleNavbar() {
  const btn = document.querySelector(".show-navbar");
  const navbar = document.querySelector(".navbar");
  document.addEventListener("click", (e) => {
    if (btn.contains(e.target)) {
      navbar.classList.add("active");
    } else if (
      !navbar.contains(e.target) &&
      navbar.classList.contains("active")
    ) {
      navbar.classList.remove("active");
    }
  });
}
