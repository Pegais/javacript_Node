//axios
//jsdom
//minimist
//excel4node
// node webscaping.js --url=https://www.magicbricks.com/flats-in-noida-for-sale-pppfs
// first  webscraping project 
// scraping of magicbricks

//getting webpage response
let axios = require("axios");
let jsdom = require("jsdom");
let fs = require("fs")
let minimist = require("minimist")

let args = minimist(process.argv);
console.log(args.url)

let response = axios.get(args.url);


response.then(html_response)

function html_response(res){

    let html = res.data;
   // console.log(html);
    let dom = new jsdom.JSDOM(html);
    let document = dom.window.document;

    let flat_data = document.querySelectorAll("div.m-srp-card__container ");
    console.log(flat_data.length)

    for(let i=0;i<flat_data.length;i++){
        let flat_address = flat_data[i].querySelector("span.m-srp-card__title");
        let location = flat_address.textContent;
        let flat_price = flat_data[i].querySelector("span.m-srp-card__price");
        let flatPrice = flat_price.textContent;
        console.log(i+" "+location);
        fs.appendFileSync("flat_location.txt",location,"utf-8");
    }
}
