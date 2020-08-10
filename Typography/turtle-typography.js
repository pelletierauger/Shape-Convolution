var fs = require('fs');
let computedInput = "";
let fileName = "turtle-typography-thicker";

let sequences = [{
        path: `/Volumes/Volumina/frames/p5-turtle/typography-thicker/frame-`,
        start: 1,
        end: 350,
        copies: 1
    },
    {
        path: `/Volumes/Volumina/frames/shape-convolution/typography-z-thicker/sketch-`,
        start: 1,
        end: 600,
        copies: 1
    }
];

for (s of sequences) {
    for (let f = s.start; f <= s.end; f++) {
        var formattedF = "" + f;
        while (formattedF.length < 5) {
            formattedF = "0" + formattedF;
        }
        let line = `file '${s.path}${formattedF}.png'\n`;
        for (let i = 0; i < s.copies; i++) {
            computedInput += line;
        }
    }
}

fs.writeFile(fileName + '.txt', computedInput, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log(fileName + '.txt written successfully.');
    }
});