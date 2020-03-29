import '../sass/main.scss'
import {Currency} from "./currency";

const table = document.getElementById('table');

const data = Currency.fetchData('USD').then(data =>{
        const rates = data.rates;
        console.log(rates)
        return rates
    }

).then((rates)=>{
    const amount = Object.keys(rates).length;
    const curNames = Object.keys(rates);

    const currency  = {
      cur :  Object.keys(rates),
      spot : Object.values(rates).map(spot => spot.toString().slice(0,5)),
      fullName : fullNaming(amount, curNames)
    }
 /*   console.log(currency.fullName);
    console.log(currency.spot);
    console.log(currency.cur);*/
    createTable( amount , currency.cur,currency.fullName, currency.spot, 'up')

});


function createTable(amount, cur, fulName, spot, trend) {

    let index = 0;
    for (index; index < amount; index++){
        const row = document.createElement('tr');
        row.insertAdjacentHTML('afterbegin', `
        <td>${cur[index]} <div class="fullName">${fulName[index]}</div></td>
        <td>${spot[index]}</td>
        <td>${trend[index]}</td>
    `)
        table.appendChild(row)

    }

}
function fullNaming(amount, abrevArray) {
   let newArr = []
    for (let i = 0 ; i < amount; i++){
        if(abrevArray[i] === "CAD") {
            newArr[i] = ' Canadian Dollar'
            continue;
        }
        if(abrevArray[i] === "HKD") {
            newArr[i] = (' Honk Kong Dollar')
            continue;
        }
        if (abrevArray[i] === "GBP"){
            newArr[i] = (' Pound')
            continue;


        }
        else {
            newArr[i] = 'NOT DEF';
            continue
        }
    }
    return newArr;
}
