export class Currency{

   static  fetchData(base) {
   return   fetch(`https://api.exchangeratesapi.io/latest?base=${base}`).
   then(data => data.json()).
   then(parsedData => {console.log(parsedData); return parsedData});


}

    static createModel(base) {
        return Currency.fetchData(base)
            .then(async data => {
                const  rates = data.rates;
                const amount = Object.keys(rates).length - 1;
                const curNames = Object.keys(rates).filter(rate => rate !== base);
                const curValues = Object.values(rates).filter(rate => +rate !== 1);

                let yestData;
                await previousDayRates()
                    .then(data => data.json())
                    .then(data => {
                        yestData = data
                    }).then(async () => {
                        if (yestData.date === data.date) {
                            await previousDayRates(1).then(data => data.json()).then(data => {
                                yestData = data
                            })
                        }

                    })
                console.log(yestData)

                const prevRates = yestData.rates;
                const prevValues = Object.values(prevRates).filter(rate => +rate !== 1);
                let trend = [];
                for (let i = 0; i < amount; i++) {
                    if (prevValues[i] < curValues[i]) {
                        trend[i] = './assets/images/bx_bx-trending-up.svg'
                        continue
                    }
                    if (prevValues[i] > curValues[i]) {
                        trend[i] = './assets/images/bx_bx-trending-down.svg'

                    } else {
                        trend[i] = 'STABILNOST'
                    }
                }
                const flags = new Map([
                    ['CAD', './assets/images/flags/canada.svg'],
                    ['HKD', './assets/images/flags/hong-kong-sar-china.svg'],
                    ['ISK', './assets/images/flags/iceland.svg'],
                    ['PHP', './assets/images/flags/philippines.svg'],
                    ['DKK', './assets/images/flags/denmark.svg'],
                    ['HUF', './assets/images/flags/hungary.svg'],
                    ['CZK', './assets/images/flags/czechia.svg'],
                    ['GBP', './assets/images/flags/united-kingdom.svg'],
                    ['RON', './assets/images/flags/romania.svg'],
                    ['SEK', './assets/images/flags/sweden.svg'],
                    ['IDR', './assets/images/flags/india.svg'],
                    ['INR', './assets/images/flags/indonesia.svg'],
                    ['BRL', './assets/images/flags/brazil.svg'],
                    ['RUB', './assets/images/flags/russia.svg'],
                    ['HRK', './assets/images/flags/croatia.svg'],
                    ['JPY', './assets/images/flags/japan.svg'],
                    ['THB', './assets/images/flags/thailand.svg'],
                    ['CHF', './assets/images/flags/switzerland.svg'],
                    ['EUR', './assets/images/flags/european-union.svg'],
                    ['MYR', './assets/images/flags/malaysia.svg'],
                    ['BGN', './assets/images/flags/bulgaria.svg'],
                    ['TRY', './assets/images/flags/turkey.svg'],
                    ['CNY', './assets/images/flags/china.svg'],
                    ['NOK', './assets/images/flags/norway.svg'],
                    ['NZD', './assets/images/flags/new-zealand.svg'],
                    ['ZAR', './assets/images/flags/south-africa.svg'],
                    ['MXN', './assets/images/flags/mexico.svg'],
                    ['SGD', './assets/images/flags/singapore.svg'],
                    ['AUD', './assets/images/flags/australia.svg'],
                    ['ILS', './assets/images/flags/israel.svg'],
                    ['KRW', './assets/images/flags/south-korea.svg'],
                    ['PLN', './assets/images/flags/poland.svg']

                ]);
                let flagsUrl = [];
                for (let i = 0; i < amount; i++) {
                    let a = curNames[i]
                    const url = flags.get(a)
                    flagsUrl.push(url)
                }
                const fullNames = fullNaming(amount, curNames)
                return [{
                    cur: Object.keys(rates).filter(rate => rate !== base),
                    spot: Object.values(rates).filter(rate => +rate !== 1).map(spot => spot.toString().slice(0, 5)),
                    fullName: fullNames,
                    amount: amount,
                    trend: trend,
                    flags: flagsUrl
                },
                    {
                        cur: Object.keys(rates),
                        spot: Object.values(rates),
                        amount: amount + 1,

                    }]


            })
    }
}



