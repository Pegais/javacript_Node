//wcat 
// Used to display or make a copy content of one or file in another display
// const { count } = require("console");
let fs = require("fs");
let inputArray = process.argv.slice(2);
let fileArr = [];
let optionArr = [];


//loop for finding the options and filename;
for (let i = 0; i < inputArray.length; i++) {
    let firstchar = inputArray[i].charAt(0);
    if (firstchar == "-") {
        optionArr.push(inputArray[i]);
    } else {
        fileArr.push(inputArray[i]);
    }
}
//printing the content of filearray 
let content = "";
for (let i = 0; i < fileArr.length; i++) {
    let temp = fs.readFileSync(fileArr[i], "utf-8");
    content += temp + "\r\n";

}
console.log(content);

let contentArray = content.split("\r\n");
console.log(contentArray);
// for(let i=0;i<contentArray.length)
// -s
let ispreset = optionArr.includes("-s");
if (ispreset == true) {
    for (let i = 1; i < contentArray.length; i++) {
        if (contentArray[i] == "" && contentArray[i - 1] == "") {
            contentArray[i] = null;
        } else if (contentArray[i] == "" && contentArray[i - 1] == null) {
            contentArray[i] = null;
        }
    }
    let tempArray = [];
    for (let i = 0; i < contentArray.length; i++) {
        if (contentArray[i] != null) {
            tempArray.push(contentArray[i]);
        }

    }
    contentArray = tempArray;

}
console.log(contentArray);
let inPresent = optionArr.includes("-n");
if (inPresent == true) {
    for (let i = 0; i < contentArray.length; i++) {
        contentArray[i] = `${i + 1} ${contentArray[i]}`;

    }

}
// isme line chodke rint hota hai jitna file me hai.
console.log(contentArray.join("\n"));

// -b
let isbPresent = optionArr.includes("-b");
if (isbPresent == true) {
    let counter = 1;
    for (let i = 0; i < contentArray.length; i++) {
        if (contentArray[i] != "") {
            contentArray[i] = `${counter} ${contentArray[i]}`
            counter++;
        }
    }

}

// isme line chodke rint hota hai jitna file me hai.
console.log(contentArray.join("\n"));


