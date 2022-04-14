
let cp = require("child_process");
let num = process.argv[2];
if(num%2==0){
    cp.exec("start chrome https://pepcoding.com/")
}else{
    cp.exec("start chrome https://nados.pepcoding.com")
}