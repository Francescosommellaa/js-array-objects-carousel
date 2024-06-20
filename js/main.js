// JavaScript - app.js
// Array di oggetti contenenti le informazioni delle immagini
const images = [ 
  { 
    image: 'img/01.webp', 
    title: 'Marvel\'s Spiderman Miles Morale', 
    text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.'
  },
  { 
    image: 'img/02.webp', 
    title: 'Ratchet & Clank: Rift Apart', 
    text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.'
  },
  { image: 'img/03.webp', 
    title: 'Fortnite', 
    text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos." 
  },
  { 
    image: 'img/04.webp', 
    title: 'Stray', 
    text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city'
  },
  { 
    image: 'img/05.webp', 
    title: "Marvel's Avengers", 
    text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.'
  }
];

// Indice dell'immagine corrente
let currentIndex = 0;

// Seleziona gli elementi del DOM
const carousel = document.querySelector('.carousel');
const title = document.querySelector('.title');
const description = document.querySelector('.description');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');

// Funzione per aggiornare il carosello
function updateCarousel() {
  // Estrae le informazioni dell'immagine corrente
  const { image, title: imageTitle, text } = images[currentIndex];

  // Aggiorna l'immagine, il titolo e la descrizione del carosello
  carousel.style.backgroundImage = `url(${image})`;
  title.textContent = imageTitle;
  description.textContent = text;
}

// Funzione per passare all'immagine successiva
function nextImage() {
  // Aggiorna l'indice dell'immagine corrente e chiama updateCarousel
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
}

// Funzione per passare all'immagine precedente
function previousImage() {
  // Aggiorna l'indice dell'immagine corrente e chiama updateCarousel
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
}

// Aggiunge gli event listener alle frecce
leftArrow.addEventListener('click', previousImage);
rightArrow.addEventListener('click', nextImage);

// Crea le miniature
const thumbnails = document.querySelector('.thumbnails');
images.forEach((img, index) => {
  const thumbnail = document.createElement('img');
  thumbnail.src = img.image;
  thumbnail.addEventListener('click', () => {
    // Aggiorna l'indice dell'immagine corrente al click sulla miniatura
    currentIndex = index;
    updateCarousel();
  });
  thumbnails.appendChild(thumbnail);
});

// Variabile per l'autoplay
let autoplay = null;

// Funzione per avviare l'autoplay
function startAutoplay() {
  autoplay = setInterval(nextImage, 3000);
}

// Funzione per fermare l'autoplay
function stopAutoplay() {
  clearInterval(autoplay);
  autoplay = null;
}

// Seleziona i bottoni
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const reverseButton = document.querySelector('.reverse');

// Aggiunge gli event listener ai bottoni
startButton.addEventListener('click', startAutoplay);
stopButton.addEventListener('click', stopAutoplay);
reverseButton.addEventListener('click', () => {
  // Inverte la direzione dell'autoplay
  const wasPlaying = autoplay;
  if (wasPlaying) {
    stopAutoplay();
  }
  [nextImage, previousImage] = [previousImage, nextImage];
  if (wasPlaying) {
    startAutoplay();
  }
});

// Inizializza il carosello
updateCarousel();