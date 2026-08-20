/* =====================================================
   HAPPY BIRTHDAY - SCRIPT.JS
===================================================== */


/* =========================
   LẤY CÁC PHẦN TỬ HTML
========================= */

const intro = document.getElementById("intro");
const birthday = document.getElementById("birthday");

const flame = document.getElementById("flame");
const wish = document.getElementById("wish");

const music = document.getElementById("music");
const typing = document.getElementById("typing");

const heartsContainer =
    document.getElementById("hearts");

const cakeArea =
    document.getElementById("cakeArea");

const instruction =
    document.getElementById("instruction");

const canvas =
    document.getElementById("fireworks");

const ctx =
    canvas ? canvas.getContext("2d") : null;


/* =========================
   TRẠNG THÁI
========================= */

let candleBlown = false;
let typingStarted = false;
let fireworksStarted = false;
let heartInterval = null;
let celebrationHeartInterval = null;


/* =========================
   MỞ QUÀ
========================= */

function startBirthday() {

    /* Ẩn màn hình mở đầu */

    if (intro) {
        intro.classList.add("hidden");
    }


    /* Hiện màn hình sinh nhật */

    if (birthday) {
        birthday.classList.remove("hidden");
    }


    /* =====================
       PHÁT NHẠC
    ===================== */

    if (music) {

        music.volume = 0.5;

        music.play().catch(() => {

            console.log(
                "Trình duyệt không cho phép phát nhạc tự động."
            );

        });
    }


    /* =====================
       BẮT ĐẦU TIM BAY
    ===================== */

    startFlyingHearts();
}


/* =========================
   THỔI NẾN
========================= */

function blowCandle() {

    /*
        Nếu đã thổi rồi
        thì không làm lại.
    */

    if (candleBlown) {
        return;
    }

    candleBlown = true;


    /* =====================
       TẮT NGỌN LỬA
    ===================== */

    if (flame) {

        flame.style.display = "none";
    }


    /* =====================
       Đổi dòng hướng dẫn
    ===================== */

    if (instruction) {

        instruction.innerHTML =
            "🎉 Chúc mừng sinh nhật! 🎉";
    }


    /* =====================
       Hiện lời chúc
    ===================== */

    if (wish) {

        wish.classList.remove("hidden");
    }


    /* =====================
       Hiệu ứng pháo hoa
    ===================== */

    startFireworks();


    /* =====================
       Hiệu ứng chữ chạy
    ===================== */

    typeWish();


    /* =====================
       Tăng tim bay
    ===================== */

    startCelebrationHearts();
}


/* =========================
   CLICK VÀO BÁNH
========================= */

if (cakeArea) {

    cakeArea.addEventListener(
        "click",
        blowCandle
    );
}


/* =====================================================
   LỜI CHÚC
===================================================== */

const message =
    "Chúc bé Paint của ck tuổi mới thật nhiều niềm vui, " +
    "luôn mạnh khỏe, hạnh phúc và may mắn. " +
    "Mong rằng mọi điều tốt đẹp nhất sẽ đến với bé. " +
    "Hãy luôn mỉm cười và theo đuổi những điều mình yêu thích nhé! ❤️";


let messageIndex = 0;


/* =========================
   BẮT ĐẦU GÕ CHỮ
========================= */

function typeWish() {

    /*
        Không cho chạy nhiều lần.
    */

    if (typingStarted) {
        return;
    }

    typingStarted = true;

    messageIndex = 0;


    if (typing) {

        typing.innerHTML = "";
    }


    writeNextCharacter();
}


/* =========================
   GÕ TỪNG KÝ TỰ
========================= */

function writeNextCharacter() {

    if (!typing) {
        return;
    }


    if (messageIndex < message.length) {

        typing.innerHTML +=
            message.charAt(messageIndex);

        messageIndex++;


        setTimeout(
            writeNextCharacter,
            45
        );
    }
}


/* =====================================================
   PHÁO HOA
===================================================== */

let particles = [];


/* =========================
   ĐIỀU CHỈNH CANVAS
========================= */

function resizeCanvas() {

    if (!canvas) {
        return;
    }


    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================
   TẠO PHÁO HOA
========================= */

function createFirework() {

    if (!canvas) {
        return;
    }


    /*
        Vị trí pháo hoa
        tập trung ở phần trên.
    */

    const x =
        Math.random() *
        canvas.width;


    const y =
        Math.random() *
        canvas.height *
        0.45;


    /*
        Một màu cho mỗi quả pháo.
    */

    const hue =
        Math.random() * 360;


    /*
        Tạo 90 hạt.
    */

    for (let i = 0; i < 90; i++) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            Math.random() * 6 + 2;


        particles.push({

            x: x,
            y: y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life: 100,

            size:
                Math.random() * 3 + 1,

            hue: hue

        });
    }
}


