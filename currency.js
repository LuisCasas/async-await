const axios = require('axios');


const getExchangeRate = async (from, to) => {

    try{
        const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);
        const rate = response.data.rates[to];

        if(rate){
            return rate;
        } else {
            throw new Error(`Unable to find rates for ${from} and ${to}`);
        }

    } catch(e){
        throw new Error(`Unable to find rates for ${from} and ${to}`);
    }
};

const getCountries = async (currencyCode) => {

    try{
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode}`); 
    }
};

const convertCurrency = async (from, to, amount) => {
    const countries = await getCountries(from);
    const rate = await getExchangeRate(from, to);    
    
    const exchangeAmount = amount * rate;

    return `${from} ${amount} is worth ${to} ${exchangeAmount}. ${from} currency is used in the following countries: \n ${countries.join('\n')}`;
};

convertCurrency('GBP','EUR', 10).then((status) => {
    console.log(status);
}).catch((err) => {
    console.log(err.message);
});

/*
getExchangeRate('GBP','EUR').then((rate) => {
    console.log(rate);
});

getCountries('USD').then((countries) => {
    console.log(countries);
});
*/

// https://api.fixer.io/latest?base=USD
// https://restcountries.eu/rest/v2/currency/cop