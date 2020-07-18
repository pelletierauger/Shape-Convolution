function Complex(real, imaginary) {
    this.real = (real) ? parseFloat(real) : 0;
    this.imaginary = (imaginary) ? parseFloat(imaginary) : 0;
}

Complex.prototype.transform = function(num) {
    // If num is complex, return it. 
    // If it's only an instance of number, 
    // Create a complex number with no imaginary component.
    return (typeof num === "number") ? new Complex(num, 0) : num;
};

Complex.prototype.display = function() {
    var re = this.real;
    var im = this.imaginary;
    if (im === "0") return "" + re;
    if (re === 0) return "" + im + "i";
    if (im < 0) return "" + re + im + "i";
    return "" + re + "+" + im + "i";
};

Complex.prototype.add = function(summand) {
    var num1, num2;
    num1 = this.transform(this);
    num2 = this.transform(summand);
    this.real = num1.real + num2.real;
    this.imaginary = num1.imaginary + num2.imaginary;
    // return this.display();
};

Complex.prototype.multiply = function(factor) {
  var num1, num2;
  num1 = this.transform(this);
  num2 = this.transform(factor);
  var real = (num1.real * num2.real)-(num1.imaginary * num2.imaginary);
  var imaginary = (num1.real * num2.imaginary)+(num1.imaginary * num2.real); 
  this.real = real;
  this.imaginary = imaginary;   
};

Complex.prototype.plot = function() {
  return {x: this.real, y: this.imaginary};
};
// var a = new Complex(2, -7);
// var b = new Complex(4, 3);
// a.add(b);
// console.log(a.display());
// console.log(a.real);
// console.log(a.imaginary);
// console.log(a.add(b));