let keysActive = true;
let looping = true;
let socket, canvas, ctx, canvasDOM;
let fileName = "/Volumes/Volumina\ 1/frames/shape-convolution/vanishing-point-flip/sketch";

var shape, nextShape, points, n, inc, drawCount, rotReal, rotComplex;

let flip = 1;

function setup() {
    socket = io.connect('http://localhost:8080');
    canvas = createCanvas(550, 550);
    ctx = canvas.drawingContext;
    canvasDOM = document.getElementById('defaultCanvas0');
    frameRate(30);
    fill(0);
    // noStroke();
    newShape();
    // noLoop();
    strokeWeight(1.7);
    n = 900;
    inc = TWO_PI / n;
    rotReal = cos(inc);
    rotComplex = sin(inc);
    drawCount = 0;
    if (batchExport) {
        drawCount = batchMin;
        exporting = true;
        looping = false;
    }
    if (!looping) {
        noLoop();
    }
    socket.on('getNextImage', function(data) {
        if (drawCount <= batchMax) {
            // redraw();
            window.setTimeout(function() {
                redraw();
            }, 100);
        }
    });
}

function draw() {
    if (flip == 1) {
        background(0);
        fill(255);
        stroke(255);
    } else {
        background(255);
        fill(0);
        stroke(0);
    }
    push();
    translate(550 * 0.5, 550 * 0.25);
    // noFill();
    scale(0.75, 0.75);

    // noStroke();
    // stroke(0);
    beginShape();
    for (let i = 0; i < shape.length - 0; i++) {
        let sc = (shape[i].y + (550 * 0.5)) * 0.005;
        vertex(shape[i].x * (1 + sc), shape[i].y);
    }
    endShape();
    if (flip == 1) {
        // stroke(0);
    } else {
        stroke(255);
    }
    var increment = 0;
    // stroke(255);
    for (let i = 0; i < shape.length; i += 1) {
        let intersection = null;
        let lengthOfIntersect = Infinity;
        let sc = (shape[i].y + (550 * 0.5)) * 0.005;
        for (let j = 0; j < shape.length; j++) {
            let k = (j < shape.length - 1) ? j + 1 : 0;
            let scj = (shape[j].y + (550 * 0.5)) * 0.005;
            let sck = (shape[k].y + (550 * 0.5)) * 0.005;
            let test = intersect(
                shape[i].x * (1 + sc), shape[i].y + 0.1,
                shape[i].x * (1 + sc), shape[i].y + 2000,
                shape[j].x * (1 + scj), shape[j].y,
                shape[k].x * (1 + sck), shape[k].y);
            if (test) {

                let l = dist(shape[i].x * (1 + sc), shape[i].y, test.x, test.y);
                if (l < lengthOfIntersect) {
                    lengthOfIntersect = l;
                    intersection = test;
                }
            }
        }
        if (intersection !== null) {
            // increment++;
            // increment += lengthOfIntersect;
            // let j = intersectionIndex;
            let sc = (shape[i].y + (550 * 0.5)) * 0.005;
            let sck = (intersection.y + (550 * 0.5)) * 0.005;

            var gradient = ctx.createLinearGradient(
                shape[i].x * (1 + sc), shape[i].y,
                shape[i].x * (1 + sc), shape[i].y + 200);
            // gradient.addColorStop(0, 'rgba(255,255,255,1.0)');
            // gradient.addColorStop(1, 'rgba(255,255,255,1.0)');
            // ctx.strokeStyle = gradient;
            line(shape[i].x * (1 + sc), shape[i].y + 0.5,
                shape[i].x * (1 + sc), intersection.y - 0.5);
            // for (let k = 0; k < 50; k++) {
            //   let sc = i / 20;
            //   line(shape[i].x, shape[i].y + i,
            //        shape[i].x, shape[i].y + i + 1);
            // }

        } else {
            line(shape[i].x * (1 + sc), shape[i].y + 0.5,
                shape[i].x * (1 + sc), shape[i].y + 1000);
        }
        // ellipse(shape[i].x, shape[i].y, 2);
    }
    fill(0);
    // text(shape.length, -550 * 0.5, -550 * 0.5 + 20);
    // text(increment, -550 * 0.5, -550 * 0.5 + 40);
    // noStroke();
    // text(points.length, -200, -200);
    // fill(255, 0, 0);
    // for (let i = 0; i < points.length; i++) {
    //   ellipse(points[i][0], points[i][1], 5);
    // }
    pop();
    // if (flip == 1) {
    //     // var img = ctx.getImageData(0, 0, width, height);
    //     var img = canvasDOM;
    //     ctx.filter = 'invert(1)'
    //     ctx.drawImage(img, 0, 0, 550, 550);
    //     ctx.filter = "none";
    // }
    // fill(0);
    // convolute();
    rotateShape();
    if (frameCount % 30 == 0) {
        flip *= -1;
    }
    if (exporting) {
        frameExport();
    }
    drawCount++;
    // drawCount++;
    // if (drawCount > n) {
    //     drawCount = 0;
    // }
    // pop();
    // let w = 550 * 0.5;
    // var gradient = ctx.createLinearGradient(0, 0, 0, 550);
    // gradient.addColorStop(0, 'rgba(0,0,100,0.5)');
    // gradient.addColorStop(1, 'rgba(0,0,100,0.0)');
    // ctx.fillStyle = gradient;
    // rect(0, 0, 550, 550);
}

