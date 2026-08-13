/* =====================================================
   ROMANTIC MEMORY GIFT
===================================================== */


/* =========================
   MEMORY DATA
========================= */

const memories = [

    {
        image: "images/1.jpeg",
        title: "Meri Jaan ❤️",
        text: "Tum meri life ka woh beautiful part ho jiske bina sab kuch thoda incomplete sa lagta hai."
    },

    {
        image: "images/2.jpeg",
        title: "My Favorite Person",
        text: "Duniya mein bahut log hain, lekin meri aankhein har baar tumhe hi dhoondti hain."
    },

    {
        image: "images/3.jpeg",
        title: "Ek Tum...",
        text: "Mujhe perfect life nahi chahiye, bas us life mein tum mere saath rehna."
    },

    {
        image: "images/4.jpeg",
        title: "Meri Khushi",
        text: "Tumhari ek smile meri poori duniya ka mood change kar sakti hai."
    },

    {
        image: "images/5.jpeg",
        title: "Our Little World",
        text: "Jab tum mere saath hoti ho na, tab duniya ki baaki saari cheezein thodi less important lagti hain."
    },

    {
        image: "images/6.jpeg",
        title: "Meri Madam Ji",
        text: "Tumse pyaar karna meri life ka sabse beautiful decision tha."
    },

    {
        image: "images/7.jpeg",
        title: "My Safe Place",
        text: "Tumhare paas rehkar mujhe lagta hai ki chahe duniya mein kuch bhi ho, sab theek ho jayega."
    },

    {
        image: "images/8.jpeg",
        title: "Forever Wala Pyaar",
        text: "Main har baar tumhe choose karunga... aaj bhi, kal bhi aur har baar."
    },

    {
        image: "images/9.jpeg",
        title: "Meri Bubuuu",
        text: "Tumhari cute si smile, tumhari baatein aur tumhara gussa... sab kuch mujhe tumse aur zyada pyaar karwata hai."
    },

    {
        image: "images/10.jpeg",
        title: "Always You ❤️",
        text: "Agar mujhe dobara apni story likhne ka chance mile, toh main har baar tumhe hi choose karunga."
    }

];


/* =========================
   ELEMENTS
========================= */

const intro = document.getElementById("intro");

const startBtn = document.getElementById("startBtn");

const mainContent = document.getElementById("mainContent");

const memoryWorld = document.getElementById("memoryWorld");

const bgMusic = document.getElementById("bgMusic");

const musicBtn = document.getElementById("musicBtn");

const showBtn = document.getElementById("showBtn");

const slideshow = document.getElementById("slideshow");

const closeSlide = document.getElementById("closeSlide");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const slideImage = document.getElementById("slideImage");

const slideTitle = document.getElementById("slideTitle");

const slideText = document.getElementById("slideText");

const slideNumber = document.getElementById("slideNumber");

const slideDots = document.getElementById("slideDots");

const progressBar = document.getElementById("progressBar");

const finalScreen = document.getElementById("finalScreen");

const replayBtn = document.getElementById("replayBtn");

const heartsContainer = document.querySelector(".hearts");


/* =========================
   STATE
========================= */

let currentSlide = 0;

let musicPlaying = false;

let slideshowTimer = null;

let progressTimer = null;

let touchStartX = 0;


/* =========================
   CREATE FLOATING HEARTS
========================= */

function createHeart() {

    const heart = document.createElement("span");

    heart.className = "floating-heart";

    heart.innerHTML =
        Math.random() > .5
            ? "♥"
            : "♡";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (10 + Math.random() * 15) + "px";

    const duration =
        8 + Math.random() * 8;

    heart.style.animationDuration =
        duration + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, duration * 1000);

}


/* Create hearts continuously */

setInterval(createHeart, 900);


/* =========================
   RANDOM NUMBER
========================= */

function random(min, max) {

    return Math.random() * (max - min) + min;

}


/* =========================
   CREATE CARDS
========================= */

