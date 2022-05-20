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
        heading: 0,
        position: new p5.Vector(152, -100),
        stepsPerFrame: 100,
        instructions: function() {
            let ar = [4, 2];
            let m = 17;
            let n;
            repeat(m, ii => {
                // left(90);
                let n;
                let si = 45;
                freq = 0.125;
                repeat(30, t => {
                   forward(1 * 3);
                   left(Math.sin(t * freq) * 10 * map(t, 0, 60, 1, 0));
                    // n *= 1.02;
                });
                left(200);
                repeat(si, t => {
                   forward(0.5 * 3);
                   left(Math.sin(t * freq) * 10 * map(t, 0, 60, 1, 0));
                });
            
                n = 1;
                repeat(si, t => {
                   forward(0.5 * 3);
                   right(n - (Math.sin(t * freq) * 10 * map(t, 0, 60, 0.25, 1.5)));
                    n *= 1.04;
                });
            repeat(120, t => {
                   forward(1 * 3);
                   left(Math.sin(t * freq) * 10 * map(t, 0, 60, 1, 0));
                    // n *= 1.02;
                });
                right(200);
                            n = 1;
                repeat(si, t => {
                   forward(0.5 * 3);
                   right(n - (Math.sin(t * freq) * 10 * map(t, 0, 60, 0.25, 1.5)));
                    n *= 1.04;
                });
                            right(200);
                repeat(si, t => {
                   forward(0.5 * 3);
                   left(Math.sin(t * freq) * 10 * map(t, 0, 60, 1, 0));
                });
                            repeat(45, t => {
                   forward(0.5 * 3);
                   left(Math.sin(t * freq) * 10 * map(t, 0, 60, 1, 0));
                });
                // left(90);
            });
        }
    });