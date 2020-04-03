import {Currency} from "./currency"

export function conversion(cb) {
    const form = document.getElementById('form');
    const output = form.querySelector('#output');
    let inputValue = +form.querySelector('#input').value;
    let initial = document.getElementById('initial').value;
    let target = document.getElementById('target').value;


    formCurrentSpots(initial)
        .then(data => {
            if(inputValue.toString().length > 11){
                const stringInput = inputValue.toString().slice(0, 11)
                inputValue = Number.parseFloat(stringInput)
            }
           const result = convert(data,inputValue,target)
            let curSigns = new Map([
                ['CAD', 'CA$'],
                ['HKD', 'HK$'],
                ['ISK', 'kr'],
                ['PHP', '₱'],
                ['DKK', 'kr.'],
                ['HUF', 'Ft'],
                ['CZK', 'Kč'],
                ['GBP', '£'],
                ['RON', 'L'],
                ['SEK', 'kr'],
                ['IDR', 'Rp'],
                ['INR', '₹'],
                ['BRL', 'R$'],
                ['RUB', '₽'],
                ['HRK', 'kn'],
                ['JPY', '¥'],
                ['THB', '฿'],
                ['CHF', 'F'],
                ['EUR', '€'],
                ['MYR', 'RM'],
                ['BGN', 'leva'],
                ['TRY', '₤ '],
                ['CNY', '¥'],
                ['NOK', 'kr'],
                ['USD', '$'],
                ['NZD', 'NZ$'],
                ['ZAR', 'R'],
                ['MXN', 'Mex$'],
                ['SGD', 'S$'],
                ['ILS', '₪'],
                ['KRW', '₩'],
                ['PLN', 'zł'],
                ['AUD', 'A$'],
            ])

            if(inputValue === result){
                output.value = inputValue;
            }else{
                if ((+inputValue && result) > 999){
                    output.value = result.toFixed(1) ;
                } else{
                    output.value = result.toFixed(3) ;
                }

            }
            let initialCur = inputValue ;
            if(curSigns.get(target)){
                output.value = output.value + curSigns.get(target)
            }
            if(curSigns.get(initial)){
                initialCur = inputValue + curSigns.get(initial)
            }

            return {
                output: output.value,
                initial:initialCur
            }


        } ).then((result) => {
            if(cb && inputValue.toString().length<11){
                const save ={
                    from:initial ,
                    to: target,
                    initial:result.initial ,
                    result: result.output,
                    time: new Date().toLocaleTimeString()

                }
                cb(save)
            }
    })

}
function formCurrentSpots(currency) {
   return  Currency.fetchData(currency).then(data => data.rates)
}
function convert(data, value, output) {

    return data[output] * value
    }
