const puppeteer = require("puppeteer");
// const elemental = require("elemental");
// import { button } from 'elemental'
// let excel = require("excel4node")
let excel =require("xlsx")
let fs = require("fs");
// let minimist  =require('minimist');
let pin =process.argv[2];

if(fs.existsSync('vaccine.json')){
    fs.unlinkSync('vaccine.json')
}      

(async () => {

    const browser = await puppeteer.launch({  slowMo: 100 })
    let page = await browser.newPage();
    await page.goto("https://www.google.com/");

    //now going to type on google tab
    await page.type("input[type='text']", "cowin");
    await page.keyboard.press("Enter");
    await page.waitForSelector(".yuRUbf>a[href='https://www.cowin.gov.in/']", { visible: true })
    await page.click(".yuRUbf>a[href='https://www.cowin.gov.in/']");
    // await page.waitForNavigation();
    // let arr = await page.$$(".mat-tab-label-content>.accessibility-plugin-ac");

    await page.waitForTimeout(2000);

    await page.waitForSelector("#mat-tab-label-1-1", { visible: true });



    await page.evaluate(() => document.querySelector("#mat-tab-label-1-1").click())
    await page.waitForSelector("input[data-placeholder='Enter your PIN']", { visible: true });
    await page.waitForTimeout(1000);
    await page.type("input[data-placeholder='Enter your PIN']", pin);
    await page.keyboard.press("Enter");
    //await page.waitForNavigation();
    await page.waitForTimeout(1000);

    await page.waitForSelector("input#c1", { visible: true });
    //  await page.waitForTimeout(200);
    // await page.waitForNavigation();
    await page.evaluate(() => document.querySelector("#c1").click())
    const result = await page.evaluate(() => {
        // let fs = require("fs");


        let centerarr= document.querySelectorAll(".main-slider-wrap.col.col-lg-3");
        console.log(centerarr.length);

         const data = [];
        for (let i = 0; i < centerarr.length; i++) {
           //let centre_city = centerarr[i].querySelector(" p.center-name-text");
             //let city2=centerarr[1].textContent;
            let city1= centerarr[i].textContent;
            data.push(city1);
            // fs.appendFileSync("vaccine_centre.txt",data,"utf-8")

        }




         let date=[];
         let date_vaccination =document.querySelectorAll(".availability-date p");
         for(let i =0;i<7;i++){
             let date_available =date_vaccination[i].textContent;
             date.push(date_available);
             //taking the date of vaccination

         }
         let slottt=[]
         let slot = document.querySelectorAll("li.ng-star-inserted .slots-box");
         for(let i =0;i<slot.length;i++){
              slottt.push(slot[i].textContent);
            //  let vaccinetype =document.querySelector("li.ng-star-inserted .slots-box h5.name").textContent;
            //  let dose1 =document.querySelector("span[title='Dose 1']").textContent;
         }

            let obj_vaccine  ={
                city:data,
                dates:date,
                slots:slottt
            }
           
        
        // console.log(data);
        return obj_vaccine;

    })
    // console.log(result);
 
    // let workbook = new excel.Workbook();
    for(let i = 0 ;i<7;i++){
        let fileNa = result.dates[i]+".txt";
    }
    let newWB = excel.utils.book_new();
    let obj_arr =[];
    for(let i = 0 ;i<7;i++){
        // let fileN = result.dates[i]+".txt";
        let obobj =[];
        
        // console.log(f
        // fs.appendFileSync(fileN,"Date:- "+result.dates[i],"utf-8")
        // let wb =workbook.addWorkSheet();
        for(let j=0;j<result.city.length;j++){
            let object_aa ={};
            object_aa['Dates'] = result.dates[i]
            object_aa['Center'] = result.city[j]
            // fs.appendFileSync(fileN,"\nCenter:- "+result.city[j],"utf-8");
            for(let k=0;k<result.slots.length;k++){
                if(k%7==i && Math.floor(k/7)==j){
                if(result.slots[k]==" NA "){
                    object_aa['Vaccinename'] = 'NA'
                    object_aa['DOSE1'] = 'NA'
                    object_aa['DOSE2'] = 'NA'
                    object_aa['TOTAL'] = 'NA'
                    // fs.appendFileSync(fileN,"\nVaccine Name: -NA\nDose 1:- NA \nDose 2:- NA \nTotal:- NA\n","utf-8");
                    // fs.appendFileSync(fileN,"\nVaccine Name: -NA\nDose 1:- NA \nDose 2:- NA \nTotal:- NA","utf-8");
                } else {
                    let arr = result.slots[k].split(" ");
                    arr.splice(10);
                    object_aa['Vaccinename'] = arr[1]
                    object_aa['DOSE1'] = arr[4]
                    object_aa['DOSE2'] = arr[9]
                    object_aa['TOTAL'] = arr[6]
                    
                    // fs.appendFileSync(fileN,`\nVaccine name:- ${arr[1]}\nDose 1:- ${arr[4]}\nDose 2:- ${arr[9]}\nTotal:- ${arr[6]}\n`,"utf-8")

                    // let somee= JSON.stringify(arr);
                    // fs.appendFileSync(fileN,somee,"utf-8") 
                }
            }
            }
            console.log(object_aa);
            obj_arr.push(object_aa);
            obobj.push(object_aa)
        }
        let newWS =excel.utils.json_to_sheet(obobj);
        excel.utils.book_append_sheet(newWB,newWS,result.dates[i]);
    }
    fs.appendFileSync('vaccine.json',JSON.stringify(obj_arr))
    excel.writeFile(newWB,'Vaccination.xlsx')
    browser.close()
})()