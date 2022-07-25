// Import all dependencies
const express = require('express');
const fetch = require('node-fetch')
const app = express();
const apiConfiguration = require('./config')

const port = process.env.PORT || 3000;
app.use(express.json());


app.get('/', async (req, res) => {

    const address = req.query.address;

    if (!address) {
        return res.send({
            err: 'You must enter a address in search test-box',
        })
    }
 
    if (address === "Torino" || address === "Bologna" || address === "Roma" || address === "Napoli" || address === "Milano"){

        const url_1 = apiConfiguration.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + apiConfiguration.openWeatherMap.SECRET_KEY;
        const url_2 =  apiConfiguration.yelp.BASE_URL + encodeURIComponent(address);
        const headers = {
            headers: {
                'Authorization' : `Bearer ${apiConfiguration.yelp.SECRET_KEY}`
            }
        }
    
        Promise.all([
            fetch(url_1),
            fetch(url_2, headers)
        ]).then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        }).then(function (data) {
            console.log(data);
    
            //Result of first API
            const temperature = (data[0].main.temp- 273.5).toFixed(1);
            const response = {
                meteo: {},
                eserciziCommerciali: {}
            };
            response.meteo = `The weather in ${address} is ${data[0].weather[0].description} with ${temperature} grades`;
    
            //Result of second API
            response.eserciziCommerciali = data[1].businesses;
    
            console.log(response);
            res.status(200).json(response);
        }).catch(function (error) {
            console.log(error);
        });

    }
    else {
        const response_error = 'Puoi avere accesso solo alle informazioni di queste 5 città: Milano, Bologna, Napoli, Roma e Torino';
        console.log(response_error);
        res.status(500).json(response_error);
    }

});


//  If the route doesn't exists
app.get('*', (req, res) => {
    return res.send({
        err: 'OPS! Pagina non trovata!',
    })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})