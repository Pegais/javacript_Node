//timer program

let fhandle=require("fs")
source = fhandle.readFileSync("/Users/sneha/.spyder-py3/mbox.txt","utf-8")
fhandle.appendFileSync("output.txt",source+" ")