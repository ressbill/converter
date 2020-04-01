import '../sass/main.scss'
import {Currency} from "./currency";
import utilities from "./utulities";
import {conversion} from "./convert";

const table = document.getElementById('table');
const initial = document.getElementById('initial');
const target = document.getElementById('target');
const button = document.getElementById('btn');
const convert = document.getElementById('convert')

Currency.createModel('USD').then(model => {
    createTable (model[0])
    fullFillSelections(model[1])

})
button.addEventListener('click', (event) => {
        event.preventDefault()
        console.log('save')
        conversion()
})
convert.addEventListener('click', (event) => {
    event.preventDefault()
    conversion()
})
utilities.emitter.on('unlocked', ()=>{
    button.disabled = false;
    console.log('fired')
    conversion()
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
    for( let i = 0; i < data.amount; i++){
        target.insertAdjacentHTML("afterbegin", `
        <option value="${data.cur[i]}">${data.cur[i]}</option>    
        `)
        initial.insertAdjacentHTML("afterbegin", `
        <option value="${data.cur[i]}">${data.cur[i]}</option>    
        `)
    }
    target.insertAdjacentHTML("afterbegin", `
    <option value = '' selected  disabled  >Choose currency</option>
    `)
    initial.insertAdjacentHTML("afterbegin", `
    <option value = '' selected  disabled  >Choose currency</option>
    `)


}