function previousDayRates(dateIsEqual = 0) {
   const today = new Date();
   let date;
   if (dateIsEqual === 0){
      if (today.getDay() === 1){
         date = getPreviousDate(3)
      }
      if (today.getDay() === 0){
         date =   getPreviousDate(2)
      }
      // if (today.getDay() === 6){
      //    date =  getPreviousDate(1)
      // }
      else{
         date =  getPreviousDate(1)
      }

   } else
      date =   getPreviousDate(2)

   const str =  convertedDateForURL(date)

   return fetch(`https://api.exchangeratesapi.io/${str}?base=USD`);
}
function convertedDateForURL(date) {
   const year = date.getFullYear();
   const day = ('0' + (date.getDate())).slice(-2);
   const month = ('0' + (date.getMonth() +1)).slice(-2);
   const array = [year , month , day]
   const str = array.join('-')
 /*   const str = new Date(year, month , day).toLocaleDateString()
      const re = /\D/g
/*    const matches = re.exec(str)
      const urlDate = str.replace(re,'-');
      const datePattern = /(\d{1})-(\d{2})-(\d{4})/
      const patternMatches = urlDate.replace(datePattern, '$3-$1-$2')*/
   return str
}
function getPreviousDate(numDays){
   const today = new Date();
   const todayMillSec = today.getTime();
   const date = todayMillSec - (86400000*numDays)

   return  new Date(date)
}

function fullNaming(amount, abrevArray) {
   let newArr = []
   for (let i = 0 ; i < amount; i++){
      if(abrevArray[i] === "CAD") {
         newArr[i] = ' Canadian dollar'
         continue;
      }
      if(abrevArray[i] === "HKD") {
         newArr[i] = (' Honk Kong dollar')
         continue;
      }
      if (abrevArray[i] === "GBP"){
         newArr[i] = (' Pound sterling')
         continue;
      }
      if (abrevArray[i] === "ISK"){
         newArr[i] = (' Icelandic krona')
         continue;
      }
      if (abrevArray[i] === "PHP"){
         newArr[i] = (' Philippine peso')
         continue;
      }
      if (abrevArray[i] === "DKK"){
         newArr[i] = (' Danish krone')
         continue;
      }
      if (abrevArray[i] === "HUF"){
         newArr[i] = (' Hungarian forint')
         continue;
      }
      if (abrevArray[i] === "CZK"){
         newArr[i] = (' Czech koruna')
         continue;
      }
      if (abrevArray[i] === "RON"){
         newArr[i] = (' Romanian leu')
         continue;
      }
      if (abrevArray[i] === "SEK"){
         newArr[i] = (' Swedish krona')
         continue;
      }
      if (abrevArray[i] === "INR"){
         newArr[i] = (' Indonesian rupiah')
         continue;
      }
      if (abrevArray[i] === "IDR"){
         newArr[i] = (' Indian rupee')
         continue;
      }
      if (abrevArray[i] === "RUB"){
         newArr[i] = (' Russian ruble')
         continue;
      }
      if (abrevArray[i] === "BRL"){
         newArr[i] = (' Brazilian real')
         continue;
      }
      if (abrevArray[i] === "HRK"){
         newArr[i] = (' Croatian kuna')
         continue;
      }
      if (abrevArray[i] === "JPY"){
         newArr[i] = (' Japanese yen')
         continue;
      }
      if (abrevArray[i] === "THB"){
         newArr[i] = (' Thai baht')
         continue;
      }
      if (abrevArray[i] === "CHF"){
         newArr[i] = (' Swiss franc')
         continue;
      }
      if (abrevArray[i] === "EUR"){
         newArr[i] = (' Euro')
         continue;
      }
      if (abrevArray[i] === "MYR"){
         newArr[i] = (' Malaysian ringgit')
         continue;
      }
      if (abrevArray[i] === "BGN"){
         newArr[i] = (' Bulgarian lev')
         continue;
      }
      if (abrevArray[i] === "TRY"){
         newArr[i] = (' Turkish lira')
         continue;
      }
      if (abrevArray[i] === "CNY"){
         newArr[i] = (' Renminbi')
         continue;
      }
      if (abrevArray[i] === "NOK"){
         newArr[i] = (' Norwegian krone')
         continue;
      }
      if (abrevArray[i] === "NZD"){
         newArr[i] = (' New Zealand dollar')
         continue;
      }
      if (abrevArray[i] === "ZAR"){
         newArr[i] = (' South African rand')
         continue;
      }
      if (abrevArray[i] === "USD"){
         newArr[i] = (' US dollar')
         continue;
      }
      if (abrevArray[i] === "MXN"){
         newArr[i] = (' Mexican peso')
         continue;
      }
      if (abrevArray[i] === "SGD"){
         newArr[i] = (' Singapore dollar')
         continue;
      }
      if (abrevArray[i] === "AUD"){
         newArr[i] = (' Australian dollar')
         continue;
      }
      if (abrevArray[i] === "ILS"){
         newArr[i] = (' Israeli new shekel')
         continue;
      }
      if (abrevArray[i] === "KRW"){
         newArr[i] = (' South Korean won')
         continue;
      }
      if (abrevArray[i] === "PLN"){
         newArr[i] = (' Polish złoty')
         continue;
      }
      else {
         newArr[i] = 'NOT DEF';
         continue
      }
   }
   return newArr;
}
