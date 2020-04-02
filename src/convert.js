import {Currency} from "./currency"

export function conversion() {
    const form = document.getElementById('form');
    const output = form.querySelector('#output');
    let inputValue = +form.querySelector('#input').value;

    let initial = document.getElementById('initial').value;
    let target = document.getElementById('target').value;
    formCurrentSpots(initial)
        .then(data => {
           const result = convert(data,inputValue,target)
            console.log(result)
            const firstDecimalNumber = result.toString().split('.')[1]
            if(inputValue === result){
                output.value = inputValue;
            }else{
                if (+inputValue > 999){
                    output.value = result.toFixed(1);
                } else{
                    output.value = result.toFixed(3);
                }

            }


        } )

}
function formCurrentSpots(currency) {
   return  Currency.fetchData(currency).then(data => data.rates)
}
function convert(data, value, output) {

    return data[output] * value
    }
