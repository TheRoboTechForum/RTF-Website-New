const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
const introVideo = document.getElementById("intro-video");
const main = document.getElementById("main");

// Check if intro video has been played before
const hasPlayedIntro = sessionStorage.getItem('introPlayed');

function bodyDisplay() {
  document.body.overflow = "visible";
}

function showMainContent() {
  if (introVideo) {
    introVideo.style.opacity = "0";
    introVideo.style.display = "none"; // Hide the video completely
  }
  document.body.style.overflow = "scroll";
  if (main) {
    main.style.opacity = "1";
    main.style.pointerEvents = "all";
  }
}

// If intro has been played before, skip it
if (hasPlayedIntro === 'true') {
  showMainContent();
} else {
  // Play intro video only if it hasn't been played
  if (introVideo) {
    introVideo.addEventListener("ended", () => {
      showMainContent();
      // Mark intro as played in session storage
      sessionStorage.setItem('introPlayed', 'true');
    });
    
    // Optional: Allow users to skip the video by clicking
    introVideo.addEventListener("click", () => {
      showMainContent();
      sessionStorage.setItem('introPlayed', 'true');
    });
    
    // Fallback: Auto-skip after 10 seconds if video doesn't end
    setTimeout(() => {
      if (main && main.style.opacity !== "1") {
        showMainContent();
        sessionStorage.setItem('introPlayed', 'true');
      }
    }, 10000);
  } else {
    // If no intro video element found, show main content immediately
    showMainContent();
  }
}

bodyDisplay();

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
}

if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}




// Toggle flip effect on card hover
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('flipped');
  });
  
  card.addEventListener('mouseleave', () => {
    card.classList.remove('flipped');
  });
});

// album dropdown script
function toggleAlbum(element) {
  const content = element.nextElementSibling;
  const arrow = element.querySelector('.arrow');

  if (content) content.classList.toggle('expanded');
  if (arrow) arrow.classList.toggle('rotate');
}



if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
}

if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const exploreBtn = document.querySelector('.explore-btn');
  exploreBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Get all anchor tags with class "open-image"
// const openImageLinks = document.querySelectorAll('.open-image');

// // Add click event listener to each anchor tag
// openImageLinks.forEach((link) => {
//   link.addEventListener('click', function (event) {
//     // Prevent the default behavior of anchor tag
//     event.preventDefault();

//     // Open the link in a new tab
//     window.open(this.href, '_blank');
//   });
// });

// Toggle flip effect on cart click event
const cards = querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    // const card = button.closest('.card');
    card.classList.toggle('flipped');
  });
});

// Toggle flip effect on cart click event
document.querySelectorAll('.card').forEach((button) => {
  button.addEventListener('mouseleave', () => {
    const card = button.closest('.card');
    card.classList.toggle('flipped');
  });
});

// album dropdown script
function toggleAlbum(element) {
  const content = element.nextElementSibling;
  const arrow = element.querySelector('.arrow');

  content.classList.toggle('expanded');
  arrow.classList.toggle('rotate');
}

// our innovation script
document.querySelectorAll('.view-more').forEach((button) => {
  button.addEventListener('click', function () {
    const innovationId = this.getAttribute('data-id');
    const modal = document.getElementById('innovation-modal');
    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');

    // Dynamically update modal content based on innovation
    if (innovationId === '1') {
      title.textContent = 'Innovative Technology 1';
      description.textContent =
        'Detailed description of Innovation 1 goes here.';
    } else if (innovationId === '2') {
      title.textContent = 'Innovative Technology 2';
      description.textContent =
        'Detailed description of Innovation 2 goes here.';
    }

    // Show the modal
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
  });
});

// Close modal when close button is clicked
document.querySelector('.close-btn').addEventListener('click', function () {
  const modal = document.getElementById('innovation-modal');
  modal.style.opacity = '0';
  modal.style.pointerEvents = 'none';
});

// dark mode script button

const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  toggleButton.textContent = body.classList.contains('dark-mode')
    ? 'Light Mode'
    : 'Dark Mode';
});