function rotateShape() {
    let oldShape = shape;
    let newShape = [];
    for (let i = 0; i < shape.length; i++) {
        let c = new Complex(shape[i].x, shape[i].y);
        let rot = new Complex(rotReal, rotComplex);
        c.multiply(rot);
        let p = c.plot();
        newShape.push({ x: p.x, y: p.y });
    }
    shape = newShape;
}


function newShape() {
    points = [];
    let w = 550 * 0.9;
    for (let i = 0; i < 160; i++) {
        let x = random(w * -1, w);
        let y = random(w * -1, w);

        for (let j = 0; j < 1; j++) {
            points.push([x, y]);
        }

    }
    points = staticPoints;
    points = hull(points, 0);
    shape = [];
    for (let i = 0; i < points.length - 1; i++) {
        let nextP = (i == points.length - 1) ? 0 : i + 1;
        for (let j = 0; j < 10; j++) {
            let l = j / 10;
            let lerpX = lerp(points[i][0], points[nextP][0], l);
            let lerpY = lerp(points[i][1], points[nextP][1], l);
            shape.push({
                x: lerpX,
                y: lerpY
            });
        }
    }
    for (let i = 0; i < 1; i++) {
        convolute();
    }
}

function intersects(a, b, c, d, p, q, r, s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        // return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        return ((-0.01 < lambda && lambda < 1.01) && (-0.01 < gamma && gamma < 1.01))
    }
};

// http://paulbourke.net/geometry/pointlineplane/javascript.txt
function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false
    }

    denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

    // Lines are parallel
    if (denominator === 0) {
        return false
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return false
    }

    // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)

    return { x, y }
}

function convolute() {
    for (let j = 0; j < 5; j++) {
        nextShape = [];
        for (let i = 0; i < shape.length; i++) {
            let s = shape;
            let curPoint = s[i];
            let prevPoint = (i == 0) ? s[s.length - 1] : s[i - 1];
            let nextPoint = (i == s.length - 1) ? s[0] : s[i + 1];
            let midX = lerp(prevPoint.x, nextPoint.x, 0.5);
            let midY = lerp(prevPoint.y, nextPoint.y, 0.5);
            let newX = lerp(curPoint.x, midX, 0.25);
            let newY = lerp(curPoint.y, midY, 0.25);

            nextShape.push({
                x: newX,
                y: newY
            });
        }
        shape = nextShape;
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
        if (key == 'r' || key == 'R') {
            window.location.reload();
        }
    }
}