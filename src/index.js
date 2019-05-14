import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(registration =>
                console.log('ServiceWorker registration successful with scope: ', registration.scope)
        ).catch(err => console.log('ServiceWorker registration failed: ', err));
}