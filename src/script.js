import * as dat from "dat.gui";

const gui = new dat.GUI();

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const wave = {
    y: canvas.height / 2,
    waveLength: 0.01,
    amplitude: 100,
    frequency: 0.01,
};

const strokeColor = {
    h: 200,
    s: 50,
    l: 50,
};

const bgColor = {
    r: 0,
    g: 0,
    b: 0,
    alpha: 0.03,
};

const waveFolder = gui.addFolder("wave");
waveFolder.add(wave, "y", 0, canvas.height);
waveFolder.add(wave, "waveLength", -0.01, 0.01);
waveFolder.add(wave, "amplitude", -300, 300);
waveFolder.add(wave, "frequency", -0.01, 1);
waveFolder.open(); // open the folder by default

const strokeColorFolder = gui.addFolder("strokeColor");
strokeColorFolder.add(strokeColor, "h", 0, 255);
strokeColorFolder.add(strokeColor, "s", 0, 100);
strokeColorFolder.add(strokeColor, "l", 0, 100);

const backgroundColorFolder = gui.addFolder("bgColor");
backgroundColorFolder.add(bgColor, "r", 0, 255);
backgroundColorFolder.add(bgColor, "g", 0, 255);
backgroundColorFolder.add(bgColor, "b", 0, 255);
backgroundColorFolder.add(bgColor, "alpha", 0, 1);

let increment = wave.frequency;
function animate() {
    requestAnimationFrame(animate);
    context.fillStyle = `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.alpha})`;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.beginPath();

    context.moveTo(0, canvas.height / 2);
    for (let i = 0; i < canvas.width; i++) {
        context.lineTo(i, sinWave(i, increment));
    }
    const strokeColorNew = changingStrokeColor(increment);
    context.strokeStyle = `hsl(${strokeColorNew}, ${strokeColor.s}%, ${strokeColor.l}%)`;
    context.stroke();
    increment += wave.frequency;
}

function changingStrokeColor(increment) {
    return Math.abs(Math.sin(increment) * strokeColor.h);
}

// sin function with changing amplitude
function sinWave(x, increment) {
    return (
        Math.sin(x * wave.waveLength + increment) *
            wave.amplitude *
            Math.sin(increment) +
        wave.y
    );
}

animate();
