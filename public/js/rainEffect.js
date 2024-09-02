const rainCard = document.querySelector('.rain-card');

rainCard.addEventListener('mouseenter', startRain);
rainCard.addEventListener('mouseleave', stopRain);

function startRain() {
  // Clear any existing rain interval to prevent duplicates
  stopRain();

  function createRaindrop() {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    raindrop.style.left = `${Math.random() * 100}%`;
    rainCard.appendChild(raindrop);

    // Remove raindrop after animation completes
    raindrop.addEventListener('animationend', () => {
      raindrop.remove();
    });
  }

  function randomRain() {
    createRaindrop();
    
    // Schedule the next raindrop at a random interval (between 100ms and 500ms)
    const nextDrop = Math.random() * 400 + 100;
    rainCard.rainTimeout = setTimeout(randomRain, nextDrop);
  }

  randomRain(); // Start the rain effect
}

function stopRain() {
  clearTimeout(rainCard.rainTimeout); // Stop the rain effect
}
