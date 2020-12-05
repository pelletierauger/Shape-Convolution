let keysActive = true;
let looping = true;
let socket, cnvs, ctx, canvasDOM;
// let fileName = "/Volumes/Volumina/frames/p5-turtle-typography-center/frame";
let fileName = "/Volumes/Volumina/frames/p5-turtle/typography-thicker/frame";
let maxFrames = 2770;
var showTurtle = true;
var turtleSize = 30;
var turtleSpeed = 1;
let graphics;
let drawCount = 0;
let canvas;

function setup() {
    socket = io.connect('http://localhost:8080');
    canvas = createCanvas(windowWidth, windowHeight);
    // canvas = createCanvas(550, 550);
    ctx = canvas.drawingContext;
    canvasDOM = document.getElementById('defaultCanvas0');
    graphics = createGraphics(width * 2, height * 2);
    if (exporting) {
        frameRate(2);
    } else {
        frameRate(30);
    }
    // background(200);
    strokeWeight(2);
    noStroke();
    fill(0, 200, 0);
    graphics.background(200);
    graphics.strokeWeight(1.25);
    graphics.stroke(0);
    graphics.fill(0);
    canvas.addClass('sketch');
    angleMode(DEGREES);
    textFont("'Inconsolata', 'Baskerville', Georgia, serif");
    textSize(35);
    if (!looping) { noLoop(); }
    // Hide the SuperCollider Editor because I will not need it for this project.
    window.setTimeout(function() {
        if (!keysActive) {
            cmArea.style.width = "1200px";
            jsCmArea.style.width = "1200px";
            jsConsoleArea.setAttribute("style", "display:block;");
            scdArea.style.display = "none";
            scdConsoleArea.setAttribute("style", "display:none;");
            jsCmArea.style.height = "685px";
            jsArea.style.display = "block";
            displayMode = "js";
            autoRedraw = true;
            // displayTimeline();
            xSheetInit = true;
        }
    }, 1000);
}

function draw() {
    for (let i = 0; i < 2; i++) {
        graphics.push();
        graphics.translate(width / 2, height / 2);
        drawTurtle();
        graphics.pop();
        drawCount++;
    }

    image(graphics, 0, 0, width, height);
    // fill(0);
    // text("freq = " + f, -1, height - 7);
    fill(0, 200, 0);

    if (showTurtle) {
        translate(width / 2, height / 2);
        noStroke();
        for (var i = 0; i < turtles.length; i++) {
            push();
            translate(turtles[i].position.x, turtles[i].position.y);
            rotate(turtles[i].heading + 90);
            beginShape();
            vertex(0, -turtleSize);
            vertex(turtleSize / 3, 0);
            vertex(-turtleSize / 3, 0);
            endShape(CLOSE);
            fill(0);
            ellipse(0, 0, 5);
            fill(0, 200, 0);
            pop();
        }
    }
    if (exporting && frameCount < maxFrames) {
        frameExport();
    }
}

function keyPressed() {
    if (keysActive) {
        if (keyCode === 32) {
            if (looping) {
                noLoop();
                looping = false;
            } else {
                loop();
                looping = true;
            }
        }
        if (key == 't' || key == 'T') {
            if (showTurtle) {
                showTurtle = false;
            } else {
                showTurtle = true;
            }
        }
        if (key == 'r' || key == 'R') {
            window.location.reload();
        }
    }
}

function convoluteShape(shape, n = 1) {
    let s = [];
    for (let i = 0; i < shape.length; i++) {
        s.push([shape[i][0], shape[i][1]]);
    }
    let nextShape;
    for (let j = 0; j < n; j++) {
        nextShape = [];
        for (let i = 0; i < shape.length; i++) {
            let curPoint = s[i];
            let prevPoint = (i == 0) ? s[s.length - 1] : s[i - 1];
            let nextPoint = (i == s.length - 1) ? s[0] : s[i + 1];
            let midX = lerp(prevPoint[0], nextPoint[0], 0.5);
            let midY = lerp(prevPoint[1], nextPoint[1], 0.5);
            let newX, newY;
            // I need to test for a block list.
            newX = lerp(curPoint[0], midX, 0.25);
            newY = lerp(curPoint[1], midY, 0.25);
            nextShape.push([newX, newY]);
        }
        s = nextShape;
    }
    return s;
}

displayShape = function(shape, scale = 1) {
    fill(0);
    stroke(0);
    strokeWeight(1);
    beginShape();
    for (let i = 0; i < shape.length; i++) {
        vertex(shape[i][0] * scale, shape[i][1] * scale);
    }
    endShape(CLOSE);
}


function showVertices(shape, s = 2) {
    fill(0);
    noStroke();
    for (let i = 0; i < shape.length; i++) {
        ellipse(shape[i][0], shape[i][1], s);
    }
}