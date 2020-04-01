const EventEmitter = require('events')
const initial = document.getElementById('initial');
const target = document.getElementById('target');
const btnUnlockEmitter = new EventEmitter()

let initialIsSelected = false;
let targetIsSelected = false;
target.addEventListener('change' ,()=>{
    targetIsSelected = true;
    if (initialIsSelected){
        btnUnlockEmitter.emit('unlocked',);
    }
})
initial.addEventListener('change' , ()=>{
    initialIsSelected = true;
    if (targetIsSelected){
        btnUnlockEmitter.emit('unlocked');
    }
} )




export default {
    emitter: btnUnlockEmitter,
}
