const images = [
  "https://picsum.photos/id/10/2500/1667",
  "https://picsum.photos/id/11/2500/1667",
  "https://picsum.photos/id/12/2500/1667",
  "https://picsum.photos/id/13/2500/1667",
  "https://picsum.photos/id/10/2500/1667",
  "https://picsum.photos/id/11/2500/1667",
  "https://picsum.photos/id/12/2500/1667",
  "https://picsum.photos/id/13/2500/1667",
];

class Slider {
    constructor(items) {
        this.slides = items;

        this.INTERVAL_TIME = 3000;
        this.autoSlideTimer = null;

        this.currentIndex = 0;
        this.imageBox = document.querySelector("#slide");
        this.dotsBox = document.querySelector("#dots");
        this.prevBtn = document.querySelector("#prev-btn");
        this.nextBtn = document.querySelector("#next-btn");
        this.repeatBtn = document.querySelector("#repeat-btn");

        this.prevBtn.addEventListener("click", () => this.prevSlide());
        this.nextBtn.addEventListener("click", () => this.nextSlide());
        this.repeatBtn.addEventListener("click", () => this.changeRepeat());
        document.addEventListener("keydown", (event) => {
            if (event.key == "ArrowLeft") {
                this.prevSlide();
            }
            else if (event.key == "ArrowRight") {
                this.nextSlide();
            }
        });
        this.imageBox.addEventListener("mouseenter", () => {
            this.isPauseByHover = true;
            this.stopAutoSlide();
        })
        this.imageBox.addEventListener("mouseleave", () => {
            this.isPauseByHover = false;

            if (this.repeatBtn.textContent !== "Start Repeat") {
                this.startAutoSlide();
            }
        });


        this.createDots();
        this.showSlide();

        this.startAutoSlide();
    }

    showSlide() {
        this.imageBox.setAttribute("src", this.slides[this.currentIndex]);
        this.updateDots();
    }

    nextSlide() {
        if (this.currentIndex < this.slides.length - 1) {
            this.currentIndex = this.currentIndex + 1;
            this.imageBox.setAttribute("src", this.slides[this.currentIndex]);
            this.updateDots();
            this.resetAutoSlide();
        }
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex = this.currentIndex - 1;
            this.imageBox.setAttribute("src", this.slides[this.currentIndex]);
            this.updateDots();
            this.resetAutoSlide();
        }
    }

    createDots() {
        for (let i = 0; i < this.slides.length; i++) {
            const dot = document.createElement("li");
            dot.classList.add("dot-item");
            dot.addEventListener("click", () => {
                this.currentIndex = i;
                this.imageBox.setAttribute("src", this.slides[this.currentIndex]);
                this.updateDots();
                this.resetAutoSlide();
            });

            dot.innerHTML = `<span class="dot"></span>`;
            this.dotsBox.append(dot);
        }
    }

    updateDots() {
        const dots = document.querySelectorAll(".dot-item");
        if (dots.length < 1) return;

        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }

        dots[this.currentIndex].classList.add("active");
    }

    repeatSlide() {
        this.currentIndex++;

        if (this.currentIndex === this.slides.length) {
            this.currentIndex = 0;
        }

        this.imageBox.setAttribute("src", this.slides[this.currentIndex]);
        this.updateDots();
    }

    startAutoSlide() {
        this.autoSlideTimer = setInterval(this.repeatSlide.bind(this), this.INTERVAL_TIME);
    }

    resetAutoSlide() {
        clearInterval(this.autoSlideTimer);
        this.startAutoSlide();
    }

    stopAutoSlide() {
        clearInterval(this.autoSlideTimer);
        this.autoSlideTimer = null;
    }

    changeRepeat() {
        if (this.autoSlideTimer) {
            this.stopAutoSlide();
            this.repeatBtn.textContent = "Start Repeat";
        }
        else {
            this.startAutoSlide();
            this.repeatBtn.textContent = "Stop Repeat";
        }
    }
}

const slider1 = new Slider(images);