var turtles = [];
var instructionBox = [];

var Turtle = function(t) {
    this.heading = t.heading || 0;
    this.position = t.position || new p5.Vector(0, 0);
    this.penDown = true;
    this.awake = (t.awake != null) ? t.awake : true;
    this.currentState = 0;
    this.history = [];
    this.history.push([this.position.x, this.position.y]);
    this.stepsPerFrame = t.stepsPerFrame || 1;
    if (this.awake) {
        t.instructions();
        this.states = instructionBox;
        instructionBox = [];
        turtles.push(this);
    }
};

Turtle.prototype.reset = function(t) {
    this.heading = t.heading || 0;
    this.position = t.position || new p5.Vector(0, 0);
    this.penDown = true;
    this.awake = (t.awake != null) ? t.awake : true;
    this.currentState = 0;
    this.stepsPerFrame = t.stepsPerFrame || 1;
    instructionBox = [];
    this.history = [];
    this.history.push([this.position.x, this.position.y]);
    if (this.awake) {
        t.instructions();
        this.states = instructionBox;
        instructionBox = [];
        // turtles.push(this);
    }
    graphics.background(200);
};