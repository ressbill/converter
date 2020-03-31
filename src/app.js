import '../sass/main.scss'
import {Currency} from "./currency";

const table = document.getElementById('table');

Currency.createModel('USD').then(createTable)


function createTable(data) {

    let index = 0;
    for (index; index < data.amount; index++){
        const row = document.createElement('tr');
        row.insertAdjacentHTML('afterbegin', `
        <td ><div class="flag"><img src="${data.flags[index]}" alt="flag"></div><div class="abr">${data.cur[index]}</div> <div class="fullName">${data.fullName[index]}</div></td>
        <td class="spot">${data.spot[index]}</td>
        <td class="trend"><img class="trend__image" src="${data.trend[index]}" alt="trend"></td>
    `)
        table.appendChild(row)

    }

}
// <td>${trend[index]}</td>
