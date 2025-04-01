import './index.css';
import './questionnaire/script.js';
import './results/script.js';
import './board/applicants.css';
import {startAnimation} from './board/applicants'
import './success/script.js';



document.addEventListener("DOMContentLoaded", () => {
  const popupCount = 6;
  const popups = [];


  const sloganObjects  = [
    { 
      text: "Купите наши тапочки, которые знают секреты Вселенной!", 
      image: "./images/тапки.png" 
    },
    { 
      text: "С нашими пылесосами даже мухи станут вашими друзьями!", 
      image: "./images/пылесос.png" 
    },
    { 
      text: "Единственный продукт, проникающий в суставы и восстанавливающий хрящи на 100%!", 
      image: "./images/Капуста-локоть.png" 
    },
    { 
      text: "Студенты становятся МИЛЛИОНЕРАМИ. Вот один из них!", 
      image: "./images/студент.png" 
    },
    { 
      text: "Попробуй новый 'Марк Цукерберг' на вынос и с хрустящей корочкой!", 
      image: "./images/марк.jpg" 
    },
    { 
      text: "Трамп был зол и взбешен после этих слов Путина о Зеленском?", 
      image: "./images/Трамп.png" 
    }
  ];

 function getRandomSloganObject() {
  const randomIndex = Math.floor(Math.random() * sloganObjects.length);
  return sloganObjects[randomIndex];
}

function createPopup(index) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.id = "popup-" + index;
  
  const closeBtn = document.createElement("div");
  closeBtn.className = "popup-close";
  closeBtn.innerText = "×";
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    popup.classList.remove("active");
    setTimeout(checkAndToggleBlocker, 300);
  });
  popup.appendChild(closeBtn);
  
  const title = document.createElement("div");
  title.className = "popup-title";
  title.innerText = "Попап " + index;
  popup.appendChild(title);
  
  const sloganObj = getRandomSloganObject();

  const text = document.createElement("div");
  text.className = "popup-text";
  text.innerText = sloganObj.text;
  popup.appendChild(text);

  if (sloganObj.image) {
    const img = document.createElement("img");
    img.className = "popup-image";
    img.src = sloganObj.image;
    img.alt = "Слоган изображение";
    popup.appendChild(img);
  }

  const popupWidth = 300;
  const popupHeight = 200; 
  const maxX = window.innerWidth - popupWidth;
  const maxY = window.innerHeight - popupHeight;
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;
  popup.style.left = randomX + "px";
  popup.style.top = randomY + "px";
  
  document.body.appendChild(popup);
  return popup;
}

function checkAndToggleBlocker() {
  const activePopups = document.querySelectorAll(".popup.active");
  const blocker = document.getElementById("popup-blocker");
  if (activePopups.length === 0) {
    blocker.style.display = "none";
  } else {
    blocker.style.display = "block";
  }
}

for (let i = 1; i <= popupCount; i++) {
  popups.push(createPopup(i));
}

popups.forEach(popup => {
  const delay = Math.random() * 2000 + 500;
  setTimeout(() => {
    popup.classList.add("active");
    document.getElementById("popup-blocker").style.display = "block";
  }, delay);
});

const blocker = document.getElementById("popup-blocker");
blocker.addEventListener("click", (e) => {
  e.stopPropagation();
});
});