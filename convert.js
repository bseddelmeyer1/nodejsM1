
var csv = require('csvtojson')  //import csv to json module (https://www.npmjs.com/package/csvtojson)
const fs = require('fs')      //create files and folders fs - filesystem
const path = require('path')  //work with cross platform file paths
const uuidv1 = require('uuid/v1')

const convertCSV = (csvFile='customer-data.csv', jsonFile='customer-data.json') => {

    const folderName = uuidv1()
    fs.mkdirSync(folderName)
    
    csv()
    .fromFile(csvFile)
    .then((jsonObj)=>{
        fs.writeFileSync(path.join(__dirname, folderName, jsonFile), JSON.stringify(jsonObj,null, "\t"), 'utf8',(error) => {
                    if (error) return console.error(error);
                }) //write file with stringified JSON (otherwise it just prints Object) null and \t make the formatting nicer
        //console.log(JSON.stringify(jsonObj,null, "\t"),)
        console.log('Conversion complete in folder ' + folderName)  //notify user when conversion is complete
    })
}

convertCSV(process.argv[2],process.argv[3])