function createCards() {

    memoryWorld.innerHTML = "";

    const isMobile = window.innerWidth <= 700;

    const cardWidth = isMobile ? 135 : 180;
    const cardHeight = isMobile ? 185 : 245;

    const worldWidth = memoryWorld.clientWidth;
    const worldHeight = memoryWorld.clientHeight;

    /*
        Desktop:
        5 columns × 2 rows

        Mobile:
        2 columns × 5 rows
    */

    const columns = isMobile ? 2 : 5;
    const rows = isMobile ? 5 : 2;

    const horizontalSpace =
        worldWidth / columns;

    const verticalSpace =
        worldHeight / rows;


    memories.forEach((memory, index) => {

        const card = document.createElement("div");

        card.className = "memory-card";


        /*
        =========================
        CALCULATE SAFE POSITION
        =========================
        */

        const column = index % columns;

        const row = Math.floor(index / columns);


        let left =
            column * horizontalSpace
            + (horizontalSpace - cardWidth) / 2;

        let top =
            row * verticalSpace
            + (verticalSpace - cardHeight) / 2;


        /*
        Small variation so cards
        don't look perfectly robotic.
        */

        const variationX =
            isMobile
                ? random(-5, 5)
                : random(-10, 10);

        const variationY =
            isMobile
                ? random(-5, 5)
                : random(-8, 8);


        left += variationX;
        top += variationY;


        /*
        Keep cards inside container
        */

        left = Math.max(
            5,
            Math.min(
                left,
                worldWidth - cardWidth - 5
            )
        );

        top = Math.max(
            5,
            Math.min(
                top,
                worldHeight - cardHeight - 5
            )
        );


        card.style.left = `${left}px`;
        card.style.top = `${top}px`;


        /*
        =========================
        GENTLE FLOATING
        =========================
        */

        card.style.setProperty(
            "--duration",
            random(6, 10) + "s"
        );

        card.style.setProperty(
            "--delay",
            random(-5, 0) + "s"
        );

        /*
        VERY SMALL MOVEMENT
        so cards don't intersect.
        */

        card.style.setProperty(
            "--moveX",
            random(-8, 8) + "px"
        );

        card.style.setProperty(
            "--moveY",
            random(-8, 8) + "px"
        );

        card.style.setProperty(
            "--rotation",
            random(-3, 3) + "deg"
        );


        /*
        =========================
        CARD HTML
        =========================
        */

        card.innerHTML = `

            <div class="card-inner">

                <div class="card-front">

                    <img
                        src="${memory.image}"
                        alt="Memory ${index + 1}"
                    >

                    <div class="card-number">
                        ${String(index + 1).padStart(2, "0")}
                    </div>

                </div>


                <div class="card-back">

                    <div class="card-back-content">

                        <div class="heart">
                            ♥
                        </div>

                        <h3>
                            ${memory.title}
                        </h3>

                        <p>
                            ${memory.text}
                        </p>

                    </div>

                </div>

            </div>
        `;


        /*
        =========================
        SINGLE CLICK
        =========================
        */

        card.addEventListener("click", () => {

            card.classList.toggle("flipped");

        });


        /*
        =========================
        DOUBLE CLICK
        =========================
        */

        card.addEventListener("dblclick", (event) => {

            event.preventDefault();

            openSlideshow(index);

        });


        memoryWorld.appendChild(card);

    });

}


/* =========================
   START EXPERIENCE
========================= */

startBtn.addEventListener("click", async () => {

    intro.classList.add("hidden");

    mainContent.classList.remove("hidden");

    createCards();

    /*
        Browser allows audio after
        user interaction.
    */

    try {

        await bgMusic.play();

        musicPlaying = true;

        musicBtn.classList.add("playing");

        musicBtn.innerHTML = "🔊";

    } catch (error) {

        console.log(
            "Music needs another user interaction."
        );

    }

});


/* =========================
   MUSIC CONTROL
========================= */

musicBtn.addEventListener("click", async () => {

    if (musicPlaying) {

        bgMusic.pause();

        musicPlaying = false;

        musicBtn.classList.remove("playing");

        musicBtn.innerHTML = "🎵";

    } else {

        try {

            await bgMusic.play();

            musicPlaying = true;

            musicBtn.classList.add("playing");

            musicBtn.innerHTML = "🔊";

        } catch (error) {

            console.log(
                "Could not play music."
            );

        }

    }

});


/* =========================
   CREATE DOTS
========================= */

function createDots() {

    slideDots.innerHTML = "";

    memories.forEach((_, index) => {

        const dot = document.createElement("span");

        dot.className = "dot";

        if (index === currentSlide) {

            dot.classList.add("active");

        }

        dot.addEventListener("click", () => {

            currentSlide = index;

            updateSlide();

        });

        slideDots.appendChild(dot);

    });

}


/* =========================
   OPEN SLIDESHOW
========================= */

async function openSlideshow(startIndex = 0) {

    currentSlide = startIndex;

    slideshow.classList.remove("hidden");

    finalScreen.classList.add("hidden");

    document.body.style.overflow = "hidden";

    createDots();

    updateSlide();

    /*
        Start music automatically.
    */

    try {

        await bgMusic.play();

        musicPlaying = true;

        musicBtn.classList.add("playing");

        musicBtn.innerHTML = "🔊";

    } catch (error) {

        console.log("Music blocked.");

    }

    startAutoPlay();

}


