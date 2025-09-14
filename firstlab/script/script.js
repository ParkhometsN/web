const slider = document.querySelector('.slider');
const sliderTrack = document.querySelector('.slider-track');
const slideWidth = slider.clientWidth; // Ширина одного слайда (предполагаем, что все слайды одинаковые)

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

slider.addEventListener('mousedown', startDragging);
slider.addEventListener('mouseup', stopDragging);
slider.addEventListener('mouseleave', stopDragging);
slider.addEventListener('mousemove', drag);

slider.addEventListener('touchstart', startDragging);
slider.addEventListener('touchend', stopDragging);
slider.addEventListener('touchmove', drag);

function startDragging(e) {
    isDragging = true;
    startPos = getPositionX(e);
    currentTranslate = prevTranslate; // Сбрасываем на предыдущую позицию
    animationID = requestAnimationFrame(animation);
    sliderTrack.style.transition = 'none'; // Отключаем плавность во время драга
    slider.classList.add('grabbing');
}

function stopDragging() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    
    // Округляем к ближайшему слайду
    const slideIndex = Math.round(-currentTranslate / slideWidth);
    prevTranslate = -slideIndex * slideWidth;
    currentTranslate = prevTranslate;
    
    // Ограничиваем по краям (не уходим за первый/последний слайд)
    const maxIndex = (sliderTrack.children.length - 1);
    const clampedIndex = Math.max(0, Math.min(slideIndex, maxIndex));
    prevTranslate = -clampedIndex * slideWidth;
    
    setSliderPosition();
    sliderTrack.style.transition = 'transform 0.3s ease'; // Включаем плавность обратно
    slider.classList.remove('grabbing');
}

function drag(e) {
    if (isDragging) {
        const currentPosition = getPositionX(e);
        currentTranslate = prevTranslate + currentPosition - startPos;
        setSliderPosition(); // Обновляем позицию во время драга
    }
}

function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

function animation() {
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    // Ограничиваем во время драга (опционально, для предотвращения выхода за края)
    const maxTranslate = 0;
    const minTranslate = -(sliderTrack.scrollWidth - slideWidth);
    currentTranslate = Math.max(minTranslate, Math.min(maxTranslate, currentTranslate));
    sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
}