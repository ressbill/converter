import '../sass/main.scss'
import {Currency} from "./currency";

const table = document.getElementById('table');
const initial = document.getElementById('initial');
const target = document.getElementById('target');

Currency.createModel('USD').then(model => {
    createTable (model[0])
    fullFillSelections(model[1])

})


function createTable(data) {

    for ( let index = 0; index < data.amount; index++){
        const row = document.createElement('tr');
        row.insertAdjacentHTML('afterbegin', `
        <td ><div class="flag"><img src="${data.flags[index]}" alt="flag"></div><div class="abr">${data.cur[index]}</div> <div class="fullName">${data.fullName[index]}</div></td>
        <td class="spot">${data.spot[index]}</td>
        <td class="trend"><img class="trend__image" src="${data.trend[index]}" alt="trend"></td>
    `)
        table.appendChild(row)

    }

}



function fullFillSelections(data) {
  //  const option = document.createElement('option');
    console.log("DATA",data)
    const reversed = Reverse(data)
    for( let i = 0; i < data.amount; i++){
        target.insertAdjacentHTML("afterbegin", `
        <option value="${data.cur[i]}">${data.cur[i]}</option>    
        `)
        initial.insertAdjacentHTML("afterbegin", `
        <option value="${data.cur[i]}">${data.cur[i]}</option>    
        `)
    }


}
// function sortByKey(data , key) {
//     data.cur =
//     return data
// }