/* =========================
   UPDATE SLIDE
========================= */

function updateSlide() {

    const memory =
        memories[currentSlide];


    /*
        Fade effect
    */

    slideImage.style.opacity = "0";

    slideImage.style.transform =
        "scale(.96)";


    setTimeout(() => {

        slideImage.src =
            memory.image;

        slideTitle.textContent =
            memory.title;

        slideText.textContent =
            memory.text;

        slideNumber.textContent =
            `${String(currentSlide + 1).padStart(2, "0")} / ${String(memories.length).padStart(2, "0")}`;


        slideImage.style.opacity = "1";

        slideImage.style.transform =
            "scale(1)";


    }, 200);


    /*
        Dots
    */

    document
        .querySelectorAll(".dot")
        .forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        });


    /*
        Progress
    */

    progressBar.style.width =
        (
            ((currentSlide + 1) / memories.length)
            * 100
        ) + "%";

}


/* =========================
   NEXT SLIDE
========================= */

function nextSlide() {

    if (currentSlide < memories.length - 1) {

        currentSlide++;

        updateSlide();

        resetAutoPlay();

    } else {

        /*
            Story finished
        */

        stopAutoPlay();

        slideshow.classList.add("hidden");

        finalScreen.classList.remove("hidden");

    }

}


/* =========================
   PREVIOUS SLIDE
========================= */

function previousSlide() {

    if (currentSlide > 0) {

        currentSlide--;

    } else {

        currentSlide =
            memories.length - 1;

    }

    updateSlide();

    resetAutoPlay();

}


/* =========================
   BUTTON EVENTS
========================= */

nextBtn.addEventListener(
    "click",
    nextSlide
);

prevBtn.addEventListener(
    "click",
    previousSlide
);


/* =========================
   CLOSE SLIDESHOW
========================= */

closeSlide.addEventListener("click", () => {

    slideshow.classList.add("hidden");

    stopAutoPlay();

    document.body.style.overflow = "";

});


/* =========================
   PLAY OUR STORY
========================= */

showBtn.addEventListener("click", () => {

    openSlideshow(0);

});


/* =========================
   AUTO PLAY
========================= */

function startAutoPlay() {

    stopAutoPlay();

    slideshowTimer = setInterval(() => {

        if (
            currentSlide <
            memories.length - 1
        ) {

            currentSlide++;

            updateSlide();

        } else {

            stopAutoPlay();

            slideshow.classList.add("hidden");

            finalScreen.classList.remove("hidden");

        }

    }, 5000);

}


/* =========================
   RESET AUTOPLAY
========================= */

function resetAutoPlay() {

    startAutoPlay();

}


/* =========================
   STOP AUTOPLAY
========================= */

function stopAutoPlay() {

    clearInterval(slideshowTimer);

    clearInterval(progressTimer);

}


/* =========================
   REPLAY
========================= */

replayBtn.addEventListener("click", () => {

    finalScreen.classList.add("hidden");

    openSlideshow(0);

});


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            slideshow.classList.contains("hidden")
        ) {
            return;
        }


        if (event.key === "ArrowRight") {

            nextSlide();

        }


        if (event.key === "ArrowLeft") {

            previousSlide();

        }


        if (event.key === "Escape") {

            closeSlide.click();

        }

    }
);


/* =========================
   MOBILE SWIPE
========================= */

slideshow.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.touches[0].clientX;

    }
);


slideshow.addEventListener(
    "touchend",
    (event) => {

        const touchEndX =
            event.changedTouches[0].clientX;

        const difference =
            touchStartX - touchEndX;


        if (Math.abs(difference) < 50) {
            return;
        }


        if (difference > 0) {

            nextSlide();

        } else {

            previousSlide();

        }

    }
);


/* =========================
   CARD RANDOMIZATION
========================= */

window.addEventListener(
    "resize",
    () => {

        if (
            !mainContent.classList.contains("hidden")
        ) {

            createCards();

        }

    }
);


/* =========================
   IMAGE LOAD FALLBACK
========================= */

document.addEventListener(
    "error",
    (event) => {

        if (
            event.target.tagName === "IMG"
        ) {

            /*
                If image doesn't exist,
                create a nice fallback.
            */

            event.target.style.background =
                "linear-gradient(135deg,#24101c,#0d080c)";

        }

    },
    true
);