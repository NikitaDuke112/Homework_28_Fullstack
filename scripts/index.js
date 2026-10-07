const slides = [
    "https://picsum.photos/id/1/500/600",
    "https://picsum.photos/id/2/500/600",
    "https://picsum.photos/id/3/500/600",
    "https://picsum.photos/id/4/500/600",
    "https://picsum.photos/id/5/500/600",
    "https://picsum.photos/id/6/500/600"
];

const slider = document.querySelector("#slider");
const btnPrev = document.querySelector("#button-prev");
const btnNext = document.querySelector("#button-next");
const btnRepeat = document.querySelector("#button-repeat");
const dots = document.querySelector("#dots");

const INTERVAL_TIME = 3000;
let autoSlideTimer;

let currentSlideIndex = 0;

slider.setAttribute("src", slides[currentSlideIndex]);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        handleButtonPrevClick();
    }
    else if (event.key === "ArrowRight") {
        handleButtonNextClick();
    }
});
btnPrev.addEventListener("click", handleButtonPrevClick);
btnNext.addEventListener("click", handleButtonNextClick);
btnRepeat.addEventListener("click", handleButtonRepeatClick);

const createDots = () => {
    dots.innerHTML = "";

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.id = i;

        if (i === currentSlideIndex) {
            dot.classList.add("active");
        }
        dot.innerHTML = `<span class="banner__dot"></span>`;

        dots.insertAdjacentElement("beforeend", dot);
    }
};

createDots();

dots.addEventListener("click", (event) => {
    const li = event.target.closest("li");

    if (!li) return;


    currentSlideIndex = Number(li.id);
    slider.setAttribute("src", slides[currentSlideIndex]);
    updateDots();
    resetAutoSlide();
});

function repeatSlide() {
    currentSlideIndex++;
    if (currentSlideIndex === slides.length) {
        currentSlideIndex = 0;
    }

    slider.setAttribute("src", slides[currentSlideIndex]);
    updateDots();
}

function startAutoSlide() {
    autoSlideTimer = setInterval(repeatSlide, INTERVAL_TIME);
}

function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
}

function stopAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
}

startAutoSlide();

function handleButtonPrevClick() {
    if (currentSlideIndex != 0) {
        currentSlideIndex--;
        slider.setAttribute("src", slides[currentSlideIndex]);

        updateDots();
    }

    resetAutoSlide();
}

function handleButtonNextClick() {
    if (currentSlideIndex != slides.length - 1) {
        currentSlideIndex++;
        slider.setAttribute("src", slides[currentSlideIndex]);

        updateDots();
    }
    
    resetAutoSlide();
}

function handleButtonRepeatClick() {
    if (autoSlideTimer) {
        stopAutoSlide();
        btnRepeat.textContent = "Start Repeat";
    }
    else {
        startAutoSlide();
        btnRepeat.textContent = "Stop Repeat";
    }
}

function updateDots() {
    for (let i = 0; i < slides.length; i++) {
        const dot = document.getElementById(i);
        dot.classList.remove("active");

        if (i === currentSlideIndex) {
            dot.classList.add("active");
        }
    }
}