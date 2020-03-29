export class Currency{
   static  fetchData(base) {
   return   fetch(`https://api.exchangeratesapi.io/latest?base=USD`).
   then(data => data.json()).
   then(parsedData => {console.log(parsedData); return parsedData});

}
}