/* =========================
   ANIMATE PHÁO HOA
========================= */

function animateFireworks() {

    if (!ctx || !canvas) {
        return;
    }


    /*
        Xóa khung hình trước.
    */

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /*
        Cập nhật từng hạt.
    */

    particles.forEach(
        (particle, index) => {

            particle.x +=
                particle.vx;

            particle.y +=
                particle.vy;


            /*
                Trọng lực.
            */

            particle.vy += 0.05;


            /*
                Giảm tốc nhẹ.
            */

            particle.vx *= 0.99;
            particle.vy *= 0.99;


            /*
                Giảm tuổi.
            */

            particle.life--;


            /*
                Độ mờ.
            */

            ctx.globalAlpha =
                Math.max(
                    particle.life / 100,
                    0
                );


            ctx.beginPath();


            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `hsl(${particle.hue}, 100%, 70%)`;


            ctx.fill();


            /*
                Xóa hạt đã hết tuổi.
            */

            if (particle.life <= 0) {

                particles.splice(
                    index,
                    1
                );
            }

        }
    );


    ctx.globalAlpha = 1;


    requestAnimationFrame(
        animateFireworks
    );
}


/* =========================
   BẮT ĐẦU PHÁO HOA
========================= */

function startFireworks() {

    /*
        Không chạy nhiều animation
        cùng lúc.
    */

    if (fireworksStarted) {
        return;
    }

    fireworksStarted = true;


    /*
        Bắt đầu animation.
    */

    animateFireworks();


    /*
        Bắn 20 quả pháo.
    */

    let count = 0;


    const fireworksInterval =
        setInterval(() => {

            createFirework();

            count++;


            if (count >= 20) {

                clearInterval(
                    fireworksInterval
                );
            }

        }, 450);
}


/* =====================================================
   TRÁI TIM BAY
===================================================== */


/*
    Các loại trái tim.
*/

const heartTypes = [

    "❤️",
    "💕",
    "💗",
    "💖",
    "💓",
    "💘",
    "💝"

];


/* =========================
   TẠO MỘT TRÁI TIM
========================= */

function createHeart() {

    if (!heartsContainer) {
        return;
    }


    const heart =
        document.createElement("div");


    heart.classList.add(
        "heart-fly"
    );


    /*
        Chọn emoji ngẫu nhiên.
    */

    heart.innerHTML =
        heartTypes[
            Math.floor(
                Math.random() *
                heartTypes.length
            )
        ];


    /*
        Vị trí ngang.
    */

    heart.style.left =
        Math.random() * 100 + "vw";


    /*
        Kích thước.
    */

    heart.style.fontSize =
        Math.random() * 25 +
        15 +
        "px";


    /*
        Tốc độ bay.
    */

    heart.style.animationDuration =
        Math.random() * 4 +
        4 +
        "s";


    /*
        Độ trễ.
    */

    heart.style.animationDelay =
        Math.random() * 0.5 +
        "s";


    /*
        Thêm vào HTML.
    */

    heartsContainer.appendChild(
        heart
    );


    /*
        Xóa sau khi bay xong.
    */

    setTimeout(() => {

        heart.remove();

    }, 9500);
}


/* =========================
   TIM BAY NHẸ
========================= */

function startFlyingHearts() {

    /*
        Nếu đã chạy thì không tạo
        interval thứ hai.
    */

    if (heartInterval) {
        return;
    }


    heartInterval =
        setInterval(() => {

            createHeart();

        }, 800);
}


/* =========================
   TIM BAY SAU KHI THỔI NẾN
========================= */

function startCelebrationHearts() {

    /*
        Không tạo nhiều interval
        nếu click nhiều lần.
    */

    if (celebrationHeartInterval) {
        return;
    }


    celebrationHeartInterval =
        setInterval(() => {

            createHeart();
            createHeart();
            createHeart();

        }, 500);
}


/* =====================================================
   CHẠY MỘT QUẢ PHÁO NHỎ KHI MỞ QUÀ
   Không bắt buộc.
===================================================== */

/*
    Nếu bạn không muốn có hiệu ứng gì
    trước khi thổi nến thì giữ nguyên
    như hiện tại.

    Pháo hoa chỉ bắt đầu sau khi
    click vào bánh.
*/


console.log(
    "🎂 Happy Birthday website loaded!"
);
