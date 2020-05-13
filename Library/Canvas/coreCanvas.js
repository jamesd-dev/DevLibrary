function init() {
    window.canvas = document.getElementById('main-canvas');
    window.ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.particles = {};
    window.offset = {
        x : 0,
        y : 0,
        shakePath : [],
        shake : (len) => {
            for(let i = 0; i < len; i++) {
                window.offset.shakePath[i] = Math.random() * 5;
            }
        },
        apply : () => {
            if(window.offset.shakePath.length > 0) {
                let o = window.offset.shakePath.pop();
                x = o;
                y = o;
            } else {
                x = 0;
                y = 0;
            }
        }
    };
    window.mouse = {
        x: 0,
        y: 0
    };

    window.addEventListener('mousemove', (e) => {
        let rect = window.canvas.getBoundingClientRect();
        window.mouse.x = e.x + rect.left;
        window.mouse.y = e.y + rect.top;
    });
}

function drawLoop() {
    // call loop next time we can draw
    requestAnimationFrame(drawLoop);
    clearScreen('white');
    window.offset.apply();
    playParticles();
}

function playParticles() {
    for(let p of Object.values(window.particles)) {
        p.update();
        p.draw();
    }
}

function clearScreen(bgColor) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// runs when DOM finishes loading
window.addEventListener('load', () => {

    init();
    drawLoop();

});