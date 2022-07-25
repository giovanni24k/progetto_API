//  Object for API Configuration
const apiConfiguration = {
    openWeatherMap: {
        BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
        SECRET_KEY: "a665244255259c7612880e520ef10c83"
    },
    
    yelp: {
        BASE_URL: "https://api.yelp.com/v3/businesses/search?location=",
        SECRET_KEY: "iKdWEXUrNEQ0A7whkFcv-zTLu7KPNhPmeZAn1XkpnrlzYQTIzfnPcmOkXWLjLTgxPfmGdPshZ2onNW0DJqNJQ5sPaRai0uX_XvKQqJtMQUKSdxjj3crFC93Qvb3bYnYx"
        
    }
};

module.exports = apiConfiguration;