var shape, nextShape, points;

function setup() {
  createCanvas(550, 550);
  frameRate(30);
  fill(0);
  noStroke();
  newShape();
}

function draw() {
  background(220);
  translate(550 * 0.5, 550 * 0.5);
  beginShape();
  for (let i = 0; i < shape.length - 0; i++) {
    vertex(shape[i].x, shape[i].y);
  }
  endShape();
  // text(points.length, -200, -200);
  // fill(255, 0, 0);
  // for (let i = 0; i < points.length; i++) {
  //   ellipse(points[i][0], points[i][1], 5);
  // }
  // fill(0);
  for (let j = 0; j < 2; j++) {
    nextShape = [];
    for (let i = 0; i < shape.length; i++) {
      let s = shape;
      let curPoint = s[i];
      let prevPoint = (i == 0) ? s[s.length - 1] : s[i - 1];
      let nextPoint = (i == s.length - 1) ? s[0] : s[i + 1];
      let midX = lerp(prevPoint.x, nextPoint.x, 0.5);
      let midY = lerp(prevPoint.y, nextPoint.y, 0.5);
      let newX = lerp(curPoint.x, midX, 1);
      let newY = lerp(curPoint.y, midY, 1);

      nextShape.push({
        x: newX,
        y: newY
      });
    }
    shape = nextShape;
  }
  if (frameCount % 200 == 0) {
    newShape();
  }
}

function newShape() {
points = [];
  let w = 550 * 0.5;
  for (let i = 0; i < 20; i++) {
    let x = random(w * -1, w);
    let y = random(w * -1, w);
    points.push([x, y]);
  }
  points = hull(points, 100);
  shape = [];
  for (let i = 0; i < points.length - 1; i++) {
    let nextP = (i == points.length - 1) ? 0 : i + 1;
    for (let j = 0; j < 20; j++) {
      let l = j / 20;
      let lerpX = lerp(points[i][0], points[nextP][0], l);
      let lerpY = lerp(points[i][1], points[nextP][1], l);
      shape.push({
        x: lerpX,
        y: lerpY
      });
    }
  }
}