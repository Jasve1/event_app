import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
const appRoot = document.getElementById('root');

ReactDOM.render(<App />, appRoot);

//Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../build/sw.js')
        .then(registration =>
                console.log('ServiceWorker registration successful with scope: ', registration.scope)
        ).catch(err => console.log('ServiceWorker registration failed: ', err));
    navigator.serviceWorker.addEventListener('message', event => {
        if(event.data === "currently-offline"){
           appRoot.classList.toggle("offline");
        }
    })            
}