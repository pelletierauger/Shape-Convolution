var turtle = new Turtle({
    awake: true,
    position: new p5.Vector(-152 - 2.8193765840340603 * 0.5, -200 - 6),
            stepsPerFrame: 20,
            instructions: function() {
            repeat(360 * 4, t => {
               forward(0.45);
               right(0.25);
            });
            n();
            right(90);
            forward(5);
            left(90);
            left(180);
            repeat(360 * 4, t => {
               forward(0.45);
               right(0.25);
            });
            n();
            function n() {
                repeat(300 * 4, t => {
                   forward(0.3); 
                });
                right(32 + 90);
                repeat(300 * 4, t => {
                   forward(0.4); 
                });
                left(32 + 90);
                repeat(200 * 4, t => {
                   forward(0.25); 
                });
            }
        }
});

    turtle.reset({
        awake: true,
        heading:0,
        position: new p5.Vector(152, -100),
        stepsPerFrame: 100,
        instructions: function() {
            let ar = [2, 0.5];
            let m = 10;
            repeat(m, ii => {
                left(90);
                repeat(50, t => {
                   forward(ar[ii % 2]); 
                });
                left(90);
                var n = 10;
                repeat(n - 1, t => {
                    repeat(360 / n, t => {
                       forward(1);
                       right(1);
                    });
                    left(180);
                    repeat(360, t => {
                        forward(0.15);
                        right(1);
                    });
                    right(180);
                });
                repeat(360 / n, t => {
                       forward(1);
                       right(1);
                    });
                left(90);
                repeat(50, t => {
                   forward(ar[ii % 2]); 
                });
                left(90);
                repeat(360, t => {
                    forward(0.25);
                    right(1 / m);
                });
            });
        }
    });



    turtle.reset({
        awake: true,
        heading:0,
        position: new p5.Vector(152, -100),
        stepsPerFrame: 100,
        instructions: function() {
            let ar = [4, 2];
            let m = 10;
            repeat(m, ii => {
                left(90);
                repeat(50, t => {
                   forward(ar[ii % 2]);
                   left(2);
                });
                left(90);
                var n = 10;
                repeat(n - 1, t => {
                    repeat(360 / n, t => {
                       forward(0.5);
                       right(1);
                    });
                    left(180);
                    repeat(360, t => {
                        forward(0.25 );
                        right(1);
                    });
                    right(180);
                });
                repeat(360 / n, t => {
                       forward(0.5);
                       right(1);
                    });
                left(90);
                repeat(50, t => {
                   forward(ar[ii % 2]); 
                   right(2);
                });
                left(90);
                repeat(360, t => {
                    forward(0.1);
                    right(1 / m);
                });
            });
        }
    });