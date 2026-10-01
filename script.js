// Principal Celebration Auto Rotating Slideshow
const celebrationImages = [
    'pripslt/1.jpeg',
    'pripslt/2.jpeg',
    'pripslt/3.jpeg',
    'pripslt/4.jpeg',
    'pripslt/5.jpeg',
    'pripslt/6.jpeg',
    'pripslt/7.jpeg',
    'pripslt/8.jpeg',
    'pripslt/9.jpeg',
    'pripslt/10.jpeg'
];

let currentSlideIndex = 0;
const sliderImg = document.getElementById('slider-image');
const dotsContainer = document.getElementById('slider-dots');

// Generate Navigation Dots dynamically
if (dotsContainer) {
    celebrationImages.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === 0 ? 'bg-marigold w-6' : 'bg-white/60'}`;
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
}

function updateSlider() {
    if (!sliderImg) return;
    
    // Smooth Fade Transition
    sliderImg.style.opacity = '0.3';
    setTimeout(() => {
        sliderImg.src = celebrationImages[currentSlideIndex];
        sliderImg.style.opacity = '1';
    }, 200);

    // Update Dots
    if (dotsContainer) {
        const dots = dotsContainer.children;
        Array.from(dots).forEach((dot, idx) => {
            if (idx === currentSlideIndex) {
                dot.className = 'w-6 h-2.5 rounded-full bg-marigold transition-all duration-300';
            } else {
                dot.className = 'w-2.5 h-2.5 rounded-full bg-white/60 transition-all duration-300';
            }
        });
    }
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % celebrationImages.length;
    updateSlider();
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + celebrationImages.length) % celebrationImages.length;
    updateSlider();
}

function goToSlide(index) {
    currentSlideIndex = index;
    updateSlider();
}

// Auto Rotate Every 3.5 Seconds
setInterval(nextSlide, 3500);
