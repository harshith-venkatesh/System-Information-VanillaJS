(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// import dotenv from 'dotenv'
// import dotenv from 'dotenv';
// dotenv.config({ path: path.join(__dirname, '.env') });
const playground = document.querySelector('#user-playground');
const startTime = Date.now();
let canType = true;
const DELAY = 10;
let wordsToDisplay = '';
console.log('hi');
playground.innerHTML += `<h1>Welcome User</h1>
\n Start Typing.....`;
// console.log('env key',process.env.IP_API_KEY)


const display = (result) =>  {
    playground.innerHTML += `<p>You have typed ${result}</p>` 
    canType = false;
    callAction();
}

const createDelay = async () => {
    await new Promise(resolve => setTimeout(resolve,DELAY));
}

async function callAction() {
    const data = await fetch(`https://api.ipdata.co/?api-key=d663081b132c87b95fb4821028f58f93b1ac618f397c4a33755a4ac6`)
    const result = await data.json();
    console.log({result})
    playground.innerHTML += `<p>Your Browser Details is loading in 10 seconds...</p>` 
    console.log(window.navigator);
    await createDelay();
    if(window?.navigator?.userAgentData?.brands){
        playground.innerHTML += `<p>Your Browser Details is Browser: ${window?.navigator?.userAgentData?.brands[0]?.brand} and version: ${window?.navigator?.userAgentData?.brands[0]?.version}</p>` 
    } else {
        playground.innerHTML += `<p>Your Browser Details is not found` 
    }
    const language = new Intl.Locale(navigator.language);
    playground.innerHTML += `<p>Your Browser Language is loading in 10 seconds...</p>` 
    await createDelay();
    playground.innerHTML += `<p>Your Browser Language is ${language}</p>` 
    const endTime = Date.now();
    playground.innerHTML += `<p>Your Session Time is loading in 10 seconds...</p>` 
    await createDelay();
    playground.innerHTML += `<p>Your Session Time is ${((endTime - startTime)/1000).toFixed(1)}s</p>` 
    playground.innerHTML += `<p>Your Window Screen Resolution is loading in 10 seconds...</p>` 
    await createDelay();
    playground.innerHTML += `<p>Your Window Screen Resolution is  ${window.screen.width}px * ${window.screen.height}px</p>` 
    playground.innerHTML += `<p>Your Current IP Address is loading in 10 seconds...</p>` 
    await createDelay();
    playground.innerHTML += `<p>Your Current IP Address is ${result.ip}</p>`
    playground.innerHTML += `<p>Your Internet Service Provider is loading in 10 seconds...</p>` 
    await createDelay();
    playground.innerHTML += `<p>Your Internet Service Provider is ${result.asn.name}</p>`
    

}

const debounce = (func,delay) => {
    let timer;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            func.apply(this,arguments);
        },delay)
    }
}

const optimizedDisplay = debounce(display,1000);

window.addEventListener('keydown',function(event) {
    if(!canType) return;
    wordsToDisplay += event.key;
    optimizedDisplay(wordsToDisplay)
})
},{}]},{},[1]);
