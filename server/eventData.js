module.exports = () => {
    const fetch = require('node-fetch');
    require('dotenv').config()

    return fetch('https://api.predicthq.com/v1/events/', {
        headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Accept": "application/json",
        "Authorization": `Bearer ${process.env.API_TOKEN}`
    }})
    .then(response => response.json());
   
}

