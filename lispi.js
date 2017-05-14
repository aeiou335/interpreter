const fs = require("fs");
const {interpreter} = require("./interpreter.js");
var argv = require('minimist')(process.argv.slice(2));

let target = fs.readFileSync(argv["_"][0], "utf8");

if(argv["print"]){
	console.log(interpreter(target));
}else{
	interpreter(target);
}