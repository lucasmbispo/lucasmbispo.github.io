import cheerio from "cheerio";
import axios from "axios";
import json2csv from "json2csv";
import * as fsp from "fs/promises";

const getTableData = async (): Promise<Array<any>> => {

    //Get the data

    const targetUrl = 'https://en.wikipedia.org/wiki/Road_safety_in_Europe'
    const pageResponse = await axios.get(targetUrl);

    //hold results
    const keys = [];
    const result = [];
 
    //load content to cheerio
    const $ = cheerio.load(pageResponse.data);


    //find table content, search in all rows//
    $("table.wikitable.sortable")
    .find("tr")
    .each((row, elem) => {
        
        if(row === 0) {

            //find first line as reference to the columns//

            $(elem).find('th').each((idx, elem) => {

                //get the column title
                const key = $(elem).text().trim().replace('\n','');
                //ignore the columns I don't want
                if(idx !== 6 && idx !== 9 && idx !== 10)

                {
                    //set and title
                    keys[idx]=key;

                }

            });

            //create and set Year column
            keys[10] = 'Year'



            //console.info(JSON.stringify(keys));

            
        }
           
        const nextCountry = {};
        
        //for each column
        $(elem).find('td').each((idx, elem) => {

            const value = $(elem).text().trim().replace(',','.');

            //ignore the columns I don't want
            if(idx !== 6 && idx !== 9 && idx !== 10){

                nextCountry[keys[idx]] = value.replace(',','.');
                nextCountry[keys[10]] = 2018;
                

                // console.info(idx);
            }
        });
        // 
        result.push(nextCountry);
             
    });

    //return results//

    //remove the last row (totals)
    const list = result.slice(0,-1);

    //return list with sort applied
    return sortByKey(list, 7);
    
};

// Results on Console Code
//getTableData().then((results) => {
// console.info(JSON.stringify(results));

//save to csv//
const saveCsv = async (countries: Array<any>) => {
    //console.info(`Saving ${countries.length} records`);


//create parser
const j2cp = new json2csv.Parser();
const csv = j2cp.parse(countries);


//write file
await fsp.writeFile("./output.csv", csv, {encoding: "utf-8"});

}

//execute function then write file
getTableData().then(saveCsv);  

//sort function

function sortByKey(array, key) {
    return array.sort((a, b) => {
      let x = a['Road deathsper Million Inhabitants in 2018[27]'];
      console.log(x)
      let y = b['Road deathsper Million Inhabitants in 2018[27]'];
      console.log(y)
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
