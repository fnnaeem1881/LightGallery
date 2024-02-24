const slide_images = document.querySelectorAll('.slide_image img');
const modal = document.querySelector('.modal');
const modalslide_image = document.querySelector('.modal-slide_image');
const slide_imageList = document.querySelector('.slide_image-list');
const closeBtn = document.querySelector('.close');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const autoplayButton = document.getElementById('autoplayButton');
let currentIndex = 0;
let autoplayInterval;
let autoplayEnabled = false;
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;

slide_images.forEach((img, index) => {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalslide_image.src = img.src;
        modalslide_image.alt = img.alt;
        currentIndex = index;
        updateslide_imageList();
    });
});

function updateslide_imageList() {
    slide_imageList.innerHTML = '';
    slide_images.forEach((img, idx) => {
        const listItem = document.createElement('div');
        listItem.classList.add('slide_image');
        const isActive = idx === currentIndex;
        if (isActive) {
            listItem.classList.add('active');
        }
     
        listItem.innerHTML = `<img src="${img.src}" alt="${img.alt}" onclick="showslide_image(${idx})">`;
        slide_imageList.appendChild(listItem);
    });
}
function showslide_image(index) {
    currentIndex = index;
    modalslide_image.src = slide_images[currentIndex].src;
    modalslide_image.alt = slide_images[currentIndex].alt;

    slide_imageList.querySelectorAll('.slide_image').forEach(item => {
        item.classList.remove('active');
    });

    slide_imageList.querySelector(`.slide_image:nth-child(${currentIndex + 1})`).classList.add('active');
}


closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    clearInterval(autoplayInterval);
    autoplayEnabled = false;
    autoplayButton.textContent = 'Autoplay';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        clearInterval(autoplayInterval);
        autoplayEnabled = false;
        autoplayButton.textContent = 'Autoplay';
    }
});

leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slide_images.length) % slide_images.length; // Decrement currentIndex and loop back to the last image if it goes below 0
    modalslide_image.src = slide_images[currentIndex].src;
    modalslide_image.alt = slide_images[currentIndex].alt;
    slide_imageList.querySelectorAll('.slide_image').forEach(item => {
        item.classList.remove('active');
    });

    slide_imageList.querySelector(`.slide_image:nth-child(${currentIndex + 1})`).classList.add('active');
    slide_imageList.querySelectorAll('.slide_image').forEach(item => {
        item.classList.remove('active');
    });

    slide_imageList.querySelector(`.slide_image:nth-child(${currentIndex + 1})`).classList.add('active');
});


rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slide_images.length; // Increment currentIndex and loop back to 0 if it exceeds the length
    modalslide_image.src = slide_images[currentIndex].src;
    modalslide_image.alt = slide_images[currentIndex].alt;
    slide_imageList.querySelectorAll('.slide_image').forEach(item => {
        item.classList.remove('active');
    });

    slide_imageList.querySelector(`.slide_image:nth-child(${currentIndex + 1})`).classList.add('active');
});

// leftArrow.addEventListener('click', () => {
//     if (currentIndex > 0) {
//         currentIndex--;
//         modalslide_image.src = slide_images[currentIndex].src;
//         modalslide_image.alt = slide_images[currentIndex].alt;
//         slide_imageList.querySelectorAll('.slide_image').forEach(item => {
//             item.classList.remove('active');
//         });
    
//         slide_imageList.querySelector(`.slide_image:nth-child(${currentIndex + 1})`).classList.add('active');
//     }
// });


// rightArrow.addEventListener('click', () => {
//     if (currentIndex < slide_images.length - 1) {
//         currentIndex++;
//         modalslide_image.src = slide_images[currentIndex].src;
//         modalslide_image.alt = slide_images[currentIndex].alt;
//         slide_imageList.querySelectorAll('.slide_image').forEach(item => {
//             item.classList.remove('active');
//         });
    
//         slide_imageList.querySelector(`.slide_image:nth-child(${currentIndex + 1})`).classList.add('active');
//     }

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        leftArrow.click();
    } else if (e.key === 'ArrowRight') {
        rightArrow.click();
    }
});

// Autoplay Functionality
autoplayButton.addEventListener('click', () => {
    if (autoplayEnabled) {
        clearInterval(autoplayInterval);
        autoplayEnabled = false;
        autoplayButton.textContent = 'Autoplay';
    } else {
        autoplayInterval = setInterval(() => {
            rightArrow.click();
        }, 3000); // Change the interval as needed
        autoplayEnabled = true;
        autoplayButton.textContent = 'Stop Autoplay';
    }
});

// Drag Slide Functionality
slide_images.forEach((slide_image, index) => {
    slide_image.addEventListener('mousedown', (e) => {
        isDragging = true;
        startPosition = e.clientX;
        currentIndex = index;
    });

    slide_image.addEventListener('mouseup', () => {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -100 && currentIndex < slide_images.length - 1) {
            currentIndex++;
        }
        if (movedBy > 100 && currentIndex > 0) {
            currentIndex--;
        }
        setPositionByIndex();
    });

    slide_image.addEventListener('mouseleave', () => {
        isDragging = false;
        setPositionByIndex();
    });

    slide_image.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const currentPosition = e.clientX;
            currentTranslate = prevTranslate + currentPosition - startPosition;
            updateSlideImagePosition();
        }
    });
});


function setPositionByIndex() {
    currentTranslate = currentIndex * -slide_images[0].offsetWidth;
    prevTranslate = currentTranslate;
    updateSlideImagePosition();
}
function updateSlideImagePosition() {
    // slide_imageList.style.transform = `translateX(${currentTranslate}px)`;
}