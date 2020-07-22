const currencyOne = document.querySelector('#currency-one');
const currencyTwo = document.querySelector('#currency-two');
const currencyOneValue = document.querySelector('#amount-one');
const currencyTwoValue = document.querySelector('#amount-two');
const rate = document.querySelector('#rate');
const swapBtn = document.querySelector('#swap');

const swapCurrency = () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    getCurrency();
}

const getCurrency = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne.value}`)
    .then(res => res.json())
    .then(data => {
        if(currencyOneValue.value < 0) {
            currencyOneValue.value = 0;
        }
        const rateAmount = data.rates[currencyTwo.value];
        rate.innerHTML = `${currencyOne.value} to ${currencyTwo.value}: <strong>${rateAmount}</strong>`;
        currencyTwoValue.value = (currencyOneValue.value * rateAmount).toFixed(2);
    });
}

getCurrency();

//Event Listeners
currencyOneValue.addEventListener('input', getCurrency);
currencyOne.addEventListener('change', getCurrency);
currencyTwo.addEventListener('change', getCurrency);
swapBtn.addEventListener('click', swapCurrency);