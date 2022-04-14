// first hand at automation
// Usage of puppeteer module

const puppeteer = require("puppeteer");
let page;
//pupeteer gives as Promise to open the browser using launch() method.

console.log("before");
const browserPromise = puppeteer.launch({headless:false});
//Usage of headless(false) for making change to default case in browser launch.

// now handling the promise of browserPromise
browserPromise.then(function(brower){
  const pagesArray = brower.pages();
  return pagesArray;

  // nopw handling the promise of pagesArray
}).then(function(browserPage){
    page = browserPage[0];
    let goTopromise = page.goto("https://www.google.com/");
    return goTopromise;

    //now handling the promise of gotoPromise
}).then(function(){
    //console.log("Browser is opened now");
    let KeyboardPromise = page.type("input[type='text']","pepcoding");
    return KeyboardPromise;

    // now handling the promise of keyboard method

}).then(function(){
    let EnterPress = page.keyboard.press("Enter");
    return EnterPress;

    //handling the promise of enterpress.
}).then(function(){

    let pageElementPromise = page.waitForSelector("h3.LC20lb.DKV0Md",{visible:true});
    return pageElementPromise;

 
    //handling the promise of pageElementPromise
}).then(function(){
    let pageMOuseClick = page.click("h3.LC20lb.DKV0Md");
    return pageMOuseClick;

    //handle the promise of mouseclick.
}).catch(function(err){
    console.log(err);
})

console.log("After");