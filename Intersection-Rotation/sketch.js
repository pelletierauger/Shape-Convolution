let keysActive = true;
let looping = true;
let socket, canvas, ctx, canvasDOM;
let fileName = "/Volumes/Volumina/frames/shape-convolution/intersection-rotation-255/sketch";
let shape, nextShape, points, rotReal, rotComplex;
let drawCount = 1;

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
    strokeWeight(1.2);
    var n = 900;
    var inc = TWO_PI / n;
    rotReal = cos(inc);
    rotComplex = sin(inc);
    if (batchExport) {
        drawCount = batchMin;
        exporting = true;
        looping = false;
        // redraw();
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
    background(255);
    translate(550 * 0.5, 550 * 0.5);
    // noFill();
    fill(0);
    // noStroke();
    stroke(255);
    beginShape();
    for (let i = 0; i < shape.length - 0; i++) {
        let sc = (shape[i].y + (550 * 0.5)) * 0.01;
        vertex(shape[i].x * (1 + 0), shape[i].y);
    }
    endShape();
    var increment = 0;
    stroke(255);
    for (let i = 0; i < shape.length; i += 1) {
        let intersection = null;
        let lengthOfIntersect = Infinity;
        for (let j = 0; j < shape.length; j++) {
            let k = (j < shape.length - 1) ? j + 1 : 0;
            let test = intersect(
                shape[i].x, shape[i].y + 0.1,
                shape[i].x, shape[i].y + 2000,
                shape[j].x, shape[j].y,
                shape[k].x, shape[k].y);
            if (test) {

                let l = dist(shape[i].x, shape[i].y, test.x, test.y);
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
            var gradient = ctx.createLinearGradient(
                shape[i].x, shape[i].y,
                shape[i].x, shape[i].y + 200);
            gradient.addColorStop(0, 'rgba(255,255,255,1.0)');
            gradient.addColorStop(1, 'rgba(255,255,255,1.0)');
            ctx.strokeStyle = gradient;
            let sc = (shape[i].y + (550 * 0.5)) * 0.01;
            line(shape[i].x * (1 + 0), shape[i].y + 0.5,
                intersection.x * (1 + 0), intersection.y - 0.5);
            // for (let k = 0; k < 50; k++) {
            //   let sc = i / 20;
            //   line(shape[i].x, shape[i].y + i,
            //        shape[i].x, shape[i].y + i + 1);
            // }

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
    // fill(0);
    // convolute();
    rotateShape();
    // if (frameCount % 400 == 0) {
    //     rotAngle *= -1;
    //     newShape();
    // }
    if (exporting) {
        frameExport();
    }
    drawCount++;
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
    let w = 550 * 0.4;
    for (let i = 0; i < 80; i++) {
        let x = random(w * -1, w);
        let y = random(w * -1, w);

        for (let j = 0; j < 1; j++) {
            points.push([x, y]);
        }

    }
    points = staticPoints;
    points = hull(points, random(0.01));
    shape = [];
    for (let i = 0; i < points.length - 1; i++) {
        let nextP = (i == points.length - 1) ? 0 : i + 1;
        for (let j = 0; j < 5; j++) {
            let l = j / 5;
            let lerpX = lerp(points[i][0], points[nextP][0], l);
            let lerpY = lerp(points[i][1], points[nextP][1], l);
            shape.push({
                x: lerpX * 1.5,
                y: lerpY * 1.5
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