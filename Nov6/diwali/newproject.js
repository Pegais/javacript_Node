// first project to print your name to nodejs
// minimist

let minimist = require("minimist");
let args = minimist(process.argv);
let name = args.input;
console.log("hello  "+name);
