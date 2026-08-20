const intro = document.getElementById("intro");
const birthday = document.getElementById("birthday");

const flame = document.getElementById("flame");
const wish = document.getElementById("wish");

const blowButton = document.getElementById("blowButton");

const music = document.getElementById("music");

const typing = document.getElementById("typing");

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

const heartsContainer =
    document.getElementById("hearts");


/* =========================
   TRẠNG THÁI
========================= */

let candleBlown = false;

let typingStarted = false;

let fireworksStarted = false;


/* =========================
   START BIRTHDAY
========================= */

function startBirthday() {

    intro.classList.add("hidden");

    birthday.classList.remove("hidden");


    /*
        Bắt đầu nhạc.

        Trình duyệt thường cho phép
        phát nhạc vì người dùng vừa
        nhấn nút "Mở quà".
    */

    if (music) {

        music.volume = 0.5;

        music.play().catch(() => {

            console.log(
                "Không thể tự động phát nhạc."
            );

        });
    }


    /*
        Bắt đầu tạo tim nhẹ nhàng
        ngay khi mở quà.
    */

    startFlyingHearts();
}


/* =========================
   BLOW CANDLE
========================= */

function blowCandle() {

    /*
        Không cho bấm nhiều lần.
    */

    if (candleBlown) {
        return;
    }

    candleBlown = true;


    /* Tắt lửa */

    if (flame) {

        flame.style.display =
            "none";
    }


    /* Ẩn nút */

    if (blowButton) {

        blowButton.style.display =
            "none";
    }


    /* Đổi hướng dẫn */

    const instruction =
        document.querySelector(
            ".instruction"
        );

    if (instruction) {

        instruction.innerHTML =
            "🎉 Chúc mừng sinh nhật! 🎉";
    }


    /* Hiện lời chúc */

    if (wish) {

        wish.classList.remove(
            "hidden"
        );
    }


    /*
        Bắt đầu pháo hoa
    */

    startFireworks();


    /*
        Bắt đầu hiệu ứng
        chữ chạy từng ký tự.
    */

    typeWish();


    /*
        Tăng số lượng tim
        sau khi thổi nến.
    */

    startCelebrationHearts();
}


/* =========================
   LỜI CHÚC
========================= */

const message =
    "Chúc bé Paint của ck tuổi mới thật nhiều niềm vui, " +
    "luôn mạnh khỏe, hạnh phúc và may mắn. " +
    "Mong rằng mọi điều tốt đẹp nhất " +
    "sẽ đến với bé. " +
    "Hãy luôn mỉm cười và theo đuổi " +
    "những điều mình yêu thích nhé! ❤️";


let index = 0;


function typeWish() {

    /*
        Không chạy lại nếu đã bắt đầu.
    */

    if (typingStarted) {
        return;
    }

    typingStarted = true;

    index = 0;

    if (typing) {

        typing.innerHTML = "";
    }


    writeNextCharacter();
}


function writeNextCharacter() {

    if (!typing) {
        return;
    }


    if (index < message.length) {

        typing.innerHTML +=
            message.charAt(index);

        index++;


        setTimeout(
            writeNextCharacter,
            45
        );

    }

}


/* =========================
   FIREWORKS
========================= */


/*
    Thiết lập kích thước canvas.
*/

function resizeCanvas() {

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


/*
    Danh sách hạt pháo hoa.
*/

let particles = [];


/*
    Tạo một pháo hoa.
*/

function createFirework() {

    const x =
        Math.random() *
        canvas.width;


    const y =
        Math.random() *
        canvas.height *
        0.45;


    /*
        Màu của một quả pháo
        sẽ được giữ cố định
        cho toàn bộ hạt.
    */

    const hue =
        Math.random() * 360;


    for (let i = 0; i < 90; i++) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            Math.random() *
            6 +
            2;


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
                Math.random() *
                3 +
                1,

            hue: hue

        });
    }
}


/*
    Animation pháo hoa.
*/

function animateFireworks() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /*
        Vẽ từng hạt.
    */

    particles.forEach(
        (p, index) => {

            p.x += p.vx;

            p.y += p.vy;


            /*
                Trọng lực nhẹ.
            */

            p.vy += 0.05;


            /*
                Giảm tốc một chút.
            */

            p.vx *= 0.99;

            p.vy *= 0.99;


            p.life--;


            /*
                Độ trong suốt giảm dần.
            */

            ctx.globalAlpha =
                Math.max(
                    p.life / 100,
                    0
                );


            ctx.beginPath();


            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `hsl(${p.hue}, 100%, 70%)`;


            ctx.fill();


            /*
                Xóa hạt đã hết tuổi.
            */

            if (p.life <= 0) {

                particles.splice(
                    index,
                    1
                );
            }

        }
    );


    /*
        Reset alpha.
    */

    ctx.globalAlpha = 1;


    requestAnimationFrame(
        animateFireworks
    );
}


/*
    Bắt đầu pháo hoa.
*/

function startFireworks() {

    if (fireworksStarted) {
        return;
    }

    fireworksStarted = true;


    /*
        Chạy animation.
    */

    animateFireworks();


    /*
        Tạo pháo hoa liên tục.
    */

    let count = 0;


    const fireworksInterval =
        setInterval(() => {

            createFirework();

            count++;


            /*
                Sau 20 lần vẫn để
                một số hạt còn bay.
            */

            if (count >= 20) {

                clearInterval(
                    fireworksInterval
                );
            }

        }, 450);
}


/* =========================
   FLYING HEARTS
========================= */


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


/*
    Tạo một trái tim.
*/

function createHeart() {

    /*
        Kiểm tra container.
    */

    if (!heartsContainer) {
        return;
    }


    const heart =
        document.createElement(
            "div"
        );


    /*
        Thêm class để CSS
        tạo animation.
    */

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
        Vị trí ngang ngẫu nhiên.
    */

    heart.style.left =
        Math.random() *
        100 +
        "vw";


    /*
        Kích thước ngẫu nhiên.
    */

    heart.style.fontSize =
        Math.random() *
        25 +
        15 +
        "px";


    /*
        Thời gian bay ngẫu nhiên.
    */

    heart.style.animationDuration =
        Math.random() *
        4 +
        4 +
        "s";


    /*
        Độ trễ nhỏ.
    */

    heart.style.animationDelay =
        Math.random() *
        0.5 +
        "s";


    /*
        Thêm vào trang.
    */

    heartsContainer.appendChild(
        heart
    );


    /*
        Xóa sau khi animation kết thúc.
    */

    setTimeout(() => {

        heart.remove();

    }, 9500);
}


/*
    Tim bay nhẹ nhàng.
*/

let heartInterval;


function startFlyingHearts() {

    /*
        Không tạo interval
        nhiều lần.
    */

    if (heartInterval) {
        return;
    }


    heartInterval =
        setInterval(() => {

            createHeart();

        }, 800);
}


/*
    Sau khi thổi nến,
    tim xuất hiện dày hơn.
*/

function startCelebrationHearts() {

    setInterval(() => {

        createHeart();

        createHeart();

    }, 450);
}
