const axios = require('axios');


const getExchangeRate = async (from, to) => {
    const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);
    return response.data.rates[to];
};

const getCountries = async (currencyCode) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);

    return response.data.map((country) => country.name);
};

const convertCurrency = async (from, to, amount) => {
    const countries = await getCountries(from);
    const rate = await getExchangeRate(from, to);

    const exchangeAmount = amount * rate;

    return `${from} ${amount} is worth ${to} ${exchangeAmount}. ${from} currency is used in the following countries: \n ${countries.join('\n')}`;
};

convertCurrency('EUR','GBP', 10).then((status) => {
    console.log(status);
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